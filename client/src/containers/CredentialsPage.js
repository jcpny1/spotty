import React, {Component} from 'react';
import {Header, Modal} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import {Credentials} from '../components/Credentials';
import * as utils from '../actions/utils';

export default class CredentialsPage extends Component {
  constructor() {
    super();
    this.state = {
      data:       null,
      fetchError: null,
    };
  }

  componentDidMount() {
    fetch('https://api.spotify.com/v1/me', {
      method:  'GET',
      headers: { 'Authorization': `Bearer ${this.props.accessToken}` }
    })
    .then(utils.statusCheck)
    .then(response => response.json())
    .then(data => {
      this.setState({data: data});
    })
    .catch(error => {
      alert(error.message);
      this.setState({ data: null, fetchError: error });
    });
  }

  render() {
    const {data} = this.state;
    const {accessToken, trigger} = this.props;
    if (data) {
      return (
        <Modal trigger={trigger} closeIcon='close'>
          <Modal.Header><Header content='Credentials' icon='info circle' size='large'/></Modal.Header>
          <Modal.Content><Credentials accessToken={accessToken} profile_data={data}/></Modal.Content>
          <Modal.Actions></Modal.Actions>
        </Modal>
      );
    } else {
      return null;
    }
  }
}

CredentialsPage.propTypes = {
  accessToken: PropTypes.string.isRequired,
  trigger:     PropTypes.object.isRequired,
}
