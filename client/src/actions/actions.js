import _ from 'lodash';

// Mark tracklist duplicates.
function flagDuplicates(tracklist) {
  // Group tracks by track id.
  let groupedItems = _.groupBy(tracklist.items, function(item) { return item.track.id })
  // Look for duplicates and apply duplicate flag to duplicate items.
  for (const trackId in groupedItems) {
    if (trackId !== 'null' && groupedItems[trackId].length > 1) {
      _.forEach(groupedItems[trackId], function(item) { item.duplicate = true });
    }
  }
}

export function getAllTracks(caller, playlistsItems, name, listCombine, requestCount) {
  // Load users playlists' tracks.
  for (let i = 0; i < (playlistsItems.length - 2); ++i) {
    const playlist = playlistsItems[i];
    getTracklist(caller, playlist.tracks.href, playlist.name, listCombine, requestCount, true);
  }
  getTracklist(caller, 'https://api.spotify.com/v1/me/tracks?limit=50', 'LIKED', listCombine, requestCount, true);  // Add liked list, which does't show up in user's playlists.
}

export function getCredentials(caller) {
  fetch('https://api.spotify.com/v1/me', {
    method:  'GET',
    headers: { 'Authorization': `Bearer ${caller.props.accessToken}` }
  })
  .then(statusCheck)
  .then(response => response.json())
  .then(data => {
      caller.setState({data: data});
    })
  .catch(error => {
    console.error(`getCredentials FAIL ${error}`);
    alert(error.message);
    caller.setState({ data: null, fetchError: error });
  });
}

export function getPlaylists(caller) {
  fetch('https://api.spotify.com/v1/me/playlists', {
    method:  'GET',
    headers: { 'Authorization': `Bearer ${caller.props.accessToken}` }
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
      data.items.forEach(playlistItem => playlistItem.tracks.items = null);
      caller.setState({ playlists: data });
    })
  .catch(error => {
    console.error(`getPlaylists FAIL ${error}`);
    alert(error.message);
    caller.setState({ playlists: null, fetchError: error });
  });
}

export function getTokens(caller, code, redirectUri) {
  fetch('/get_tokens', {
    method:  'POST',
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
    body:    JSON.stringify({code: code, redirect_uri: redirectUri}),
  })
  .then(statusCheck)
  .then(response => {
    // for some reason, if we refresh after a code has been obtained, we get back html, not tokens.
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      return response.json();
    }
  })
  .then(tokens => {
    tokens && caller.setState({ accessToken: tokens.access_token, refreshToken: tokens.refresh_token, expiresIn: tokens.expires_in });
  })
  .catch(error => {
    console.error(`getTokens FAIL ${error}`);
    alert(error.message);
    caller.setState({ accessToken: null, refreshToken: null, expiresIn: null, fetchError: error });
  });
}

export function getTracklist(caller, href, name, listCombine, requestCount, sort=false) {
  caller.setState({ loading: true });
  fetch(href, {
    method:  'GET',
    headers: { 'Authorization': `Bearer ${caller.props.accessToken}` }
  })
  .then(statusCheck)
  .then(response => response.json())
  .then(data => {
    if (data.error) {
      let tracks = caller.state.playlists.items[caller.state.loadIndex].tracks;
      if (tracks.items && tracks.items.length === 0) {
        tracks.items = null;
      }
      console.error(`getTracklist FAIL ${data.error.message}`);
      if (caller.state.fetchError === null) {
        alert(`Operation failed: ${data.error.message}`);
        caller.setState({ playlists: caller.state.playlists, fetchError: data.error, loading: false });
      }
    } else if (caller.state.loadIndex === caller.state.activeIndex) {  // are we still servicing this request?
      for (let j = 0; j < data.items.length; ++j) {
        data.items[j].playlistName = name; // add playlist name as property to each item.
        listCombine.items.push(data.items[j]);
      }

      if (data.next !== null) {
        getTracklist(caller, data.next, name, listCombine, requestCount, sort);
      } else {
        requestCount.count = requestCount.count - 1;
        if (requestCount.count === 0) {
          flagDuplicates(listCombine);

          sort && sortTrackList(listCombine, 'track.name');

          let tracks = caller.state.playlists.items[caller.state.loadIndex].tracks;
          tracks.items = listCombine.items;
          tracks.sortColumnName = listCombine.sortColumnName;
          tracks.sortDirection  = listCombine.sortDirection;
          caller.setState({ playlists: caller.state.playlists, loading: false });
        }
      }
    }
  })
  .catch(error => {
// we zero out atl here, but what about other successfull calls?
    let tracks = caller.state.playlists.items[caller.state.loadIndex].tracks;
    if (tracks.items && tracks.items.length === 0) {
      tracks.items = null;
    }
    console.error(`getTracklist FAIL ${error}`);
    if (caller.state.fetchError === null) {
      alert(error.message);
      caller.setState({ playlists: caller.state.playlists, fetchError: error, loading: false });
    }
  })
}

export function msToHMS(ms) {
  const seconds = Math.floor((ms/1000) % 60);
  const minutes = Math.floor((ms/(1000*60)) % 60);
  const hours   = Math.floor((ms/(1000*60*60)) % 24);
  return `${hours.toLocaleString('en-US', {minimumIntegerDigits:2})}:${minutes.toLocaleString('en-US', {minimumIntegerDigits:2})}:${seconds.toLocaleString('en-US', {minimumIntegerDigits:2})}`;
}

export function sortTrackList(data, sortColumnName) {
  let sortDirection = 'a';
  if ((data.sortColumnName === sortColumnName) && (data.sortDirection === 'a')) {
    sortDirection = 'd';
  }

  data.sortColumnName = sortColumnName;
  data.sortDirection  = sortDirection;

  const columnData1 = _.get(data.items[0], data.sortColumnName);

  if (typeof columnData1 === 'string') {
    return sortTrackListString(data);
  } else if (sortColumnName === 'track.preview_url') {
    return sortTrackListNull(data);
  } else {
    return sortTrackListNumber(data);
  }
}

// make specific, because columnName could be same, but table could be different. OR maybe store data in table instead of state.
// clean this up a bit.
function sortTrackListNull(data, sortColumnName) {
  data.items = data.items.sort(function (item1, item2) {
    const columnData1 = _.get(item1, data.sortColumnName);
    const columnData2 = _.get(item2, data.sortColumnName);

    if (data.sortDirection === 'a') {
      if (!columnData1) {
        return !columnData2 ? 0 : -1;
      } else {
        return columnData2 ? 1 : 0;
      }
    } else {
      if (!columnData2) {
        return !columnData1 ? 0 : -1;
      } else {
        return !columnData1 ? 1 : 0;
      }
    }
  });

  return;
}

// make specific, because columnName could be same, but table could be different. OR maybe store data in table instead of state.
// clean this up a bit.
function sortTrackListNumber(data, sortColumnName) {
  data.items = data.items.sort(function (item1, item2) {
    const columnData1 = _.get(item1, data.sortColumnName);
    const columnData2 = _.get(item2, data.sortColumnName);

    if (data.sortDirection === 'a') {
      if (columnData1 < columnData2) {return -1;}
      if (columnData1 > columnData2) {return  1;}
      return 0;
    } else {
      if (columnData1 < columnData2) {return  1;}
      if (columnData1 > columnData2) {return -1;}
      return 0;
    }
  });

  return;
}

// make specific, because columnName could be same, but table could be different. OR maybe store data in table instead of state.
// clean this up a bit.
function sortTrackListString(data) {
  data.items = data.items.sort(function (item1, item2) {
    const columnData1 = _.get(item1, data.sortColumnName);
    const columnData2 = _.get(item2, data.sortColumnName);

    if (data.sortDirection === 'a') {
      return columnData1.localeCompare(columnData2, 'en', { sensitivity: 'base', numeric: true, ignorePunctuation: true });
    } else {
      return columnData2.localeCompare(columnData1, 'en', { sensitivity: 'base', numeric: true, ignorePunctuation: true });
    }
  });

  return;
}

// Check a fetch response status.
function statusCheck(response) {
  if (response.status === 401) {
    return response;
  }

  if (response.status < 200 || response.status >= 300) {
    const error = new Error(`HTTP Error ${response.statusText}`);
    error.status = response.status;
    error.response = response;
    console.error(error);
    throw error;
  }

  return response;
}
