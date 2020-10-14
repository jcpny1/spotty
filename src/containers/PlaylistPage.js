import React, {Component} from 'react';
import * as $ from "jquery";
import _ from 'lodash';
import {Header, Modal} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import {Playlists} from '../components/Playlists';
import * as actions from '../actions/actions';

export default class PlaylistPage extends Component {
  constructor() {
    super();
    this.state = {
      activeIndex: -1,
      activeTrackList: null,
      data: {},
      sortDirection: '',
    };
  }

  componentDidMount() {
    actions.getPlaylists(this, this.props.accessToken);
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

  render() {
    const {trigger} = this.props;
    const {activeIndex, activeTrackList, data} = this.state;
    if (data) {
      return (
        <Modal trigger={trigger} closeIcon='close'>
          <Modal.Header><Header content='Playlists' icon='info circle' size='small'/></Modal.Header>
          <Modal.Content><Playlists activeIndex={activeIndex} activeTrackList={activeTrackList} onClick={this.props.handleClick} onSort={this.sortActiveTrackList} profileData={data}/></Modal.Content>
          <Modal.Actions></Modal.Actions>
        </Modal>
      );
    } else {
      return null;
    }
  }
}

PlaylistPage.propTypes = {
  accessToken: PropTypes.string.isRequired,
  trigger:     PropTypes.object.isRequired,
}
