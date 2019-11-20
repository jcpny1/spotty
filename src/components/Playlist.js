import React from 'react';
import {Accordion, Button, Icon, Image, Table} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import {TrackList} from './TrackList';

export const Playlist = (props) => {
  const {active, index, onClick, onSort, playlist, trackList} = props;

  return (
    <Accordion>
      <Accordion.Title active={active} index={index} onClick={onClick}>
        <Icon name='dropdown' /> {playlist.name}
      </Accordion.Title>
      <Accordion.Content active={active}>
        <Table>
          <Table.Row>
            <Table.Cell width={1}>
              <Image src={playlist.images[0].url} size='small' />
            </Table.Cell>
            <Table.Cell width={15} verticalAlign='bottom'>
              <Button content='Replace photo' className='link' size='small'/>
              <p></p>
              <Button content='Edit Playlist' className='link' size='small'/>
            </Table.Cell>
          </Table.Row>
        </Table>
      <TrackList trackList={trackList} onSort={onSort}/>
      </Accordion.Content>
    </Accordion>
  );
}

Playlist.propTypes = {
  active: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  playlist: PropTypes.object.isRequired,
  trackList: PropTypes.object.isRequired,
}
