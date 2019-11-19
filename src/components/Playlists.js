import React from 'react';
import {Accordion, Icon, Image, Table} from 'semantic-ui-react';
import PropTypes from 'prop-types';

export const Playlists = (props) => {
  const {activeIndex, onClick, profileData} = props;

  function listPlaylists(playlists) {
    return playlists.items.map(function(playlist, index) {
      return (
        <span>
        <Accordion.Title
          active={activeIndex === index}
          index={index}
          onClick={onClick}
        >
          <Icon name='dropdown' />
            {playlist.name}
        </Accordion.Title>
        <Accordion.Content active={activeIndex === index}>
          <p>playlist details</p>
        </Accordion.Content>
        </span>
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
