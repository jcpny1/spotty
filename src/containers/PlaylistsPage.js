import React, {Component} from 'react';
import * as $ from "jquery";
import _ from 'lodash';
import {Header, Modal} from 'semantic-ui-react';
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
    };
  }

  componentDidMount() {
    actions.getPlaylists(this, this.props.accessToken);
  }

  fetchTrackList(index) {
    if (index >= 0) {
      // Make a call using the token
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
    } else {
      this.setState({activeTrackList: null, activeIndex: -1, sortDirection: ''});
    }
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
    this.fetchTrackList(newIndex);
  }

  render() {
    const {activeIndex, activeTrackList, data} = this.state;
    if (data) {
      return (
        <Playlists accessToken={this.props.accessToken} activeIndex={activeIndex} activeTrackList={activeTrackList} onClick={this.handleClick} onSort={this.sortActiveTrackList} playlists={data.items}/>
      );
    } else {
      return null;
    }
  }
}

PlaylistsPage.propTypes = {
  accessToken: PropTypes.string.isRequired,
  trigger:     PropTypes.object.isRequired,
}
