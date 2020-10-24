import React, { Component } from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {Button, Grid, Image, Table} from 'semantic-ui-react';
import CredentialsPage from './containers/CredentialsPage';
import LoginPage from './containers/LoginPage';
import PlaylistsPage   from './containers/PlaylistsPage';
import logo from './logo.svg';
import "semantic-ui-css/semantic.min.css";
import './App.css';

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
users:       []
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

fetch('/users')
  .then(res => res.json())
  .then(users => this.setState({ users }));
  }

  pageBody() {
    return (
      <Grid.Column width={12}>
        {!this.state.accessToken && (
          <Grid.Column>
            <h4>NOTE:</h4>
            <ul>
              <li style={{margin:'10px 0'}}><h5>This app will request permission to access your Spotify account profile, playlists, and saved tracks.</h5></li>
              <li style={{margin:'10px 0'}}><h5>This data is only being accessed for display to you.</h5></li>
              <li style={{margin:'10px 0'}}><h5>No information is being recorded, retained, or aggregated.</h5></li>
            </ul>
          </Grid.Column>
        )}
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

  // <div className="App">
  //   <h1>Users</h1>
  //   {this.state.users.map(user =>
  //     <div key={user.id}>{user.username}</div>
  //   )}
  // </div>
  pageHeader() {
    return (
      <Grid.Column stretched>
        <Image src='/images/logo.jpg'/>
      </Grid.Column>
    );
  }

  pageMenu() {
    return (
      <Grid.Column width={4}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            {!this.state.accessToken && (
              <span>
                <LoginPage/>
              </span>
            )}
            {this.state.accessToken && (
              <CredentialsPage accessToken={this.state.accessToken} trigger={<Button content='Credentials' title='Display Spotify connection data' className='link' inverted size='medium' loading={this.state.loading}/>}/>
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
          <Grid.Row>
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
