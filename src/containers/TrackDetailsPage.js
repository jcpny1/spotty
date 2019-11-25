import React, {Component} from 'react';
import {Header, Modal} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import {TrackDetails} from '../components/TrackDetails';

export default class TrackDetailsPage extends Component {
  render() {
    return (
      <Modal trigger={this.props.trigger} closeIcon='close'>
        <Modal.Header><Header content='Track Details' icon='info circle' size='small'/></Modal.Header>
        <Modal.Content><TrackDetails track={this.props.track}/></Modal.Content>
        <Modal.Actions></Modal.Actions>
      </Modal>
    );
  }
}

TrackDetailsPage.propTypes = {
  track:   PropTypes.object.isRequired,
  trigger: PropTypes.object.isRequired,
}
