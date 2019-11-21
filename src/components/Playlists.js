import React from 'react';
import {Accordion} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import {Playlist} from './Playlist';

export const Playlists = (props) => {
  const {accessToken, activeIndex, activeTrackList, onClick, onSort, playlists} = props;

  function listPlaylists(playlists) {
    return playlists.map(function(playlist, index) {
      const active = activeIndex === index;
      const trackList = active ? activeTrackList : null;
      return (
        <Playlist accessToken={accessToken} key={index} active={active} index={index} onClick={onClick} onSort={onSort} playlist={playlist} trackList={trackList}/>
      );
    });
  }

  if (playlists) {
    return (
        <Accordion>
          {listPlaylists(playlists)}
        </Accordion>
    );
  } else {
    return null;
  }
}

Playlists.propTypes = {
  accessToken:     PropTypes.string.isRequired,
  activeIndex:     PropTypes.number.isRequired,
  activeTrackList: PropTypes.number.isRequired,
  onClick:         PropTypes.func.isRequired,
  onSort:          PropTypes.func.isRequired,
  playlists:       PropTypes.array.isRequired,
}
