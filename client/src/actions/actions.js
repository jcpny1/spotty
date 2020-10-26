import _ from 'lodash';

// Mark tracklist duplicates.
export function flagDuplicates(atl) {
  // Look for duplicates
  var counts = _.groupBy(atl.items, function(e) {return e.track.id})
  // Apply duplicate flag to duplicate items.
  for (const p in counts) {
    if (counts[p].length > 1) {
      _.forEach(counts[p], function(value) { value.duplicate = true; });
    }
  }
  atl.items = _.flatMapDepth(counts, null, 2);
}

export function getAllTracks(playlistsItems, caller, token) {
  caller.setState({loading: true, responseCount: 0, listCombine: {items:[]}});

  // Load saved playlists
  for (var i = 0; i < (playlistsItems.length - 2); i++) {
    fetch(playlistsItems[i].tracks.href, {
      method:  'GET',
      headers: {'Authorization': 'Bearer ' + token}
    })
    .then(statusCheck)
    .then(response => response.json())
    .then(data => {
      caller.setState({responseCount: caller.state.responseCount + 1});
      if (caller.state.activeIndex === (playlistsItems.length - 1)) {  // are we still servicing this request?
        var atl = caller.state.listCombine;

        // convert playlist id to playlist name.
        const playlistId = data.href.split('/')[5];  // get playlist id
        const playlist = playlistsItems.find(o => o.id === playlistId);  // find playlist object

        for (var j = 0; j < data.items.length; j++) {
          data.items[j].playlistName = playlist.name; // add playlist name as property to each item.
          atl.items.push(data.items[j]);
        }

        if (caller.state.responseCount < (playlistsItems.length - 1)) {
          caller.setState({listCombine: atl});
        } else {
          atl.sortColumnName = 'track.name';
          atl.sortDirection = 'a';
          this.sortTrackList(atl);
          this.flagDuplicates(atl);
          caller.setState({activeTrackList: atl, loading: false});
        }
      }
    })
    .catch(error => {
      caller.setState({activeTrackList: null});
      console.error("getAllTracks Playlist FAIL " + error);
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
    headers: {'Authorization': 'Bearer ' + token}
  })
  .then(statusCheck)
  .then(response => response.json())
  .then(data => {
    caller.setState({responseCount: caller.state.responseCount + 1});

    if (caller.state.activeIndex === (playlistsItems.length - 1)) {  // are we still servicing this request?
      var atl = caller.state.listCombine;

      for (var j = 0; j < data.items.length; j++) {
        data.items[j].playlistName = 'LIKED'; // add playlist name as property to each item.
        atl.items.push(data.items[j]);
      }

      if (caller.state.responseCount < (playlistsItems.length - 1)) {
        caller.setState({listCombine: atl});
      } else {
        atl.sortColumnName = 'track.name';
        atl.sortDirection = 'a';
        this.sortTrackList(atl);
        this.flagDuplicates(atl);
        caller.setState({activeTrackList: atl});
      }
    }
  })
  .catch(error => {
    caller.setState({activeTrackList: null});
    console.error("getAllTracks LIKED FAIL " + error);
  });
  // .finally(() => {
  //   caller.setState({loading: false});
  // });
  // {"status":401,"message":"Invalid access token"}},"status":401,"statusText":"Unauthorized"}
}

export function getCredentials(caller, token) {
  caller.setState({loading: true});
  fetch('https://api.spotify.com/v1/me', {
    method:  'GET',
    headers: {'Authorization': 'Bearer ' + token}
  })
  .then(statusCheck)
  .then(response => response.json())
  .then(data => {
      caller.setState({data: data});
    })
  .catch(error => {
    caller.setState({data: null});
    console.error("getCredentials FAIL " + error);
  })
  .finally(() => {
    caller.setState({loading: false});
  })
// {"status":401,"message":"Invalid access token"}},"status":401,"statusText":"Unauthorized"}
}

export function getLikedTracklist(listLength, caller, token) {
  caller.setState({loading: true});
  fetch('https://api.spotify.com/v1/me/tracks', {
    method:  'GET',
    headers: {'Authorization': 'Bearer ' + token}
  })
  .then(statusCheck)
  .then(response => response.json())
  .then(data => {
      if (caller.state.activeIndex === (listLength - 2)) {  // are we still servicing this request?
        caller.setState({activeTrackList: data});
      }
    })
  .catch(error => {
    caller.setState({activeTrackList: null});
    console.error("getLikedTracklist FAIL " + error);
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
    headers: {'Authorization': 'Bearer ' + token}
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
      var copyItem = JSON.parse(JSON.stringify(data.items[0]));
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
    console.error("getPlaylists FAIL " + error);
  })
  .finally(() => {
    caller.setState({loading: false});
  })
// {"status":401,"message":"Invalid access token"}},"status":401,"statusText":"Unauthorized"}
}

export function getTracklist(playlist, index, caller, token) {
  caller.setState({loading: true});
  fetch(playlist.tracks.href, {
    method:  'GET',
    headers: {'Authorization': 'Bearer ' + token}
  })
  .then(statusCheck)
  .then(response => response.json())
  .then(data => {
      caller.setState({data: data});
      if (caller.state.activeIndex === index) {  // are we still servicing this request?
        caller.setState({activeTrackList: data});
      }
    })
  .catch(error => {
    caller.setState({activeTrackList: null});
    console.error("getTracklist FAIL " + error);
  })
  .finally(() => {
    caller.setState({loading: false});
  })
// {"status":401,"message":"Invalid access token"}},"status":401,"statusText":"Unauthorized"}
}

// make specific, because columnName could be same, but table could be different. OR maybe store data in table instead of state.
// clean this up a bit.
export function sortTrackList(data) {
  data.items = data.items.sort(function (item1, item2) {
    item1 = _.get(item1, data.sortColumnName);
    item2 = _.get(item2, data.sortColumnName);

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
  return data;
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
