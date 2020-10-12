import React, {Component} from 'react';
import * as $ from "jquery";
import _ from 'lodash';
import PropTypes from 'prop-types';
import {Playlist} from '../components/Playlist';
import * as actions from '../actions/actions';

export default class AllTracksPage extends Component {
  constructor() {
    super();
    this.state = {
      activeIndex:     -1,
      activeTrackList: null,
      data:            {},
      sortDirection:   '',
    };
  }

  componentDidMount() {
    actions.getPlaylists(this, this.props.accessToken);
  }

  /* Fetch all tracks from all playlists. */
  fetchAllTracks() {
    const playlists=this.state.data.items;
    var allTracks = [];
    for (var index = 0; index < playlists.length; index++) {
      $.ajax({
        url: playlists[index].tracks.href,
        type: "GET",
        beforeSend: (xhr) => {
          xhr.setRequestHeader("Authorization", "Bearer " + this.props.accessToken);
        },
        success: (data) => {
          for (var index = 0; index < data.items.length; index++) {
            allTracks.push(data.items[index]);
          }
          this.setState({activeTrackList: allTracks, activeIndex: -1, sortDirection: ''});
        }
      });
    };
  }

  sortActiveTrackList = (columnName) => {
      var data = this.state.activeTrackList;
      const dir = (this.state.sortDirection === 'a') ? 'd' : 'a';
      data.items = data.items.sort(function (item1, item2) {
        // item1 = eval('item1.' + columnName);
        // item2 = eval('item2.' + columnName);
        item1 = _.get(item1, columnName);
        item2 = _.get(item2, columnName);
        if (dir === 'a') {
          if (item1 < item2) {
            return -1;
          }
          if (item1 > item2) {
            return 1;
          }
          return 0;
        } else {
          if (item1 < item2) {
            return 1;
          }
          if (item1 > item2) {
            return -1;
          }
          return 0;
        }
      });
      this.setState({activeTrackList: data, sortDirection: dir});
  }

  handleClick = (e, playlistProps) => {
    const {active, index} = playlistProps;
    const newIndex = active ? -1 : index;  // toggle active
    this.setState({activeIndex: newIndex});
    this.fetchAllTracks();
  }

  render() {
    const {accessToken} = this.props;
    const {data} = this.state;
    const playlist = {name:'ALL TRACKS', images:[]};
    if (data) {
      return (
//        <Playlists accessToken={accessToken} activeIndex={activeIndex} activeTrackList={activeTrackList} onClick={this.handleClick} onSort={this.sortActiveTrackList} playlists={data.items}/>
        <Playlist accessToken={accessToken} key={0} active={false} index={0} onClick={this.handleClick} onSort={this.sortActiveTrackList} playlist={playlist} trackList={null}/>
      );
    } else {
      return null;
    }
  }
}

AllTracksPage.propTypes = {
  accessToken: PropTypes.string.isRequired,
}