import React from 'react';
import {Accordion, Button, Icon, Image, Loader, Table} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import {TrackList} from './TrackList';

export const Playlist = (props) => {
  const {active, index, loading, onClick, onSort, playlist} = props;
  const showPlaylistName = playlist.name === 'ALL TRACKS';
  const tracks = playlist.tracks;

  function listButtons() {
    return (
      <Table.Row key={index+3} draggable='true'>
        <Table.Cell width={1}>
          {playlist.images[0] && <Image src={playlist.images[0].url} size='small' />}
        </Table.Cell>
        <Table.Cell width={15} verticalAlign='bottom'>
          <Button content='Replace playlist photo' className='link' size='small'/>
          <p></p>
          <Button content='Download track list' className='link' size='small'/>
          <p></p>
          <Button content='Save track list changes' className='link' size='small'/>
        </Table.Cell>
      </Table.Row>
    );
  }

  function listDescription() {
    return (
      <Table.Row key={index+2} draggable='true'>
        <Table.Cell width={16}>
          Description: {playlist.description}
        </Table.Cell>
      </Table.Row>
    );
  }

  function listInfo() {
    return (
      <Table.Row key={index+1} draggable='true' textAlign='left'>
        <Table.Cell width={4}>
          Owner: {playlist.owner.display_name}
        </Table.Cell>
        <Table.Cell width={12}>
          Tracks: {tracks.items && tracks.items.length}
        </Table.Cell>
      </Table.Row>
    );
  }

  function listTitle(name) {
    return (
      <Accordion.Title active={active} index={index} onClick={onClick}>
        <Loader active={active && loading} inline />
        <Icon name='dropdown' />{name}
      </Accordion.Title>
    );
  }

  function listContent() {
    if (active) {
      return (
        <Accordion.Content active={active}>
          <Table>
            <Table.Body>
              {listInfo()}
              {listDescription()}
              {playlist.images[0] && listButtons()}
            </Table.Body>
          </Table>
        <TrackList tracks={tracks} showPlaylistName={showPlaylistName} onSort={onSort} />
        </Accordion.Content>
      );
    } else {
      return null;
    }
  }

  return (
    <span>
      {listTitle(playlist.name)}
      {listContent()}
    </span>
  );
}

Playlist.propTypes = {
  active:   PropTypes.bool.isRequired,
  index:    PropTypes.number.isRequired,
  loading:  PropTypes.bool.isRequired,
  onClick:  PropTypes.func.isRequired,
  onSort:   PropTypes.func.isRequired,
  playlist: PropTypes.object.isRequired,
}
