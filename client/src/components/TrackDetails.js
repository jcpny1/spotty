import React from 'react';
import {Image, Table} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import * as actions from '../actions/actions';

export const TrackDetails = (props) => {
  const {track} = props;

  return (
    <div>
      <Table compact striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>{track.album.images[0] && <Image src={track.album.images[0].url} size='small'/>}</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell width={1}>Track</Table.Cell>
            <Table.Cell>{track.name}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>ID</Table.Cell>
            <Table.Cell>{track.id}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Album</Table.Cell>
            <Table.Cell>{track.album.name}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Artist</Table.Cell>
            <Table.Cell>{track.artists.map(a => a.name).join(', ')}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Disc</Table.Cell>
            <Table.Cell>{track.disc_number}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Track</Table.Cell>
            <Table.Cell>{track.track_number}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Duration</Table.Cell>
            <Table.Cell>{actions.msToHMS(track.duration_ms)}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Explicit</Table.Cell>
            <Table.Cell>{track.explicit && 'yes'.toString()}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Local</Table.Cell>
            <Table.Cell>{track.is_local && 'yes'}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Markets</Table.Cell>
            <Table.Cell>{track.available_markets.join(', ')}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
}

TrackDetails.propTypes = {
  track: PropTypes.object.isRequired,
}
