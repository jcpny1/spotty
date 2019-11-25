import React from 'react';
import {Button, Icon, Table} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import TrackDetailsPage from '../containers/TrackDetailsPage';

export const TrackList = (props) => {
  const {accessToken, trackList, onSort} = props;

  function columnTitles() {
    return (
      <Table.Row>
        <Table.HeaderCell onClick={() => onSort('track.name')}>Title</Table.HeaderCell>
        <Table.HeaderCell onClick={() => onSort('track.artists[0].name')}>Artist</Table.HeaderCell>
        <Table.HeaderCell onClick={() => onSort('track.duration_ms')} textAlign='center'>Duration</Table.HeaderCell>
        <Table.HeaderCell onClick={() => onSort('track.popularity')}  textAlign='center'>Popularity</Table.HeaderCell>
        <Table.HeaderCell onClick={() => onSort('track.preview_url')} textAlign='center'>Preview</Table.HeaderCell>
        <Table.HeaderCell onClick={() => onSort('added_at')}          textAlign='center'>Added</Table.HeaderCell>
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
      const DATE_OPTIONS = { year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
      const locale = 'en-US';
      const dateFormat = new Intl.DateTimeFormat(locale, DATE_OPTIONS);
      const addDate = dateFormat.format(new Date(item.added_at)).replace(',', '');
      return (
        <Table.Row key={index} draggable='true'>
          <TrackDetailsPage accessToken={accessToken} trigger={<Button content={item.track.name} title='Show track details' className='link' size='medium'/>}/>
          <Table.Cell>{item.track.artists[0].name}</Table.Cell>
          <Table.Cell textAlign='center'>{msToHms(item.track.duration_ms)}</Table.Cell>
          <Table.Cell textAlign='center'>{item.track.popularity}</Table.Cell>
          <Table.Cell textAlign='center'>
            <a href={item.track.preview_url} target='_blank' rel='noopener noreferrer'><Icon name='play' title='Play' link/></a>
          </Table.Cell>
          <Table.Cell textAlign='center'>{addDate}</Table.Cell>
        </Table.Row>
      );
    });
  }

  if (trackList) {
    return (
      <Table compact selectable sortable striped style={{marginTop:0}}>
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
  accessToken: PropTypes.string.isRequired,
  onSort:      PropTypes.func.isRequired,
  trackList:   PropTypes.object,
}
