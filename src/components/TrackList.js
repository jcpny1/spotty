import React from 'react';
import {Accordion, Icon, Image, Table} from 'semantic-ui-react';
import PropTypes from 'prop-types';

export const TrackList = (props) => {
  const {trackList} = props;

  function listTracks(trackList) {
    return trackList.items.map(function(item, index) {
      return (
        <span key={index}>
          <p>{item.track.name}</p>
        </span>
      );
    });
  }

  if (trackList) {
    return (
      <div>
        {listTracks(trackList)}
      </div>
    );
  } else {
    return null;
  }
}

TrackList.propTypes = {
  trackList: PropTypes.object.isRequired,
}
