import * as $ from "jquery";

export function getPlaylists(source, token) {
  $.ajax({
    url: 'https://api.spotify.com/v1/me/playlists',
    type: "GET",
    beforeSend: (xhr) => {
      xhr.setRequestHeader("Authorization", "Bearer " + token);
    },
    success: (data) => {
      source.setState({data: data});
    }
  });
}
