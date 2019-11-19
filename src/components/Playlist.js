import React from 'react';
import {Accordion, Icon, Image, Table} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import {TrackList} from './TrackList';

export const Playlist = (props) => {
  const {active, index, onClick, playlist, trackList} = props;

  return (
    <Accordion>
      <Accordion.Title active={active} index={index} onClick={onClick}>
        <Icon name='dropdown' /> {playlist.name}
      </Accordion.Title>
      <Accordion.Content active={active}>
        <Image src={playlist.images[0].url} size='small' />
        <TrackList trackList={trackList}/>
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
