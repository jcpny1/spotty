import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Playlists} from '../components/Playlists';
import {Button} from 'semantic-ui-react';
import * as utils from '../actions/utils';

export default class PlaylistsPage extends Component {
  constructor() {
    super();
    this.state = {
      activeIndex: -1,   // index into playlists.items
      fetchError:  null,
      loading:     false,
      playlists:   null,
    };
  }

  componentDidMount() {
    this.getPlaylists(this, this.props.accessToken);
  }

  fetchTrackList(index) {
    const playlistsItems = this.state.playlists.items;
    const playlist = playlistsItems[index];
    this.setState({ fetchError: null, loading: true });
    if (playlist.tracks.items !== null) {
      this.setState({ loading: false });
    } else {
      const listCombine   = {items: []};
      const requestCount  = {count: 1};
      const {accessToken} = this.props;
      if (index < (playlistsItems.length - 2)) {           // Specific playlist
        this.getTracklist(this, accessToken, this.state, playlist.tracks.href, playlist.name, index, listCombine, requestCount);
      } else if (index === (playlistsItems.length - 2)) {  // LIKED TRACKS
        this.getTracklist(this, accessToken, this.state, 'https://api.spotify.com/v1/me/tracks?limit=50', 'LIKED', index, listCombine, requestCount);
      } else if (index === (playlistsItems.length - 1)) {  // ALL TRACKS
        requestCount.count = playlistsItems.length - 1;
        this.getAllTracks(this, accessToken, this.state, playlistsItems, 'ALL TRACKS', index, listCombine, requestCount);
      }
    }
  }

  getAllTracks = (caller, accessToken, state, playlistsItems, name, index, listCombine, requestCount) => {
    // Load users playlists' tracks.
    for (let i = 0; i < (playlistsItems.length - 2); ++i) {
      const playlist = playlistsItems[i];
      this.getTracklist(caller, accessToken, state, playlist.tracks.href, playlist.name, index, listCombine, requestCount, true);
    }
    this.getTracklist(caller, accessToken, state, 'https://api.spotify.com/v1/me/tracks?limit=50', 'LIKED', index, listCombine, requestCount, true);  // Add liked list, which does't show up in user's playlists.
  }

  getTracklist = (caller, accessToken, state, href, name, index, listCombine, requestCount, sort=false) => {
    fetch(href, {
      method:  'GET',
      headers: { 'Authorization': `Bearer ${accessToken}` }
    })
    .then(utils.statusCheck)
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        let tracks = state.playlists.items[index].tracks;
        if (tracks.items && tracks.items.length === 0) {
          tracks.items = null;
        }
        console.error(`getTracklist FAIL ${data.error.message}`);
        if (state.fetchError === null) {
          alert(`Operation failed: ${data.error.message}`);
          caller.setState({ playlists: state.playlists, fetchError: data.error, loading: false });
        }
      } else  {
        if (data.items) {
          for (let j = 0; j < data.items.length; ++j) {
            data.items[j].playlistName = name;   // add playlist name as property to each item.
            listCombine.items.push(data.items[j]);
          }
        }

        if (data.next !== null) {
          this.getTracklist(caller, accessToken, state, data.next, name, index, listCombine, requestCount, sort);
        } else {
          requestCount.count = requestCount.count - 1;
          if (requestCount.count === 0) {
            utils.flagDuplicates(listCombine);

            sort && utils.sortTrackList(listCombine, 'track.name');

            let tracks = state.playlists.items[index].tracks;
            tracks.items = listCombine.items;
            tracks.sortColumnName = listCombine.sortColumnName;
            tracks.sortDirection  = listCombine.sortDirection;
            caller.setState({ playlists: state.playlists, loading: false });
          }
        }
      }
    })
    .catch(error => {
  // we zero out atl here, but what about other successfull calls?
      let tracks = state.playlists.items[index].tracks;
      if (tracks.items && tracks.items.length === 0) {
        tracks.items = null;
      }
      if (state.fetchError === null) {
        alert(error.message);
      }
      caller.setState({ playlists: state.playlists, fetchError: error, loading: false });
    })
  }

  getPlaylists = (caller, accessToken) => {
    fetch('https://api.spotify.com/v1/me/playlists', {
      method:  'GET',
      headers: { 'Authorization': `Bearer ${accessToken}` }
    })
    .then(utils.statusCheck)
    .then(response => response.json())
    .then(data => {
      data.items = data.items.sort(function (item1, item2) {
        if (item1.name < item2.name) {return -1;}
        if (item1.name > item2.name) {return 1; }
        return 0;
      });

      // protect against no playlists.
      let copyItem = JSON.parse(JSON.stringify(data.items[0]));
      copyItem.name = 'LIKED';
      copyItem.id = 'LIKED';
      copyItem.images = [];
      data.items.push(copyItem);

      // protect against no playlists.
      copyItem = JSON.parse(JSON.stringify(copyItem));
      copyItem.name = 'ALL TRACKS';
      copyItem.id = 'ALL TRACKS';
      data.items.push(copyItem);
      data.items.forEach(playlistItem => playlistItem.tracks.items = null);
      caller.setState({ playlists: data });
    })
    .catch(error => {
      alert(error.message);
      caller.setState({ playlists: null, fetchError: error });
    });
  }

  // Sort ActiveTrackList in place.
  sortActiveTrackList = (columnName) => {
    const atl = this.state.playlists.items[this.state.activeIndex];
    utils.sortTrackList(atl.tracks, columnName);
    this.setState({ playlists: this.state.playlists });
  }

  handleClick = (e, playlistProps) => {
    const {active, index} = playlistProps;
    const newIndex = active ? -1 : index;
    if (newIndex >= 0) {
      this.setState({ activeIndex: newIndex, loading: true });
      this.fetchTrackList(newIndex);
    } else {
      this.setState({ activeIndex: -1, loading: false });
    }
  }

  refreshPlaylists(event, data) {
    data.caller.setState({ activeIndex: -1 });
    data.caller.getPlaylists(data.caller, data.caller.props.accessToken);
  }

  render() {
    const {activeIndex, loading, playlists} = this.state;
    const {accessToken} = this.props;
    if (playlists) {
      return (
        <>
          <Button basic color='green' style={{marginBottom:'15px'}} caller={this} content='Refresh Data' title='Reload playlist data' size='small' onClick={this.refreshPlaylists} />
          <Playlists accessToken={accessToken} activeIndex={activeIndex} loading={loading} onClick={this.handleClick} onSort={this.sortActiveTrackList} playlists={playlists.items} />
        </>
      );
    } else {
      return null;
    }
  }
}

PlaylistsPage.propTypes = {
  accessToken: PropTypes.string.isRequired,
}
