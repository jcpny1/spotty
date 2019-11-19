import React, {Component} from 'react';
import * as $ from "jquery";
import {Header, Modal} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import {Playlists} from '../components/Playlists';

export default class PlaylistsPage extends Component {
  constructor() {
    super();
    this.state = {
      activeIndex: 0,
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
        this.setState({
          data: data,
        });
      }
    });
  }

  handleClick = (e, titleProps) => {
    const {index} = titleProps;
    const {activeIndex} = this.state;
    const newIndex = activeIndex === index ? -1 : index;
    this.setState({activeIndex: newIndex});
  }

  render() {
    const {activeIndex, data} = this.state;
    if (data) {
      return (
        <span>
        <Modal trigger={this.props.trigger} closeIcon='close'>
          <Modal.Header><Header content='Playlists' icon='info circle' size='small'/></Modal.Header>
          <Modal.Content><Playlists activeIndex={activeIndex} onClick={this.handleClick} profileData={data}/></Modal.Content>
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
