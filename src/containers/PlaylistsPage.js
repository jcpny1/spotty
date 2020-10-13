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
      activeIndex:     -1,
      activeTrackList: null,
      data:            {},
      sortDirection:   '',
      sortColumn: '',
    };
  }

  componentDidMount() {
    actions.getPlaylists(this, this.props.accessToken);
  }

  fetchTrackList(index) {
    this.setState({activeTrackList: null, activeIndex: -1, sortDirection: ''});
    if (index >= 0) {
      // Make a call using the token
      if (index < (this.state.data.items.length - 2)) {
        // Specified track.
        $.ajax({
          url: this.state.data.items[index].tracks.href,
          type: "GET",
          beforeSend: (xhr) => {
            xhr.setRequestHeader("Authorization", "Bearer " + this.props.accessToken);
          },
          success: (data) => {
            this.setState({activeTrackList: data, activeIndex: index, sortDirection: ''});
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
            this.setState({activeTrackList: data, activeIndex: index, sortDirection: ''});
          }
        });
      } else if (index === (this.state.data.items.length - 1)) {
        // ALL TRACKS
        const playlists=this.state.data.items;
        this.setState({activeTrackList: {items:[]}, activeIndex: index, sortDirection: ''});
        for (var i = 0; i < (playlists.length - 2); i++) {
          $.ajax({
            url: playlists[i].tracks.href,
            type: "GET",
            beforeSend: (xhr) => {
              xhr.setRequestHeader("Authorization", "Bearer " + this.props.accessToken);
            },
            success: (data) => {
              var xxx = this.state.activeTrackList;
              for (var j = 0; j < data.items.length; j++) {
                xxx.items.push(data.items[j]);
              }
              this.setState({activeTrackList: xxx, activeIndex: index, sortDirection: ''});
            }
          });
        };
      }
    }
  }

// clean this up a bit.
  sortActiveTrackList = (columnName) => {
      var data = this.state.activeTrackList;
      const dir = (this.state.sortColumn !== columnName) ? 'a' : (this.state.sortDirection === 'a') ? 'd' : 'a';

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
