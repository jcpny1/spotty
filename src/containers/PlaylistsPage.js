import React, {Component} from 'react';
import * as $ from "jquery";
import _ from 'lodash';
import PropTypes from 'prop-types';
import {Playlists} from '../components/Playlists';
import * as actions from '../actions/actions';

export default class PlaylistsPage extends Component {
  constructor() {
    super();
    this.state = {
      activeIndex:     -1,   // index into data
      activeTrackList: null,
      data:            {},   // playlists
      sortDirection:   '',
      sortColumn: '',
    };
  }

  componentDidMount() {
    actions.getPlaylists(this, this.props.accessToken);
  }

  fetchTrackList(index) {
    this.setState({activeTrackList: {items:[]}, activeIndex: index, sortDirection: ''});
    if (index >= 0) {
      // Make a call using the token
      if (index < (this.state.data.items.length - 2)) {
        // Specified playlist.
        const playlist = this.state.data.items[index];
        $.ajax({
          url: playlist.tracks.href,
          type: "GET",
          beforeSend: (xhr) => {
            xhr.setRequestHeader("Authorization", "Bearer " + this.props.accessToken);
          },
          success: (data) => {
//            if (this.state.activeIndex === (this.state.data.items.length - 2)) {  // are we still servicing this request?
              this.setState({activeTrackList: data});
//            }
          }
        });
      } else if (index === (this.state.data.items.length - 2)) {
        // LIKED TRACKS
        $.ajax({
          url: "https://api.spotify.com/v1/me/tracks",
          type: "GET",
          beforeSend: (xhr) => {
            xhr.setRequestHeader("Authorization", "Bearer " + this.props.accessToken);
          },
          success: (data) => {
            if (this.state.activeIndex === (this.state.data.items.length - 2)) {  // are we still servicing this request?
              this.setState({activeTrackList: data});
            }
          }
        });
      } else if (index === (this.state.data.items.length - 1)) {
        // ALL TRACKS
        const playlists=this.state.data.items;
        for (var i = 0; i < (playlists.length - 2); i++) {
          // All playlists
          $.ajax({
            url: playlists[i].tracks.href,
            type: "GET",
            beforeSend: (xhr) => {
              xhr.setRequestHeader("Authorization", "Bearer " + this.props.accessToken);
            },
            success: (data) => {
              if (this.state.activeIndex === (this.state.data.items.length - 1)) {  // are we still servicing this request?
                var xxx = this.state.activeTrackList;

                // convert playlist id to playlist name.
                const playlistId = data.href.split('/')[5];  // get playlist id
                const playlist = this.state.data.items.find(o => o.id === playlistId);  // find playlist object

                for (var j = 0; j < data.items.length; j++) {
                  data.items[j].playlistName = playlist.name; // add playlist name as property to each item.
                  xxx.items.push(data.items[j]);
                }
                this.setState({sortColumn: ''});
                this.sortActiveTrackList('track.name');
                this.setState({activeTrackList: xxx});
              }
            }
          });
        }
        // LIKED TRACKS
        $.ajax({
          url: "https://api.spotify.com/v1/me/tracks",
          type: "GET",
          beforeSend: (xhr) => {
            xhr.setRequestHeader("Authorization", "Bearer " + this.props.accessToken);
          },
          success: (data) => {
            if (this.state.activeIndex === (this.state.data.items.length - 1)) {  // are we still servicing this request?
              var xxx = this.state.activeTrackList;

              for (var j = 0; j < data.items.length; j++) {
                data.items[j].playlistName = 'LIKED'; // add playlist name as property to each item.
                xxx.items.push(data.items[j]);
              }
              this.setState({sortColumn: ''});
              this.sortActiveTrackList('track.name');
              this.setState({activeTrackList: xxx});
            }
          }
        });
      }
    }
  }

// clean this up a bit.
  sortActiveTrackList = (columnName, direction = null) => {
      var data = this.state.activeTrackList;
      var dir = direction;

      if (dir === null) {
        dir = (this.state.sortColumn !== columnName) ? 'a' : (this.state.sortDirection === 'a') ? 'd' : 'a';
      }

      data.items = data.items.sort(function (item1, item2) {
        // item1 = eval('item1.' + columnName);
        // item2 = eval('item2.' + columnName);
        item1 = _.get(item1, columnName);
        item2 = _.get(item2, columnName);

        if (typeof item1 === 'string') {
          if (dir === 'a') {
            return item1.localeCompare(item2, 'en', { sensitivity: 'base' })
          } else {
            return item2.localeCompare(item1, 'en', { sensitivity: 'base' })
          }
        } else {
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
        }
      });
      this.setState({activeTrackList: data, sortColumn: columnName, sortDirection: dir});
  }

  handleClick = (e, playlistProps) => {
    const {active, index} = playlistProps;
    const newIndex = active ? -1 : index;  // toggle active
    this.setState({activeIndex: newIndex});
    this.fetchTrackList(newIndex);
  }

  render() {
    const {accessToken} = this.props;
    const {activeIndex, activeTrackList, data} = this.state;
    if (data) {
      return (
        <Playlists accessToken={accessToken} activeIndex={activeIndex} activeTrackList={activeTrackList} onClick={this.handleClick} onSort={this.sortActiveTrackList} playlists={data.items}/>
      );
    } else {
      return null;
    }
  }
}

PlaylistsPage.propTypes = {
  accessToken: PropTypes.string.isRequired,
}
