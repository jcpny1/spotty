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
      activeIndex:     -1,   // index into playlists.items
      activeTrackList: null,
      playlists:       null,   // Spotify playlists response
      listCombine:     null,
      loading:         false,
      responseCount:   0,
    };
  }

  componentDidMount() {
    actions.getPlaylists(this, this.props.accessToken);
  }

  fetchTrackList(index) {
    this.setState({activeTrackList: {items:[]}, activeIndex: index, sortDirection: ''});
    if (index >= 0) {
      const playlistsItems=this.state.playlists.items;
      // Make a call using the token
      if (index < (playlistsItems.length - 2)) {
        // Specified playlist.
        const playlist = playlistsItems[index];
        $.ajax({
          url: playlist.tracks.href,
          type: "GET",
          beforeSend: (xhr) => {
            xhr.setRequestHeader("Authorization", "Bearer " + this.props.accessToken);
          },
          success: (data) => {
            if (this.state.activeIndex === index) {  // are we still servicing this request?
              this.setState({activeTrackList: data, loading: false});
            }
          }
        });
      } else if (index === (playlistsItems.length - 2)) {
        // LIKED TRACKS
        $.ajax({
          url: "https://api.spotify.com/v1/me/tracks",
          type: "GET",
          beforeSend: (xhr) => {
            xhr.setRequestHeader("Authorization", "Bearer " + this.props.accessToken);
          },
          success: (data) => {
            if (this.state.activeIndex === (playlistsItems.length - 2)) {  // are we still servicing this request?
              this.setState({activeTrackList: data, loading: false});
            }
          }
        });
      } else if (index === (playlistsItems.length - 1)) {
        // ALL TRACKS
        this.setState({responseCount: 0, listCombine: {items:[]}});
        for (var i = 0; i < (playlistsItems.length - 2); i++) {
          // All playlists
          $.ajax({
            url: playlistsItems[i].tracks.href,
            type: "GET",
            beforeSend: (xhr) => {
              xhr.setRequestHeader("Authorization", "Bearer " + this.props.accessToken);
            },
            success: (data) => {
              this.setState({responseCount: this.state.responseCount + 1});

              if (this.state.activeIndex === (playlistsItems.length - 1)) {  // are we still servicing this request?
                var atl = this.state.listCombine;

                // convert playlist id to playlist name.
                const playlistId = data.href.split('/')[5];  // get playlist id
                const playlist = playlistsItems.find(o => o.id === playlistId);  // find playlist object

                for (var j = 0; j < data.items.length; j++) {
                  data.items[j].playlistName = playlist.name; // add playlist name as property to each item.
                  atl.items.push(data.items[j]);
                }

                if (this.state.responseCount < (playlistsItems.length - 1)) {
                  this.setState({listCombine: atl});
                } else {
                  atl.sortColumnName = 'track.name';
                  atl.sortDirection = 'a';
                  this.sortTrackList(atl);
                  this.flagDuplicates(atl);
                  this.setState({activeTrackList: atl, loading: false});
                }
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
            this.setState({responseCount: this.state.responseCount + 1});

            if (this.state.activeIndex === (playlistsItems.length - 1)) {  // are we still servicing this request?
              var atl = this.state.listCombine;

              for (var j = 0; j < data.items.length; j++) {
                data.items[j].playlistName = 'LIKED'; // add playlist name as property to each item.
                atl.items.push(data.items[j]);
              }

              if (this.state.responseCount < (playlistsItems.length - 1)) {
                this.setState({listCombine: atl});
              } else {
                atl.sortColumnName = 'track.name';
                atl.sortDirection = 'a';
                this.sortTrackList(atl);
                this.flagDuplicates(atl);
                this.setState({activeTrackList: atl, loading: false});
              }
            }
          }
        });
      }
    }
  }

  // Mark tracklist duplicates.
  flagDuplicates = (atl) => {
    // Look for duplicates
    var counts = _.groupBy(atl.items, function(e) {return e.track.id})
    // Apply duplicate flag to duplicate items.
    for (const p in counts) {
      if (counts[p].length > 1) {
        _.forEach(counts[p], function(value) { value.duplicate = true; });
      }
    }
    atl.items = _.flatMapDepth(counts, null, 2);
  }

  sortActiveTrackList = (columnName) => {
    var atl = this.state.activeTrackList;
    atl.sortDirection = (atl.sortColumnName !== columnName) ? 'a' : (atl.sortDirection === 'a') ? 'd' : 'a';
    atl.sortColumnName = columnName;
    this.setState({activeTrackList: this.sortTrackList(atl)});
  }

// make specific, because columnName could be same, but table could be different. OR maybe store data in table instead of state.
// clean this up a bit.
  sortTrackList = (data) => {
    data.items = data.items.sort(function (item1, item2) {
      item1 = _.get(item1, data.sortColumnName);
      item2 = _.get(item2, data.sortColumnName);

      if (typeof item1 === 'string') {
        if (data.sortDirection === 'a') {
          return item1.localeCompare(item2, 'en', { sensitivity: 'base', numeric: true, ignorePunctuation: true });
        } else {
          return item2.localeCompare(item1, 'en', { sensitivity: 'base', numeric: true, ignorePunctuation: true });
        }
      } else {
        if (data.sortDirection === 'a') {
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

    return data;
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
    const {accessToken} = this.props;
    const {activeIndex, activeTrackList, loading, playlists} = this.state;
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
