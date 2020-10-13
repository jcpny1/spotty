import * as $ from "jquery";

export function getPlaylists(caller, token) {
  caller.setState({loading: true});
  $.ajax({
    url: 'https://api.spotify.com/v1/me/playlists',
    type: "GET",
    beforeSend: (xhr) => {
      xhr.setRequestHeader("Authorization", "Bearer " + token);
    },
    success: (data) => {
      data.items = data.items.sort(function (item1, item2) {
          if (item1.name < item2.name) {
            return -1;
          }
          if (item1.name > item2.name) {
            return 1;
          }
          return 0;
      });
var copyItem = JSON.parse(JSON.stringify(data.items[0]));
copyItem.name = 'ALL TRACKS';
data.items.push(copyItem);
      caller.setState({data: data, loading: false});
    }
  });
}

/* Fetch all tracks from all playlists. */
export function fetchAllTracks() {
  const playlists=this.state.data.items;
  var allTracks = [];
  for (var index = 0; index < playlists.length; index++) {
    $.ajax({
      url: playlists[index].tracks.href,
      type: "GET",
      beforeSend: (xhr) => {
        xhr.setRequestHeader("Authorization", "Bearer " + this.props.accessToken);
      },
      success: (data) => {
        for (var index = 0; index < data.items.length; index++) {
          allTracks.push(data.items[index]);
        }
        this.setState({activeTrackList: allTracks, activeIndex: -1, sortDirection: ''});
      }
    });
  };
}
