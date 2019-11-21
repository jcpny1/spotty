import React, {Component} from 'react';
import * as $ from "jquery";
import {Header, Modal} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import {Credentials} from '../components/Credentials';

export default class PreviewPage extends Component {
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
        xhr.setRequestHeader("Authorization", "Bearer " + this.props.accessToken);
      },
      success: (data) => {
        this.setState({
          data: data,
        });
      }
    });
  }

  render() {
    const {data} = this.state;
    if (data) {
      return (
        <Modal trigger={this.props.trigger} closeIcon='close'>
          <Modal.Header><Header content='Credentials' icon='info circle' size='small'/></Modal.Header>
          <Modal.Content><Credentials profile_data={data}/></Modal.Content>
          <Modal.Actions></Modal.Actions>
        </Modal>
      );
    } else {
      return null;
    }
  }
}

PreviewPage.propTypes = {
  accessToken: PropTypes.string.isRequired,
  trigger:     PropTypes.object.isRequired,
}
