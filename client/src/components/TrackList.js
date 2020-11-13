import React from 'react';
import {Button, Icon, Table} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import TrackDetailsPage from '../containers/TrackDetailsPage';
// import {TrackMenu} from './TrackMenu';
import * as utils from '../actions/utils';

// const DATE_OPTIONS = { year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
const DATE_OPTIONS = { year: '2-digit', month: '2-digit', day: '2-digit' };
const LOCALE       = 'en-US';
const DATE_FORMAT  = new Intl.DateTimeFormat(LOCALE, DATE_OPTIONS);

export const TrackList = (props) => {
  const {onSort, showPlaylistName, tracks} = props;

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
    if (showPlaylistName) {
      return (
        <Table.Row>
          <Table.HeaderCell className='sticky' sorted={tracks.sortColumnName === 'track.name'            ? tracks.sortDirection : null} onClick={() => onSort('track.name')}                          >Title</Table.HeaderCell>
          <Table.HeaderCell className='sticky' sorted={tracks.sortColumnName === 'track.artists[0].name' ? tracks.sortDirection : null} onClick={() => onSort('track.artists[0].name')}               >Artist</Table.HeaderCell>
          <Table.HeaderCell className='sticky' sorted={tracks.sortColumnName === 'track.album.name'      ? tracks.sortDirection : null} onClick={() => onSort('track.album.name')}                    >Album</Table.HeaderCell>
          <Table.HeaderCell className='sticky' sorted={tracks.sortColumnName === 'playlistName'          ? tracks.sortDirection : null} onClick={() => onSort('playlistName')}                        >Playlist</Table.HeaderCell>
          <Table.HeaderCell className='sticky' sorted={tracks.sortColumnName === 'duplicate'             ? tracks.sortDirection : null} onClick={() => onSort('duplicate')}                           >Duplicate</Table.HeaderCell>
          <Table.HeaderCell className='sticky' sorted={tracks.sortColumnName === 'track.duration_ms'     ? tracks.sortDirection : null} onClick={() => onSort('track.duration_ms')} textAlign='center'>Duration</Table.HeaderCell>
          <Table.HeaderCell className='sticky' sorted={tracks.sortColumnName === 'track.popularity'      ? tracks.sortDirection : null} onClick={() => onSort('track.popularity')}  textAlign='center'>Popularity</Table.HeaderCell>
          <Table.HeaderCell className='sticky' sorted={tracks.sortColumnName === 'track.preview_url'     ? tracks.sortDirection : null} onClick={() => onSort('track.preview_url')} textAlign='center'>Preview</Table.HeaderCell>
          <Table.HeaderCell className='sticky' sorted={tracks.sortColumnName === 'added_at'        ? tracks.sortDirection : null} onClick={() => onSort('added_at')}          textAlign='center'>Added</Table.HeaderCell>
        </Table.Row>
      );
    } else {
      return (
        <Table.Row>
          <Table.HeaderCell className='sticky'                   >Title<     /Table.HeaderCell>
          <Table.HeaderCell className='sticky'                   >Artist<    /Table.HeaderCell>
          <Table.HeaderCell className='sticky'                   >Album<     /Table.HeaderCell>
          <Table.HeaderCell className='sticky'                   >Duplicate< /Table.HeaderCell>
          <Table.HeaderCell className='sticky' textAlign='center'>Duration<  /Table.HeaderCell>
          <Table.HeaderCell className='sticky' textAlign='center'>Popularity</Table.HeaderCell>
          <Table.HeaderCell className='sticky' textAlign='center'>Preview<   /Table.HeaderCell>
          <Table.HeaderCell className='sticky' textAlign='center'>Added<     /Table.HeaderCell>
        </Table.Row>
      );
    }
  }

  function listTracks(tracks) {
    return tracks.items.map((item, index) => {
      const addDate = DATE_FORMAT.format(new Date(item.added_at));  // const addDate = DATE_FORMAT.format(new Date(item.added_at)).replace(',', '');
      return (
        <Table.Row key={index} draggable='true'>
          <Table.Cell><TrackDetailsPage track={item.track} trigger={<Button content={item.track.name} title='Show track details' className='link' style={{background:'none', textAlign:'left'}} size='medium'/>}/></Table.Cell>
          <Table.Cell>{item.track.artists[0].name}</Table.Cell>
          <Table.Cell>{item.track.album.name}</Table.Cell>
          {showPlaylistName && <Table.Cell>{item.playlistName}</Table.Cell>}
          <Table.Cell>{item.duplicate  && 'true'}</Table.Cell>
          <Table.Cell textAlign='center'>{utils.msToHMS(item.track.duration_ms)}</Table.Cell>
          <Table.Cell textAlign='center'>{item.track.popularity}</Table.Cell>
          <Table.Cell textAlign='center'>{item.track.preview_url && <a href={item.track.preview_url} target='_blank' rel='noopener noreferrer'><Icon name='play' title='Play' /></a>}</Table.Cell>
          <Table.Cell textAlign='center'>{addDate}</Table.Cell>
        </Table.Row>
      );
    });
  }

  if (tracks && tracks.items) {
    const isSortable = showPlaylistName ? 'sortable' : '';
    return (
      <Table compact='very' selectable className={isSortable} striped style={{marginTop:0}}>
        <Table.Header>{columnTitles()}</Table.Header>
        <Table.Body>{listTracks(tracks)}</Table.Body>
        <Table.Footer></Table.Footer>
      </Table>
    );
  } else {
    return null;
  }
}

TrackList.propTypes = {
  onSort:           PropTypes.func.isRequired,
  showPlaylistName: PropTypes.bool.isRequired,
  tracks:           PropTypes.object,
}
