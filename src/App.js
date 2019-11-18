import React, {Component} from 'react';
import * as $ from "jquery";
import logo from './logo.svg';
import './App.css';

import {Button, Dropdown, Grid, Header, Image, Menu, Table} from 'semantic-ui-react';
import CredentialsPage from './containers/CredentialsPage';

export const authEndpoint = 'https://accounts.spotify.com/authorize';
// Replace with your app's client ID, redirect URI and desired scopes
const clientId = '';
const redirectUri = "http://localhost:3000";
// const scopes = [
//   "user-read-currently-playing",
//   "user-read-playback-state",
// ];
const scopes = [
  'user-read-private',
  'user-read-email',
];

// Get the hash of the url
const hash = window.location.hash
  .substring(1)
  .split("&")
  .reduce(function(initial, item) {
    if (item) {
      var parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
    }
    return initial;
  }, {});

window.location.hash = "";

class App extends Component {
  constructor() {
    super();
    this.state = {
      access_token: null,
    };
  }

  componentDidMount() {
    // Set token
    let _token = hash.access_token;
    if (_token) {
      this.setState({
        access_token: _token
      });
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {!this.state.access_token && (
          <a
            className="btn btn--loginApp-link"
            href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`}
          >
            Login to Spotify
          </a>
        )}
        {this.state.access_token && (
          <span>
          <CredentialsPage access_token={this.state.access_token} trigger={<Button content='Credentials' className='link' inverted size='medium'/>}/>
          <CredentialsPage access_token={this.state.access_token} trigger={<Button content='Playlists'   className='link' inverted size='medium'/>}/>
          </span>
        )}
        </header>
      </div>
    );
  }
}

export default App;
