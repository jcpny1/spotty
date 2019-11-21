import React from 'react';
import {Table} from 'semantic-ui-react';
import PropTypes from 'prop-types';

export const TrackList = (props) => {
  const {trackList, onSort} = props;

  function columnTitles() {
    return (
      <Table.Row>
        <Table.HeaderCell onClick={() => onSort('track.name')}>Title</Table.HeaderCell>
        <Table.HeaderCell onClick={() => onSort('track.artists[0].name')}>Artist</Table.HeaderCell>
        <Table.HeaderCell onClick={() => onSort('track.duration_ms')} textAlign='center'>Duration</Table.HeaderCell>
        <Table.HeaderCell onClick={() => onSort('track.popularity')} textAlign='center'>Popularity</Table.HeaderCell>
        <Table.HeaderCell onClick={() => onSort('added_at')} textAlign='center'>Added</Table.HeaderCell>
      </Table.Row>
    );
  }

  function msToHms(ms) {
    const seconds = Math.floor((ms/1000) % 60);
    const minutes = Math.floor((ms/(1000*60)) % 60);
    const hours   = Math.floor((ms/(1000*60*60)) % 24);
    return hours.toLocaleString  ('en-US', {minimumIntegerDigits:2}) + ':' +
           minutes.toLocaleString('en-US', {minimumIntegerDigits:2}) + ':' +
           seconds.toLocaleString('en-US', {minimumIntegerDigits:2});
  }

  function listTracks(trackList) {
    return trackList.items.map(function(item, index) {
      return (
        <Table.Row key={index}>
          <Table.Cell>{item.track.name}</Table.Cell>
          <Table.Cell>{item.track.artists[0].name}</Table.Cell>
          <Table.Cell textAlign='center'>{msToHms(item.track.duration_ms)}</Table.Cell>
          <Table.Cell textAlign='center'>{item.track.popularity}</Table.Cell>
          <Table.Cell textAlign='center'>{item.added_at}</Table.Cell>
        </Table.Row>
      );
    });
  }

  if (trackList) {
    return (
      <Table compact sortable striped style={{marginTop:0}}>
        <Table.Header>{columnTitles()}</Table.Header>
        <Table.Body>{listTracks(trackList)}</Table.Body>
        <Table.Footer></Table.Footer>
      </Table>
    );
  } else {
    return null;
  }
}

TrackList.propTypes = {
  trackList: PropTypes.object.isRequired,
}
