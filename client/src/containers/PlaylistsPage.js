import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Playlists} from '../components/Playlists';
import * as actions from '../actions/actions';

export default class PlaylistsPage extends Component {
  constructor() {
    super();
    this.state = {
      activeIndex:  null,   // index into playlists.items
      fetchError:   null,
      loadIndex:    null,
      loading:      null,
      playlists:    null,
      requestCount: null,
    };
  }

  componentDidMount() {
    actions.getPlaylists(this);
  }

  fetchTrackList(index) {
    const playlistsItems=this.state.playlists.items;
    const playlist = playlistsItems[index];
    let listCombine  = {items: []};
    let requestCount = {count: 1};
    this.setState({ loadIndex: index });
    if (index >= 0) {
      if (index < (playlistsItems.length - 2)) {
        // Specific playlist
        if (playlist.tracks.items === null) {
          actions.getTracklist(this, playlist.tracks.href, playlist.name, listCombine, requestCount);
        }
      } else if (index === (playlistsItems.length - 2)) {
        // LIKED TRACKS
        if (playlist.tracks.items === null) {
          actions.getTracklist(this, 'https://api.spotify.com/v1/me/tracks?limit=50', 'LIKED', listCombine, requestCount);
        }
      } else if (index === (playlistsItems.length - 1)) {
        // ALL TRACKS
        if (playlist.tracks.items === null) {
          requestCount.count = playlistsItems.length - 1;
          actions.getAllTracks(this, playlistsItems, 'ALL TRACKS', listCombine, requestCount);
        }
      }
    }
  }

  // Sort ActiveTrackList in place.
  sortActiveTrackList = (columnName) => {
    this.setState({ loading: true });
    const atl = this.state.playlists.items[this.state.activeIndex];
    actions.sortTrackList(atl.tracks, columnName);
    this.setState({ playlists: this.state.playlists, loading: false });
  }

  handleClick = (e, playlistProps) => {
    const {active, index} = playlistProps;
    const newIndex = active ? -1 : index;
    this.setState({ activeIndex: newIndex });
    if (newIndex >= 0) {
      this.fetchTrackList(newIndex);
    }
  }

  render() {
    const {activeIndex, loading, playlists} = this.state;
    const {accessToken} = this.props;
    if (playlists) {
      return (
        <Playlists accessToken={accessToken} activeIndex={activeIndex} onClick={this.handleClick} onSort={this.sortActiveTrackList} playlists={playlists.items} loading={loading} />
      );
    } else {
      return null;
    }
  }
}

PlaylistsPage.propTypes = {
  accessToken: PropTypes.string.isRequired,
}
