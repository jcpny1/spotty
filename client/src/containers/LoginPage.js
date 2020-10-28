import React, {Component} from 'react';
// import {Button} from 'semantic-ui-react';

const authEndpoint = 'https://accounts.spotify.com/authorize';
const clientId     = process.env.REACT_APP_CLIENT_ID;
const redirectUri  = process.env.NODE_ENV === 'production' ? 'https://spotty-app.herokuapp.com' : 'http://localhost:3000';
const scopes       = 'user-library-read user-read-email user-read-private';

export default class LoginPage extends Component {
  constructor() {
    super();
    this.state = {
      accessToken: null,
      loading:     false,
    };
  }

  render() {
    return (
      <a
        className='btn btn--loginApp-link'
        href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes}&response_type=code&show_dialog=false`}
      >
        Login
      </a>
    );
  }
}
