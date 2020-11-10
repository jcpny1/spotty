import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Playlists} from '../components/Playlists';
import {Button} from 'semantic-ui-react';
import * as actions from '../actions/actions';
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
    actions.getPlaylists(this, this.props.accessToken);
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
        actions.getTracklist(this, accessToken, this.state, playlist.tracks.href, playlist.name, index, listCombine, requestCount);
      } else if (index === (playlistsItems.length - 2)) {  // LIKED TRACKS
        actions.getTracklist(this, accessToken, this.state, 'https://api.spotify.com/v1/me/tracks?limit=50', 'LIKED', index, listCombine, requestCount);
      } else if (index === (playlistsItems.length - 1)) {  // ALL TRACKS
        requestCount.count = playlistsItems.length - 1;
        actions.getAllTracks(this, accessToken, this.state, playlistsItems, 'ALL TRACKS', index, listCombine, requestCount);
      }
    }
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
    actions.getPlaylists(data.caller, this.props.accessToken);
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
