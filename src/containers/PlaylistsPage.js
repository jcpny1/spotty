import React, {Component} from 'react';
import * as $ from "jquery";
import {Header, Modal} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import {Playlists} from '../components/Playlists';

export default class PlaylistsPage extends Component {
  constructor() {
    super();
    this.state = {
      activeIndex: -1,
      activeTrackList: null,
      data: {},
    };
  }

  componentDidMount() {
    // Make a call using the token
    $.ajax({
      url: 'https://api.spotify.com/v1/me/playlists',
      type: "GET",
      beforeSend: (xhr) => {
        xhr.setRequestHeader("Authorization", "Bearer " + this.props.access_token);
      },
      success: (data) => {
        this.setState({data: data});
      }
    });
  }

  fetchTrackList(index) {
    if (index > 0) {
      // Make a call using the token
      $.ajax({
        url: this.state.data.items[index].tracks.href,
        type: "GET",
        beforeSend: (xhr) => {
          xhr.setRequestHeader("Authorization", "Bearer " + this.props.access_token);
        },
        success: (data) => {
          this.setState({activeTrackList: data});
        }
      });
    } else {
      this.setState({activeTrackList: null});
    }
  }

  sortActiveTrackList = (columnName) => {
      var data = this.state.activeTrackList;
if (data) {
      data.items.sort((item1, item2) => (item1.track.name > item2.track.name) ? 1 : -1);
      this.setState({activeTrackList: data});
}
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
        <span>
        <Modal trigger={this.props.trigger} closeIcon='close'>
          <Modal.Header><Header content='Playlists' icon='info circle' size='small'/></Modal.Header>
          <Modal.Content><Playlists activeIndex={activeIndex} activeTrackList={activeTrackList} onClick={this.handleClick} onSort={this.sortActiveTrackList} profileData={data}/></Modal.Content>
          <Modal.Actions></Modal.Actions>
        </Modal>
        </span>
      );
    } else {
      return null;
    }
  }
}

PlaylistsPage.propTypes = {
  access_token: PropTypes.string.isRequired,
  trigger: PropTypes.object.isRequired,
}
