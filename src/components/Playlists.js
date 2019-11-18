import React from 'react';
import {Image, Table} from 'semantic-ui-react';
import PropTypes from 'prop-types';

export const Playlists = (props) => {
  const {profile_data} = props;

  function listPlaylists(playlists) {
    return playlists.items.map(playlist => {
      return (
        <Table.Row>
          <Table.Cell>{playlist.name}</Table.Cell>
        </Table.Row>
      );
    });
  }

  return (
    <div>
      <Table compact striped>
        <Table.Body>{listPlaylists(profile_data)}</Table.Body>
      </Table>
    </div>
  );
}

Playlists.propTypes = {
  profile_data: PropTypes.object.isRequired,
}
