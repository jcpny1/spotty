import React from 'react';
import {Image, Table} from 'semantic-ui-react';
import PropTypes from 'prop-types';

export const TrackDetails = (props) => {
  const {track} = props;

  function listTrackDetails(track) {
    return (
      <Table.Body>
        <Table.Row>
          <Table.Cell>Album Image</Table.Cell>
          <Table.Cell>{track.album.images[0] && <Image src={track.album.images[0].url} size='small'/>}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Album</Table.Cell>
          <Table.Cell>{track.album.name}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Artist</Table.Cell>
          <Table.Cell>{track.artists[0].name}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Track ID</Table.Cell>
          <Table.Cell>{track.id}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Markets</Table.Cell>
          <Table.Cell>{track.available_markets}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Disc Number</Table.Cell>
          <Table.Cell>{track.disc_number}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Duration (ms)</Table.Cell>
          <Table.Cell>{track.duration_ms}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Explicit</Table.Cell>
          <Table.Cell>{track.explicit.toString()}</Table.Cell>
        </Table.Row>
      </Table.Body>
    );
  }

  return (
    <div>
      <Table compact striped>
        {listTrackDetails(track)}
      </Table>
    </div>
  );
}

TrackDetails.propTypes = {
  track: PropTypes.object.isRequired,
}
