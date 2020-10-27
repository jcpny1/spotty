import React, {Component} from 'react';
import {Header, Modal} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import {Credentials} from '../components/Credentials';
import * as actions from '../actions/actions';

export default class CredentialsPage extends Component {
  constructor() {
    super();
    this.state = {
      data:       null,
      fetchError: null,
    };
  }

  componentDidMount() {
    actions.getCredentials(this, this.props.accessToken);
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

CredentialsPage.propTypes = {
  accessToken: PropTypes.string.isRequired,
  trigger:     PropTypes.object.isRequired,
}
