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
  // dedup this with call to getTracklist?
  fetch('https://api.spotify.com/v1/me/tracks', {
    method:  'GET',
    headers: {'Authorization': `Bearer ${token}`}
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

export function getAllMyTracks(playlistsItems, name, index, caller, token) {
// move to PLaylists Page
  caller.setState({responseTarget: playlistsItems.length - 1});
  // Load users playlists' tracks.
  for (let i = 0; i < (playlistsItems.length - 2); ++i) {
    const playlist = playlistsItems[i];
    getTracklist(playlist.tracks.href, playlist.name, index, caller, token, true);
  }
  getTracklist('https://api.spotify.com/v1/me/tracks', 'LIKED', index, caller, token, true);
}

export function getTracklist(href, name, index, caller, token, sort=false) {
  fetch(href, {
    method:  'GET',
    headers: {'Authorization': `Bearer ${token}`}
  })
  .then(statusCheck)
  .then(response => response.json())
  .then(data => {
      if (caller.state.activeIndex === index) {  // are we still servicing this request?

// don't need listCombine as a state var.
        let atl = caller.state.listCombine;

        for (let j = 0; j < data.items.length; ++j) {
// only need to set this for ALL TRACKS
          data.items[j].playlistName = name; // add playlist name as property to each item.
          atl.items.push(data.items[j]);
        }
        caller.setState({listCombine: atl});

        if (data.next !== null) {
          getTracklist(data.next, name, index, caller, token, sort);
        } else {
          const responseTarget = caller.state.responseTarget - 1;
          caller.setState({responseTarget: responseTarget});

          if (responseTarget === 0) {
// unhide dup col for single playlists
            flagDuplicates(atl);
            if (sort) {
              sortTrackList(atl, 'track.name');
            }
            caller.setState({activeTrackList: atl, loading: false});
          }
        }
      }
    })
  .catch(error => {
// we zero out atl here, but what about other successfull calls?
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
export function sortTrackList(data, sortColumnName) {
  let sortDirection = 'a';

  if ((data.sortColumnName === sortColumnName) && (data.sortDirection === 'a')) {
    sortDirection = 'd';
  }

  data.sortColumnName = sortColumnName;
  data.sortDirection  = sortDirection;

  data.items = data.items.sort(function (item1, item2) {
    const columnData1 = _.get(item1, sortColumnName);
    const columnData2 = _.get(item2, sortColumnName);

// yuck
if (sortColumnName === 'track.preview_url' ) {  // do a boolean sort of null vs not null.
  if (sortDirection === 'a') {
    if (!columnData1) {
      if (!columnData2) {
        return 0;
      } else {
        return -1;
      }
    } else {
      if (!columnData2) {
        return 1;
      } else {
        return 0;
      }
    }
  } else {
    if (!columnData2) {
      if (!columnData1) {
        return 0;
      } else {
        return -1;
      }
    } else {
      if (!columnData1) {
        return 1;
      } else {
        return 0;
      }
    }
  }
}

    if (typeof columnData1 === 'string') {
      if (sortDirection === 'a') {
        return columnData1.localeCompare(columnData2, 'en', { sensitivity: 'base', numeric: true, ignorePunctuation: true });
      } else {
        return columnData2.localeCompare(columnData1, 'en', { sensitivity: 'base', numeric: true, ignorePunctuation: true });
      }
    } else {
      if (sortDirection === 'a') {
        if (columnData1 < columnData2) {return -1;}
        if (columnData1 > columnData2) {return 1;}
        return 0;
      } else {
        if (columnData1 < columnData2) {return 1;}
        if (columnData1 > columnData2) {return -1;}
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
