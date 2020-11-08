import React, { Component } from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {Button, Grid, Image} from 'semantic-ui-react';
import CredentialsPage from './containers/CredentialsPage';
import PlaylistsPage   from './containers/PlaylistsPage';
import * as actions from './actions/actions';
import logo from './logo.svg';
import 'semantic-ui-css/semantic.min.css';
import './App.css';

const authEndpoint = 'https://accounts.spotify.com/authorize';
const clientId     = process.env.REACT_APP_CLIENT_ID;
const redirectUri  = process.env.NODE_ENV === 'production' ? 'https://spotty-app.herokuapp.com' : 'http://localhost:3000';
const scopes       = 'user-library-read user-read-email user-read-private';

class App extends Component {
  constructor() {
    super();
    this.state = {
      accessToken:  null,
      expiresIn:    null,
      refreshToken: null,
      fetchError:   null,
      tokenLoading: false,
    };
  }

  componentDidMount() {
    const queryString = window.location.search;
    const urlParams   = new URLSearchParams(queryString);
    const code        = urlParams.get('code');
    code && actions.getTokens(this, code, redirectUri);
  }

  pageBody() {
    const {accessToken} = this.state;
    if (!accessToken) {
      return (
        <Grid.Row>
          <h4>NOTE:</h4>
          <ul>
            <li style={{margin:'10px 0'}}><h5>This app will request permission to access your Spotify account profile, playlists, and saved tracks.</h5></li>
            <li style={{margin:'10px 0'}}><h5>This data is only being accessed for display to you.</h5></li>
            <li style={{margin:'10px 0'}}><h5>No information is being recorded, retained, or aggregated.</h5></li>
          </ul>
        </Grid.Row>
      );
    } else {
      return (
        <Grid.Row>
          <PlaylistsPage accessToken={accessToken}/>
        </Grid.Row>
      );
    }
  }

  pageMenu() {
    const {accessToken, refreshToken, tokenLoading} = this.state;
    return (
      <>
        <Grid.Row>
          <Image src={logo} className='App-logo' alt='logo' />
        </Grid.Row>

        <Grid.Row>
          {!accessToken && <Button as='a' href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes}&response_type=code&show_dialog=true`} content='Login' title='Connect to Spotify' inverted size='medium' />}
        </Grid.Row>

        <Grid.Row>
          {accessToken && <CredentialsPage accessToken={accessToken} trigger={<Button style={{marginBottom:'15px'}} content='Credentials'  title='Display Spotify connection data' inverted size='medium' />} />}
          {accessToken && <Button refreshtoken={refreshToken} caller={this} content='New Token' title='Get a new Spotify access token' inverted size='medium' onClick={this.refreshSpotifyToken} loading={tokenLoading} />}
        </Grid.Row>
      </>
    );
  }

  refreshSpotifyToken(event, data) {
    data.caller.setState({ tokenLoading: true });
    actions.refreshToken(data.caller, data.refreshtoken);
  }

  render() {
    return (
      <Router>
        <Grid padded stackable>
          <Grid.Row columns={1}>
            <Grid.Column stretched>
              <Image src='/images/logo.jpg'/>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column className='App App-header' width={2}>
              {this.pageMenu()}
            </Grid.Column>
            <Grid.Column width={14}>
              {this.pageBody()}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Router>
    );
  }
}

export default App;
