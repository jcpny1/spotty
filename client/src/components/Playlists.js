import React from 'react';
import {Accordion} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import {Playlist} from './Playlist';

export const Playlists = (props) => {
  const {accessToken, activeIndex, loading, onClick, onSort, playlists} = props;

  function listPlaylists(playlists) {
    return playlists.map((playlist, index) => {
      const active = activeIndex === index;
      return (
        <Playlist accessToken={accessToken} key={index} active={active} index={index} onClick={onClick} onSort={onSort} playlist={playlist} loading={loading} />
      );
    });
  }
  if (playlists) {
    return (
      <Accordion fluid styled>
        {listPlaylists(playlists)}
      </Accordion>
    );
  } else {
    return null;
  }
}

Playlists.propTypes = {
  accessToken:     PropTypes.string.isRequired,
  activeIndex:     PropTypes.number,
  onClick:         PropTypes.func.isRequired,
  onSort:          PropTypes.func.isRequired,
  playlists:       PropTypes.array,
}
