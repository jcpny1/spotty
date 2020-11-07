import React           from 'react';
import ReactDOM        from 'react-dom';
import {Button, Header, Icon, Modal} from 'semantic-ui-react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Enzyme          from 'enzyme';
import { shallow, mount, render } from 'enzyme';
import Adapter         from 'enzyme-adapter-react-16';

import TrackDetailsPage from '../../src/containers/TrackDetailsPage';

Enzyme.configure({ adapter: new Adapter() });


it('renders the TrackDetails Page', () => {
  const renderer = new ShallowRenderer();
  const item = {
    "added_at": "2019-11-26T17:45:31Z",
    "added_by": {
      "external_urls": {
        "spotify": "https://open.spotify.com/user/22ktibc2flnvkjz3nhv2dlhji"
      },
      "href": "https://api.spotify.com/v1/users/22ktibc2flnvkjz3nhv2dlhji",
      "id": "22ktibc2flnvkjz3nhv2dlhji",
      "type": "user",
      "uri": "spotify:user:22ktibc2flnvkjz3nhv2dlhji"
    },
    "is_local": false,
    "primary_color": null,
    "track": {
      "album": {
        "album_type": "single",
        "artists": [
          {
            "external_urls": {
              "spotify": "https://open.spotify.com/artist/4mHAu7NX2UNsnGXjviBD9e"
            },
            "href": "https://api.spotify.com/v1/artists/4mHAu7NX2UNsnGXjviBD9e",
            "id": "4mHAu7NX2UNsnGXjviBD9e",
            "name": "Brooks",
            "type": "artist",
            "uri": "spotify:artist:4mHAu7NX2UNsnGXjviBD9e"
          },
          {
            "external_urls": {
              "spotify": "https://open.spotify.com/artist/2xgAJkalFHfceCNGETOkyM"
            },
            "href": "https://api.spotify.com/v1/artists/2xgAJkalFHfceCNGETOkyM",
            "id": "2xgAJkalFHfceCNGETOkyM",
            "name": "GRX",
            "type": "artist",
            "uri": "spotify:artist:2xgAJkalFHfceCNGETOkyM"
          }
        ],
        "available_markets": [
          "AD",
          "AE",
          "AL",
          "AR",
          "AT",
          "AU",
          "BA",
          "BE",
          "BG",
          "BH",
          "BO",
          "BR",
          "BY",
          "CA",
          "CH",
          "CL",
          "CO",
          "CR",
          "CY",
          "CZ",
          "DE",
          "DK",
          "DO",
          "DZ",
          "EC",
          "EE",
          "EG",
          "ES",
          "FI",
          "FR",
          "GB",
          "GR",
          "GT",
          "HK",
          "HN",
          "HR",
          "HU",
          "ID",
          "IE",
          "IL",
          "IN",
          "IS",
          "IT",
          "JO",
          "JP",
          "KW",
          "KZ",
          "LB",
          "LI",
          "LT",
          "LU",
          "LV",
          "MA",
          "MC",
          "MD",
          "ME",
          "MK",
          "MT",
          "MX",
          "MY",
          "NI",
          "NL",
          "NO",
          "NZ",
          "OM",
          "PA",
          "PE",
          "PH",
          "PL",
          "PS",
          "PT",
          "PY",
          "QA",
          "RO",
          "RS",
          "RU",
          "SA",
          "SE",
          "SG",
          "SI",
          "SK",
          "SV",
          "TH",
          "TN",
          "TR",
          "TW",
          "UA",
          "US",
          "UY",
          "VN",
          "XK",
          "ZA"
        ],
        "external_urls": {
          "spotify": "https://open.spotify.com/album/5DDLXhG7fa8crZcSNlsxuw"
        },
        "href": "https://api.spotify.com/v1/albums/5DDLXhG7fa8crZcSNlsxuw",
        "id": "5DDLXhG7fa8crZcSNlsxuw",
        "images": [
          {
            "height": 640,
            "url": "https://i.scdn.co/image/ab67616d0000b273077d7940376773bfc37f09d8",
            "width": 640
          },
          {
            "height": 300,
            "url": "https://i.scdn.co/image/ab67616d00001e02077d7940376773bfc37f09d8",
            "width": 300
          },
          {
            "height": 64,
            "url": "https://i.scdn.co/image/ab67616d00004851077d7940376773bfc37f09d8",
            "width": 64
          }
        ],
        "name": "Boomerang",
        "release_date": "2017-10-13",
        "release_date_precision": "day",
        "total_tracks": 1,
        "type": "album",
        "uri": "spotify:album:5DDLXhG7fa8crZcSNlsxuw"
      },
      "artists": [
        {
          "external_urls": {
            "spotify": "https://open.spotify.com/artist/4mHAu7NX2UNsnGXjviBD9e"
          },
          "href": "https://api.spotify.com/v1/artists/4mHAu7NX2UNsnGXjviBD9e",
          "id": "4mHAu7NX2UNsnGXjviBD9e",
          "name": "Brooks",
          "type": "artist",
          "uri": "spotify:artist:4mHAu7NX2UNsnGXjviBD9e"
        },
        {
          "external_urls": {
            "spotify": "https://open.spotify.com/artist/2xgAJkalFHfceCNGETOkyM"
          },
          "href": "https://api.spotify.com/v1/artists/2xgAJkalFHfceCNGETOkyM",
          "id": "2xgAJkalFHfceCNGETOkyM",
          "name": "GRX",
          "type": "artist",
          "uri": "spotify:artist:2xgAJkalFHfceCNGETOkyM"
        }
      ],
      "available_markets": [
        "AD",
        "AE",
        "AL",
        "AR",
        "AT",
        "AU",
        "BA",
        "BE",
        "BG",
        "BH",
        "BO",
        "BR",
        "BY",
        "CA",
        "CH",
        "CL",
        "CO",
        "CR",
        "CY",
        "CZ",
        "DE",
        "DK",
        "DO",
        "DZ",
        "EC",
        "EE",
        "EG",
        "ES",
        "FI",
        "FR",
        "GB",
        "GR",
        "GT",
        "HK",
        "HN",
        "HR",
        "HU",
        "ID",
        "IE",
        "IL",
        "IN",
        "IS",
        "IT",
        "JO",
        "JP",
        "KW",
        "KZ",
        "LB",
        "LI",
        "LT",
        "LU",
        "LV",
        "MA",
        "MC",
        "MD",
        "ME",
        "MK",
        "MT",
        "MX",
        "MY",
        "NI",
        "NL",
        "NO",
        "NZ",
        "OM",
        "PA",
        "PE",
        "PH",
        "PL",
        "PS",
        "PT",
        "PY",
        "QA",
        "RO",
        "RS",
        "RU",
        "SA",
        "SE",
        "SG",
        "SI",
        "SK",
        "SV",
        "TH",
        "TN",
        "TR",
        "TW",
        "UA",
        "US",
        "UY",
        "VN",
        "XK",
        "ZA"
      ],
      "disc_number": 1,
      "duration_ms": 195000,
      "episode": false,
      "explicit": false,
      "external_ids": {
        "isrc": "NLM5S1600118"
      },
      "external_urls": {
        "spotify": "https://open.spotify.com/track/6Gw2dHX6FsQcIuiWxe0vWk"
      },
      "href": "https://api.spotify.com/v1/tracks/6Gw2dHX6FsQcIuiWxe0vWk",
      "id": "6Gw2dHX6FsQcIuiWxe0vWk",
      "is_local": false,
      "name": "Boomerang",
      "popularity": 55,
      "preview_url": "https://p.scdn.co/mp3-preview/71b52f84e7066fc202ac249633146fc7e02e9a86?cid=e9909de30f3342a79a418dd576811ab4",
      "track": true,
      "track_number": 1,
      "type": "track",
      "uri": "spotify:track:6Gw2dHX6FsQcIuiWxe0vWk"
    },
    "video_thumbnail": {
      "url": null
    },
    "playlistName": "SpottyTest"
  };

  renderer.render (
    <TrackDetailsPage track={item.track} trigger={<Button content={item.track.name} title='Show track details' className='link' style={{background:'none', textAlign:'left'}} size='medium'/>}/>
  );
});

// it('renders PortfolioEditPage', () => {
//   const store = createStore(rootReducer, compose(applyMiddleware(thunk), window.devToolsExtension ? window.devToolsExtension() : f => f));
//   const div = document.createElement('div');
//   ReactDOM.render (
//     <Provider store={store}>
//       <PortfolioEditPage portfolio={myPortfolio} iconName='edit' iconColor='blue' tooltip='Edit portfolio name'/>
//     </Provider>,
//     div
//   );
// });

// function setupPortfolioEditPage() {
//   const store = createStore(rootReducer, compose(applyMiddleware(thunk), window.devToolsExtension ? window.devToolsExtension() : f => f));
//   const props = { addTodo: jest.fn() };
//   const enzymeWrapper = shallow(<PortfolioEditPage store={store} portfolio={myPortfolio} iconName='edit' iconColor='blue' tooltip='Edit portfolio name'/>);
//   return { props, enzymeWrapper };
// }

// it('renders PortfolioChartPage', () => {
//   const store = createStore(rootReducer, compose(applyMiddleware(thunk), window.devToolsExtension ? window.devToolsExtension() : f => f));
//   const div = document.createElement('div');
//   ReactDOM.render (
//     <Provider store={store}>
//       <PortfolioChartPage portfolio={myPortfolio} iconName='chart line' iconColor='blue' tooltip='Chart portfolio'/>
//     </Provider>,
//     div
//   );
// });
//
// function setupPortfolioChartPage() {
//   const store = createStore(rootReducer, compose(applyMiddleware(thunk), window.devToolsExtension ? window.devToolsExtension() : f => f));
//   const props = { addTodo: jest.fn() };
//   const enzymeWrapper = shallow(<PortfolioChartPage store={store} portfolio={myPortfolio} iconName='chart line' iconColor='blue' tooltip='Chart portfolio'/>);
//   return { props, enzymeWrapper };
// }
//
// it('renders a portfolio chart', () => {
//   const { enzymeWrapper } = setupPortfolioChartPage();
//   expect(enzymeWrapper.props().iconName).toEqual('chart line');
//   enzymeWrapper.find('PortfolioChartPage').dive().instance().handleOpen();
//   const myButton = enzymeWrapper.find('PortfolioChartPage').dive().find('Button');
//   myButton.simulate('click');
// });
//

// it('renders the Credentials Page', () => {
//   const renderer = new ShallowRenderer();
//   const accessToken = 'BQDTol9gRJ2paaIbGXXZetNjR-CCrI6XljAoDb9IhYEvUjRjMyNzekb9ReJ0pblZeJgO62TNh-dCwHDlc2dTNzvnVoKiEipqOLajR-QeAC7iBJwE60raxHUYBTzX27T-myVyQkTcc2uVpvzeXy5GMNsXVqcK6ai8mJXrDUHd0sCVoprhKRRImcNgA0dWeQ';
//   const trigger  = jest.fn();
//   const data = {
//     "country": "US",
//     "display_name": "John Pfingst",
//     "email": "john@liboatpages.com",
//     "explicit_content": {
//       "filter_enabled": false,
//       "filter_locked": false
//     },
//     "external_urls": {
//       "spotify": "https://open.spotify.com/user/22ktibc2flnvkjz3nhv2dlhji"
//     },
//     "followers": {
//       "href": null,
//       "total": 1
//     },
//     "href": "https://api.spotify.com/v1/users/22ktibc2flnvkjz3nhv2dlhji",
//     "id": "22ktibc2flnvkjz3nhv2dlhji",
//     "images": [
//       {
//         "height": null,
//         "url": "https://i.scdn.co/image/ab6775700000ee85285a573a5b37a80df8e4a06f",
//         "width": null
//       }
//     ],
//     "product": "premium",
//     "type": "user",
//     "uri": "spotify:user:22ktibc2flnvkjz3nhv2dlhji"
//   };

  // renderer.render(<CredentialsPage accessToken={accessToken} trigger={trigger}/>);
  //
  // const result = renderer.getRenderOutput();
// });


// it('renders Credentials', () => {
//   // const mockCallBack = jest.fn();
//   // const renderer = new ShallowRenderer();
//   // renderer.render(<Credentials accessToken={accessToken} profile_data={data}/>);
//   // const result = rederer.getRenderOutput();
//   // expect(result.length).toEqual(1)
//
//   const accessToken = '1234567890';
//   const data = {items:[]};
//   const page = shallow((<Credentials accessToken={accessToken} profile_data={data}/>));
//   expect(page.length).toEqual(1)
//
//   // page.find('[title="Refresh headlines"]').simulate('click');
//   // expect(mockCallBack.mock.calls.length).toEqual(1);
// });

// it('does not render Headlines', () => {
//   const renderer = new ShallowRenderer();
//   renderer.render(<Headlines articles={null} djiaValue={decimalValue} djiaChange={decimalValue} refreshTime={new Date()} refreshHeadlines={myMock} userLocale={myUser.locale}/>);
//   const result = renderer.getRenderOutput();
// });
//
// it('renders Help', () => {
//   const page = shallow((<Help/>));
//   expect(page.length).toEqual(1)
// });
//
// it('renders PortfolioChart', () => {
//   // needs some workarounds to avoid error - Invariant Violation: ReactShallowRenderer render(): Shallow rendering works only with custom components, but the provided element type was `undefined`.
//   // const page = shallow((<PortfolioChart/>));
// });
//
// it('renders Portfolios', () => {
//   const renderer = new ShallowRenderer();
//   renderer.render(<Portfolios portfolios={[myPortfolio]} updatingPortfolio={false} totalCost={decimalValue} totalDayChange={decimalValue} totalGainLoss={decimalValue} totalMarketValue={decimalValue} refreshPortfolios={myMock} onClickRemove={myMock} onClickColHeader={myMock} sortColName={'name'} sortDirection={'ascending'} userLocale={myUser.locale}/>);
//   const result = renderer.getRenderOutput();
// });
//
// it('renders Positions', () => {
//   const renderer = new ShallowRenderer();
//   renderer.render(<Positions portfolio={myPortfolio} updatingPortfolio={false} portfolioRefresh={myMock} onClickSubmit={myMock} onClickRemove={myMock} onClickColHeader={myMock} sortColName={'symbol'} sortDirection={'ascending'} userLocale={myUser.locale}/>);
//   const result = renderer.getRenderOutput();
// });
