import React, {Component} from 'react';
import * as $ from "jquery";
import {Header, Modal} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import {Playlists} from '../components/Playlists';

export default class PlaylistsPage extends Component {
  constructor() {
    super();
    this.state = {
      data: null,
    };
  }

  componentDidMount() {
    // Make a call using the token
    $.ajax({
      url: 'https://api.spotify.com/v1/users/22ktibc2flnvkjz3nhv2dlhji/playlists',
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

  render() {
    return (
      <span>
      <Modal trigger={this.props.trigger} closeIcon='close'>
        <Modal.Header><Header content='Playlists' icon='info circle' size='small'/></Modal.Header>
        <Modal.Content><Playlists profile_data={this.state.data}/></Modal.Content>
        <Modal.Actions></Modal.Actions>
      </Modal>
      </span>
    );
  }
}

PlaylistsPage.propTypes = {
  access_token: PropTypes.string.isRequired,
  trigger: PropTypes.object.isRequired,
}
