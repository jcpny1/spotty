import React from 'react';
import {Button, Icon, Table} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import TrackDetailsPage from '../containers/TrackDetailsPage';
// import {TrackMenu} from './TrackMenu';
import * as actions from '../actions/actions';

// const DATE_OPTIONS = { year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
const DATE_OPTIONS = { year: '2-digit', month: '2-digit', day: '2-digit' };
const LOCALE       = 'en-US';
const DATE_FORMAT  = new Intl.DateTimeFormat(LOCALE, DATE_OPTIONS);

export const TrackList = (props) => {
  const {playlistName, trackList, onSort} = props;

  // function menuItemAdmin(trackName) {
  //   return (
  //     <TrackMenu trackName={trackName}>
  //     </TrackMenu>
  //   );
    // return (
    //   <Dropdown>
    //     <Dropdown.Menu>
    //       <Dropdown.Item text='Add to playlist' />
    //       <Dropdown.Item text='Remove from playlist' />
    //     </Dropdown.Menu>
    //   </Dropdown>
    // );
  // }

  function columnTitles() {
    if (playlistName === 'ALL TRACKS') {
      return (
        <Table.Row>
          <Table.HeaderCell className='sticky' onClick={() => onSort('track.name')}>Title</Table.HeaderCell>
          <Table.HeaderCell className='sticky' onClick={() => onSort('track.artists[0].name')}>Artist</Table.HeaderCell>
          <Table.HeaderCell className='sticky' onClick={() => onSort('track.album.name')}>Album</Table.HeaderCell>
          <Table.HeaderCell className='sticky' onClick={() => onSort('playlistName')}>Playlist</Table.HeaderCell>
          <Table.HeaderCell className='sticky' onClick={() => onSort('duplicate')}>Duplicate</Table.HeaderCell>
          <Table.HeaderCell className='sticky' onClick={() => onSort('track.duration_ms')} textAlign='center'>Duration</Table.HeaderCell>
          <Table.HeaderCell className='sticky' onClick={() => onSort('track.popularity')}  textAlign='center'>Popularity</Table.HeaderCell>
          <Table.HeaderCell className='sticky' onClick={() => onSort('track.preview_url')} textAlign='center'>Preview</Table.HeaderCell>
          <Table.HeaderCell className='sticky' onClick={() => onSort('added_at')}          textAlign='center'>Added</Table.HeaderCell>
        </Table.Row>
      );
    } else {
      return (
        <Table.Row>
          <Table.HeaderCell className='sticky'>Title</Table.HeaderCell>
          <Table.HeaderCell className='sticky'>Artist</Table.HeaderCell>
          <Table.HeaderCell className='sticky'>Album</Table.HeaderCell>
          <Table.HeaderCell className='sticky'>Duplicate</Table.HeaderCell>
          <Table.HeaderCell className='sticky' textAlign='center'>Duration</Table.HeaderCell>
          <Table.HeaderCell className='sticky' textAlign='center'>Popularity</Table.HeaderCell>
          <Table.HeaderCell className='sticky' textAlign='center'>Preview</Table.HeaderCell>
          <Table.HeaderCell className='sticky' textAlign='center'>Added</Table.HeaderCell>
        </Table.Row>
      );
    }
  }

  function listTracks(trackList) {
    return trackList.items.map((item, index) => {
      // const addDate = DATE_FORMAT.format(new Date(item.added_at)).replace(',', '');
      const addDate = DATE_FORMAT.format(new Date(item.added_at));
      const allTracks = playlistName === 'ALL TRACKS';
      return (
        <Table.Row key={index} draggable='true'>
          <Table.Cell><TrackDetailsPage track={item.track} trigger={<Button content={item.track.name} title='Show track details' className='link' style={{background:'none', textAlign:'left'}} size='medium'/>}/></Table.Cell>
          <Table.Cell>{item.track.artists[0].name}</Table.Cell>
          <Table.Cell>{item.track.album.name}</Table.Cell>
          {allTracks && <Table.Cell>{item.playlistName}</Table.Cell>}
          <Table.Cell>{item.duplicate  && 'true'}</Table.Cell>
          <Table.Cell textAlign='center'>{actions.msToHMS(item.track.duration_ms)}</Table.Cell>
          <Table.Cell textAlign='center'>{item.track.popularity}</Table.Cell>
          <Table.Cell textAlign='center'>{item.track.preview_url && <a href={item.track.preview_url} target='_blank' rel='noopener noreferrer'><Icon name='play' title='Play' /></a>}</Table.Cell>
          <Table.Cell textAlign='center'>{addDate}</Table.Cell>
        </Table.Row>
      );
    });
  }
  // <Table.Row>
  //   <Table.Cell width={16}><iframe title='preview player' name={`iframe_${index}`} src='about:blank' height='50px' width='100%'></iframe></Table.Cell>
  // </Table.Row>

  if (trackList && trackList.items) {
    const isSortable = (playlistName === 'ALL TRACKS') ? 'sortable' : '';
    return (
      <Table compact='very' selectable className={isSortable} striped style={{marginTop:0}}>
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
  onSort:       PropTypes.func.isRequired,
  playlistName: PropTypes.string.isRequired,
  trackList:    PropTypes.object,
}
