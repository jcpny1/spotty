import _ from 'lodash';

export function msToHMS(ms) {
  const seconds = Math.floor((ms/1000) % 60);
  const minutes = Math.floor((ms/(1000*60)) % 60);
  const hours   = Math.floor((ms/(1000*60*60)) % 24);
  return `${hours.toLocaleString('en-US', {minimumIntegerDigits:2})}:${minutes.toLocaleString('en-US', {minimumIntegerDigits:2})}:${seconds.toLocaleString('en-US', {minimumIntegerDigits:2})}`;
}

// Mark tracklist duplicates.
export function flagDuplicates(tracklist) {
  // Group tracks by track id.
  let groupedItems = _.groupBy(tracklist.items, function(item) { return item.track.id })
  // Look for duplicates and apply duplicate flag to duplicate items.
  for (const trackId in groupedItems) {
    if (trackId !== 'null' && groupedItems[trackId].length > 1) {
      _.forEach(groupedItems[trackId], function(item) { item.duplicate = true });
    }
  }
}

export function getAllTracks(playlistsItems, caller, token) {
  // Load saved playlists
  for (let i = 0; i < (playlistsItems.length - 2); ++i) {
    fetch(playlistsItems[i].tracks.href, {
      method:  'GET',
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(statusCheck)
    .then(response => response.json())
    .then(data => {
      const allIndex = caller.state.responseTarget + 1;

      if (data.next === null) {  // this is the last call for this playlist.
        caller.setState({responseCount: caller.state.responseCount + 1});
      }

      if (caller.state.activeIndex === allIndex) {  // are we still servicing this request?
        let atl = caller.state.listCombine;

        for (let j = 0; j < data.items.length; ++j) {
          data.items[j].playlistName = playlistsItems[i].name; // add playlist name as property to each item.
          atl.items.push(data.items[j]);
        }

        if (caller.state.responseCount < caller.state.responseTarget) {
          caller.setState({listCombine: atl});
          if (data.next !== null) {
            // initiate next fetch, if available.
            const nextPlaylistsItems = [];
            nextPlaylistsItems.push({name: playlistsItems[i].name, tracks: {href: data.next}});
// we should probably call this function with the exect playlists to be loaded, not this -2 stuff.
            nextPlaylistsItems.push({});
            nextPlaylistsItems.push({});
            getAllTracks(nextPlaylistsItems, caller, token);
          }
        } else {
          atl.sortColumnName = 'track.name';
          atl.sortDirection = 'a';
          flagDuplicates(atl);
          sortTrackList(atl);
          caller.setState({activeTrackList: atl, loading: false});
        }
      }
    })
    .catch(error => {
      caller.setState({activeTrackList: {items:[]}});
      console.error(`getAllTracks Playlist FAIL ${error}`);
    });
    // .finally(() => {
    //   caller.setState({loading: false});
    // });
    // {"status":401,"message":"Invalid access token"}},"status":401,"statusText":"Unauthorized"}
  }

  // Load LIKED TRACKS
  // dedup this with call to getLikedTracklist
  fetch('https://api.spotify.com/v1/me/tracks', {
    method:  'GET',
    headers: {'Authorization': `Bearer ${token}`}
  })
  .then(statusCheck)
  .then(response => response.json())
  .then(data => {
    if (data.next === null) {  // this is the last call for this playlist.
      caller.setState({responseCount: caller.state.responseCount + 1});
    }

    if (caller.state.activeIndex === (playlistsItems.length - 1)) {  // are we still servicing this request?
      let atl = caller.state.listCombine;

      for (let j = 0; j < data.items.length; ++j) {
        data.items[j].playlistName = 'LIKED'; // add playlist name as property to each item.
        atl.items.push(data.items[j]);
      }

      if (caller.state.responseCount < caller.state.responseTarget) {
        caller.setState({listCombine: atl});
      } else {
        atl.sortColumnName = 'track.name';
        atl.sortDirection = 'a';
        flagDuplicates(atl);
        sortTrackList(atl);
        caller.setState({activeTrackList: atl, loading: false});
      }
    }
  })
  .catch(error => {
    caller.setState({activeTrackList: {items:[]}});
    console.error(`getAllTracks LIKED FAIL ${error}`);
  });
  // .finally(() => {
  //   caller.setState({loading: false});
  // });
  // {"status":401,"message":"Invalid access token"}},"status":401,"statusText":"Unauthorized"}
}

export function getCredentials(caller, token) {
  fetch('https://api.spotify.com/v1/me', {
    method:  'GET',
    headers: {'Authorization': `Bearer ${token}`}
  })
  .then(statusCheck)
  .then(response => response.json())
  .then(data => {
      caller.setState({data: data});
    })
  .catch(error => {
    caller.setState({data: null});
    console.error(`getCredentials FAIL ${error}`);
  })
  .finally(() => {
    caller.setState({loading: false});
  })
// {"status":401,"message":"Invalid access token"}},"status":401,"statusText":"Unauthorized"}
}

export function getLikedTracklist(listLength, caller, token) {
  fetch('https://api.spotify.com/v1/me/tracks', {
    method:  'GET',
    headers: {'Authorization': `Bearer ${token}`}
  })
  .then(statusCheck)
  .then(response => response.json())
  .then(data => {
// just pass in the active index when initially called.
      if (caller.state.activeIndex === (listLength - 2)) {  // are we still servicing this request?
        caller.setState({activeTrackList: data});
      }
    })
  .catch(error => {
    caller.setState({activeTrackList: {items:[]}});
    console.error(`getLikedTracklist FAIL ${error}`);
  })
  .finally(() => {
    caller.setState({loading: false});
  })
// {"status":401,"message":"Invalid access token"}},"status":401,"statusText":"Unauthorized"}
}

export function getPlaylists(caller, token) {
  caller.setState({loading: true});
  fetch('https://api.spotify.com/v1/me/playlists', {
    method:  'GET',
    headers: {'Authorization': `Bearer ${token}`}
  })
  .then(statusCheck)
  .then(response => response.json())
  .then(data => {
    data.items = data.items.sort(function (item1, item2) {
        if (item1.name < item2.name) {
          return -1;
        }
        if (item1.name > item2.name) {
          return 1;
        }
        return 0;
      });
      // protect against no playlists.
      let copyItem = JSON.parse(JSON.stringify(data.items[0]));
      copyItem.name = 'LIKED';
      copyItem.id = 'LIKED';
      copyItem.images = [];
      data.items.push(copyItem);
      // protect against no playlists.
      copyItem = JSON.parse(JSON.stringify(copyItem));
      copyItem.name = 'ALL TRACKS';
      copyItem.id = 'ALL TRACKS';
      data.items.push(copyItem);
      caller.setState({playlists: data});
    })
  .catch(error => {
    caller.setState({playlists: null});
    console.error(`getPlaylists FAIL ${error}`);
  })
  .finally(() => {
    caller.setState({loading: false});
  });
// {"status":401,"message":"Invalid access token"}},"status":401,"statusText":"Unauthorized"}
}

export function getTokens(caller, code, redirectUri) {
  caller.setState({loading: true});
  fetch('/get_tokens', {
    method:  'POST',
    headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
    body:    JSON.stringify({code: code, redirect_uri: redirectUri}),
  })
  .then(statusCheck)
  .then(response => response.json())
  .then(tokens => {
    caller.setState({
      accessToken:  tokens.access_token,
      refreshToken: tokens.refresh_token,
      expiresIn:    tokens.expires_in
    });
  })
  .catch(error => {
    caller.setState({
      accessToken:  null,
      refreshToken: null,
      expiresIn:    null
    });
    console.error(`getTokens FAIL ${error}`);
  })
  .finally(() => {
    caller.setState({loading: false});
  });
}

export function getTracklist(href, index, caller, token) {
  fetch(href, {
    method:  'GET',
    headers: {'Authorization': `Bearer ${token}`}
  })
  .then(statusCheck)
  .then(response => response.json())
  .then(data => {
      if (caller.state.activeIndex === index) {  // are we still servicing this request?
        if (data.offset === 0) {  // is first result.
          caller.setState({activeTrackList: data});
        } else {
          let atl = caller.state.activeTrackList;
          atl.items = atl.items.concat(data.items);
          caller.setState({activeTrackList: atl});
        }
        // initiate next fetch, if available.
        if (data.next !== null) {
          getTracklist(data.next, index, caller, token);
        } else {
          caller.setState({loading: false});
        }
      }
    })
  .catch(error => {
    caller.setState({activeTrackList: {items:[]}});
    console.error(`getTracklist FAIL ${error}`);
    caller.setState({loading: false});
  })
  // .finally(() => {
  //   caller.setState({loading: false});
  // })
// {"status":401,"message":"Invalid access token"}},"status":401,"statusText":"Unauthorized"}
}

// make specific, because columnName could be same, but table could be different. OR maybe store data in table instead of state.
// clean this up a bit.
export function sortTrackList(data) {
  data.items = data.items.sort(function (item1, item2) {
    item1 = _.get(item1, data.sortColumnName);
    item2 = _.get(item2, data.sortColumnName);

// yuck
if (data.sortColumnName === 'track.preview_url' ) {  // do a boolean sort of null vs not null.
  if (data.sortDirection === 'a') {
    if (!item1) {
      if (!item2) {
        return 0;
      } else {
        return -1;
      }
    } else {
      if (!item2) {
        return 1;
      } else {
        return 0;
      }
    }
  } else {
    if (!item2) {
      if (!item1) {
        return 0;
      } else {
        return -1;
      }
    } else {
      if (!item1) {
        return 1;
      } else {
        return 0;
      }
    }
  }
}

    if (typeof item1 === 'string') {
      if (data.sortDirection === 'a') {
        return item1.localeCompare(item2, 'en', { sensitivity: 'base', numeric: true, ignorePunctuation: true });
      } else {
        return item2.localeCompare(item1, 'en', { sensitivity: 'base', numeric: true, ignorePunctuation: true });
      }
    } else {
      if (data.sortDirection === 'a') {
        if (item1 < item2) {return -1;}
        if (item1 > item2) {return 1;}
        return 0;
      } else {
        if (item1 < item2) {return 1;}
        if (item1 > item2) {return -1;}
        return 0;
      }
    }
  });
  return;
}

// Check a fetch response status.
export function statusCheck(response) {
  if (response.status < 200 || response.status >= 300) {
    const error = new Error(`HTTP Error ${response.statusText}`);
    error.status = response.status;
    error.response = response;
    // console.error(error);
    throw error;
  }
  return response;
}
