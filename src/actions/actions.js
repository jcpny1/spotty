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
      caller.setState({data: data, loading: false});
    }
  });
}
