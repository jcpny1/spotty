import React, {Component} from 'react';
import * as $ from "jquery";
import {Header, Modal} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import {Credentials} from '../components/Credentials';

export default class CredentialsPage extends Component {
  constructor() {
    super();
    this.state = {
      data: null,
    };
  }

  componentDidMount() {
    // Make a call using the token
    $.ajax({
      url: "https://api.spotify.com/v1/me",
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
        <Modal.Header><Header content='Credentials' icon='info circle' size='small'/></Modal.Header>
        <Modal.Content><Credentials profile_data={this.state.data}/></Modal.Content>
        <Modal.Actions></Modal.Actions>
      </Modal>
      </span>
    );
  }
}

CredentialsPage.propTypes = {
  access_token: PropTypes.string.isRequired,
  trigger: PropTypes.object.isRequired,
}
