import * as utils from './utils';

export function getAllTracks(caller, accessToken, state, playlistsItems, name, index, listCombine, requestCount) {
  // Load users playlists' tracks.
  for (let i = 0; i < (playlistsItems.length - 2); ++i) {
    const playlist = playlistsItems[i];
    getTracklist(caller, accessToken, state, playlist.tracks.href, playlist.name, index, listCombine, requestCount, true);
  }
  getTracklist(caller, accessToken, state, 'https://api.spotify.com/v1/me/tracks?limit=50', 'LIKED', index, listCombine, requestCount, true);  // Add liked list, which does't show up in user's playlists.
}

export function getCredentials(caller, accessToken) {
  fetch('https://api.spotify.com/v1/me', {
    method:  'GET',
    headers: { 'Authorization': `Bearer ${accessToken}` }
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

export function getPlaylists(caller, accessToken) {
  fetch('https://api.spotify.com/v1/me/playlists', {
    method:  'GET',
    headers: { 'Authorization': `Bearer ${accessToken}` }
  })
  .then(statusCheck)
  .then(response => response.json())
  .then(data => {
    data.items = data.items.sort(function (item1, item2) {
      if (item1.name < item2.name) {return -1;}
      if (item1.name > item2.name) {return 1; }
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

export function getTracklist(caller, accessToken, state, href, name, index, listCombine, requestCount, sort=false) {
  fetch(href, {
    method:  'GET',
    headers: { 'Authorization': `Bearer ${accessToken}` }
  })
  .then(statusCheck)
  .then(response => response.json())
  .then(data => {
    if (data.error) {
      let tracks = state.playlists.items[index].tracks;
      if (tracks.items && tracks.items.length === 0) {
        tracks.items = null;
      }
      console.error(`getTracklist FAIL ${data.error.message}`);
      if (state.fetchError === null) {
        alert(`Operation failed: ${data.error.message}`);
        caller.setState({ playlists: state.playlists, fetchError: data.error, loading: false });
      }
    } else  {
      if (data.items) {
        for (let j = 0; j < data.items.length; ++j) {
          data.items[j].playlistName = name;   // add playlist name as property to each item.
          listCombine.items.push(data.items[j]);
        }
      }

      if (data.next !== null) {
        getTracklist(caller, accessToken, state, data.next, name, index, listCombine, requestCount, sort);
      } else {
        requestCount.count = requestCount.count - 1;
        if (requestCount.count === 0) {
          utils.flagDuplicates(listCombine);

          sort && utils.sortTrackList(listCombine, 'track.name');

          let tracks = state.playlists.items[index].tracks;
          tracks.items = listCombine.items;
          tracks.sortColumnName = listCombine.sortColumnName;
          tracks.sortDirection  = listCombine.sortDirection;
          caller.setState({ playlists: state.playlists, loading: false });
        }
      }
    }
  })
  .catch(error => {
// we zero out atl here, but what about other successfull calls?
    let tracks = state.playlists.items[index].tracks;
    if (tracks.items && tracks.items.length === 0) {
      tracks.items = null;
    }
    console.error(`getTracklist FAIL ${error}`);
    if (state.fetchError === null) {
      alert(error.message);
    }
    caller.setState({ playlists: state.playlists, fetchError: error, loading: false });
  })
}

export function refreshToken(caller, refresh_token) {
  fetch(`/refresh_token?refresh_token=${refresh_token}`, {
    method:  'GET',
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
  })
  .then(statusCheck)
  .then(response => response.json())
  .then(tokens => {
    tokens && caller.setState({ accessToken: tokens.access_token, tokenLoading: false });
    alert('Token refreshed');
  })
  .catch(error => {
    console.error(`refreshToken FAIL ${error}`);
    alert(error.message);
    caller.setState({ accessToken: null, fetchError: error, tokenLoading: false });
  });
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
