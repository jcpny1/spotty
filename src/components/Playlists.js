import React from 'react';
import {Accordion, Icon, Image, Table} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import {Playlist} from './Playlist';

export const Playlists = (props) => {
  const {activeIndex, activeTrackList, onClick, onSort, profileData} = props;

  function listPlaylists(playlists) {
    return playlists.items.map(function(playlist, index) {
      const active = activeIndex === index;
      const trackList = active ? activeTrackList : null;
      return (
        <Playlist key={index} active={active} index={index} onClick={onClick} onSort={onSort} playlist={playlist} trackList={trackList}/>
      );
    });
  }

  return (
    <div>
      <Accordion>
        {listPlaylists(profileData)}
      </Accordion>
    </div>
  );
}

Playlists.propTypes = {
  activeIndex: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  profileData: PropTypes.object.isRequired,
}
