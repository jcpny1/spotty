import React, {Component} from 'react';

export const authEndpoint = 'https://accounts.spotify.com/authorize';

const clientId = 'f5946a8d80f7403dac7255815b38442f';
const redirectUri = process.env.NODE_ENV === 'production' ? 'https://spotty-app.herokuapp.com' : 'http://localhost:3000';
const scopes = [
  'user-library-read',
  'user-read-private',
];

export default class LoginPage extends Component {
  render() {
    return (
      <a
        className="btn btn--loginApp-link"
        href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`}
      >
        Login to Spotify
      </a>
    );
  }
}
