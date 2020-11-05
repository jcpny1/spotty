import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Playlists} from '../components/Playlists';
import {Button} from 'semantic-ui-react';
import * as actions from '../actions/actions';

export default class PlaylistsPage extends Component {
  constructor() {
    super();
    this.state = {
      activeIndex:  null,   // index into playlists.items
      fetchError:   null,
      loadIndex:    null,
      playlists:    null,
      requestCount: null,
    };
  }

  componentDidMount() {
    actions.getPlaylists(this);
  }

  fetchTrackList(index) {
    const playlistsItems = this.state.playlists.items;
    const playlist = playlistsItems[index];
    this.setState({ fetchError: null, loadIndex: index });
    if (playlist.tracks.items !== null) {
      this.setState({ activeIndex: index, loadIndex: -1 });
    } else {
      let   listCombine  = {items: []};
      let   requestCount = {count: 1};
      if (index < (playlistsItems.length - 2)) {           // Specific playlist
        actions.getTracklist(this, playlist.tracks.href, playlist.name, index, listCombine, requestCount);
      } else if (index === (playlistsItems.length - 2)) {  // LIKED TRACKS
        actions.getTracklist(this, 'https://api.spotify.com/v1/me/tracks?limit=50', 'LIKED', index, listCombine, requestCount);
      } else if (index === (playlistsItems.length - 1)) {  // ALL TRACKS
        requestCount.count = playlistsItems.length - 1;
        actions.getAllTracks(this, playlistsItems, 'ALL TRACKS', index, listCombine, requestCount);
      }
    }
  }

  // Sort ActiveTrackList in place.
  sortActiveTrackList = (columnName) => {
    const atl = this.state.playlists.items[this.state.activeIndex];
    actions.sortTrackList(atl.tracks, columnName);
    this.setState({ playlists: this.state.playlists });
  }

  handleClick = (e, playlistProps) => {
    const {active, index} = playlistProps;
    const newIndex = active ? -1 : index;
    if (newIndex >= 0) {
      this.fetchTrackList(newIndex);
    } else {
      this.setState({ activeIndex: -1 });
    }
  }

  refreshPlaylists(event, data) {
    data.caller.setState({ activeIndex: null });
    actions.getPlaylists(data.caller);
  }

  render() {
    const {activeIndex, loadIndex, playlists} = this.state;
    const {accessToken} = this.props;
    if (playlists) {
      return (
        <>
          <Button basic color='green' style={{marginBottom:'15px'}} caller={this} content='Refresh Data' title='Reload playlist data' size='small' onClick={this.refreshPlaylists} />
          <Playlists accessToken={accessToken} activeIndex={activeIndex} loadIndex={loadIndex} onClick={this.handleClick} onSort={this.sortActiveTrackList} playlists={playlists.items} />
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
