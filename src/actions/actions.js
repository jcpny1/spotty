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
      caller.setState({data: data, loading: false});
    }
  });
}
