import React, {Component} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import {Button, Grid, Image, Table} from 'semantic-ui-react';
import CredentialsPage from './containers/CredentialsPage';
import PlaylistsPage   from './containers/PlaylistsPage';

export const authEndpoint = 'https://accounts.spotify.com/authorize';
// Replace with your app's client ID, redirect URI and desired scopes
const clientId = 'f5946a8d80f7403dac7255815b38442f';
// const redirectUri = "http://localhost:3000";
// const redirectUri = "http://173.3.128.23:3000";
const redirectUri = "https://spotty-app.herokuapp.com:3000";
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
      accessToken: null,
      loading:     false,
    };
  }

  componentDidMount() {
    // Set token
    let _token = hash.access_token;
    if (_token) {
      this.setState({
        accessToken: _token
      });
    }
  }

  pageBody() {
    return (
      <Grid.Column width={12}>
        {this.state.accessToken && (
          <Grid.Column>
            <PlaylistsPage accessToken={this.state.accessToken}/>
          </Grid.Column>
        )}
      </Grid.Column>
    );
  }

  pageFooter() {
    return (
      <Grid.Column>
        {this.pageFooterRow()}
      </Grid.Column>
    );
  }

  pageFooterRow() {
    return (
      <Table compact striped style={{marginTop:0}}>
        <Table.Header>
          <Table.Row textAlign='center'>
            <Table.HeaderCell>
              <span style={{color:'grey', textAlign:'center'}}>
                            &bull; Index data provided by <a href='https://www.alphavantage.co' target='_blank' rel='noopener noreferrer'>Alpha Vantage</a>
                &emsp;&emsp;&bull; Market data provided by <a href='https://iextrading.com' target='_blank' rel='noopener noreferrer'>IEX</a>
                &emsp;&emsp;&bull; Headline news powered by <a href='https://newsapi.org' target='_blank' rel='noopener noreferrer'>NewsAPI.org</a>
                &emsp;&emsp;&bull; The prices shown may not be the correct prices or the latest prices.
              </span>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
      </Table>
    );
    // &emsp;&emsp;&bull; See the <HelpPage trigger={<Button content='Help->Usage Notes' className='link' inverted size='medium'/>}/> page for more information.
  }

  pageHeader() {
    return (
      <Grid.Column stretched>
        <Image src='/images/logo.jpg'/>
      </Grid.Column>
    );
  }

  pageMenu() {
    return (
      <Grid.Column width={4} stretched>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            {!this.state.accessToken && (
              <a
                className="btn btn--loginApp-link"
                href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`}
              >
                Login to Spotify
              </a>
            )}
            {this.state.accessToken && (
              <span>
                <CredentialsPage accessToken={this.state.accessToken} trigger={<Button content='Credentials' title='Display Spotify connection data' className='link' inverted size='medium' loading={this.state.loading}/>}/>
                <p></p>
                <CredentialsPage accessToken={this.state.accessToken} trigger={<Button content='Duplicates' title='Check for duplicate tracks across playlists' className='link' inverted size='medium' loading={this.state.loading}/>}/>
              </span>
            )}
          </header>
        </div>
      </Grid.Column>
    );
  }

  render() {
    return (
      <Router>
        <Grid padded stackable>
          <Grid.Row columns={1}>
            {this.pageHeader()}
          </Grid.Row>
          <Grid.Row columns={16}>
            {this.pageMenu()}
            {this.pageBody()}
          </Grid.Row>
        </Grid>
      </Router>
    );
  }
}

// {this.pageFooter()}

export default App;
