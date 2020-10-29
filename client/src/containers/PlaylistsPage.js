import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Playlists} from '../components/Playlists';
import * as actions from '../actions/actions';

export default class PlaylistsPage extends Component {
  constructor() {
    super();
    this.state = {
      activeIndex:     -1,   // index into playlists.items
      activeTrackList:  {items:[]},
      playlists:       null,   // Spotify playlists response
      listCombine:     null,
      loading:         false,
      responseCount:   0,
      sortDirection:   '',
      fetchError:      null,
    };
  }

  componentDidMount() {
    actions.getPlaylists(this, this.props.accessToken);
  }

  fetchTrackList(index) {
    this.setState({activeTrackList: {items:[]}, activeIndex: index, sortDirection: ''});
    if (index >= 0) {
      const playlistsItems=this.state.playlists.items;
      if (index < (playlistsItems.length - 2)) {
        // Specific playlist
        const playlist = playlistsItems[index];
        actions.getTracklist(playlist.tracks.href, index, this, this.props.accessToken);
      } else if (index === (playlistsItems.length - 2)) {
        // LIKED TRACKS
        actions.getLikedTracklist(playlistsItems.length, this, this.props.accessToken);
      } else if (index === (playlistsItems.length - 1)) {
        // ALL TRACKS
        actions.getAllTracks(playlistsItems, this, this.props.accessToken);
      }
    }
  }

  // Sort ActiveTrackList in place.
  sortActiveTrackList = (columnName) => {
    const atl = this.state.activeTrackList;
    atl.sortDirection = (atl.sortColumnName !== columnName) ? 'a' : (atl.sortDirection === 'a') ? 'd' : 'a';
    atl.sortColumnName = columnName;
    actions.sortTrackList(atl);
    this.setState({activeTrackList: atl});
  }

  handleClick = (e, playlistProps) => {
    const {active, index} = playlistProps;
    const newIndex = active ? -1 : index;  // toggle active
    this.setState({activeIndex: newIndex, loading: (newIndex !== -1)});
    if (newIndex >= 0) {
      this.fetchTrackList(newIndex);
    }
  }

  render() {
    const {activeIndex, activeTrackList, loading, playlists} = this.state;
    const {accessToken} = this.props;
    if (playlists) {
      return (
        <Playlists accessToken={accessToken} activeIndex={activeIndex} activeTrackList={activeTrackList} onClick={this.handleClick} onSort={this.sortActiveTrackList} playlists={playlists.items} loading={loading} />
      );
    } else {
      return null;
    }
  }
}

PlaylistsPage.propTypes = {
  accessToken: PropTypes.string.isRequired,
}
