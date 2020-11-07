import React           from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { shallow, mount, render } from 'enzyme';
import {Credentials}   from '../../src/components/Credentials';

// const myDispatch = jest.fn();
// const myMock     = jest.fn();
// const mySort     = jest.fn();
//
// const myArticle    = {href: 'http://www.whatever.com', title: 'Oh No!', description: 'Looks like trouble.'};
// const decimalValue = new Decimal(1.2, 'currency');
// const myPortfolio  = new Portfolio('1', 'test portfolio');
// const myPosition   = new Position(myPortfolio.id, '1', 100.0, 1.0, '2018-01-01');
// myPortfolio._positions.push(myPosition);
// const myUser = {locale: 'en-US'};
//
// Enzyme.configure({ adapter: new Adapter() });

it('renders TrackDetails', () => {
  const renderer = new ShallowRenderer();
  const track = {
    "album": {
      "album_type": "album",
      "artists": [
        {
          "external_urls": {
            "spotify": "https://open.spotify.com/artist/6PAt558ZEZl0DmdXlnjMgD"
          },
          "href": "https://api.spotify.com/v1/artists/6PAt558ZEZl0DmdXlnjMgD",
          "id": "6PAt558ZEZl0DmdXlnjMgD",
          "name": "Eric Clapton",
          "type": "artist",
          "uri": "spotify:artist:6PAt558ZEZl0DmdXlnjMgD"
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
        "spotify": "https://open.spotify.com/album/3taJF5jtfoJZ3zDKJBu5zG"
      },
      "href": "https://api.spotify.com/v1/albums/3taJF5jtfoJZ3zDKJBu5zG",
      "id": "3taJF5jtfoJZ3zDKJBu5zG",
      "images": [
        {
          "height": 640,
          "url": "https://i.scdn.co/image/ab67616d0000b27357bbb091bed7541a11829e31",
          "width": 640
        },
        {
          "height": 300,
          "url": "https://i.scdn.co/image/ab67616d00001e0257bbb091bed7541a11829e31",
          "width": 300
        },
        {
          "height": 64,
          "url": "https://i.scdn.co/image/ab67616d0000485157bbb091bed7541a11829e31",
          "width": 64
        }
      ],
      "name": "Eric Clapton",
      "release_date": "1970-08-01",
      "release_date_precision": "day",
      "total_tracks": 28,
      "type": "album",
      "uri": "spotify:album:3taJF5jtfoJZ3zDKJBu5zG"
    },
    "artists": [
      {
        "external_urls": {
          "spotify": "https://open.spotify.com/artist/6PAt558ZEZl0DmdXlnjMgD"
        },
        "href": "https://api.spotify.com/v1/artists/6PAt558ZEZl0DmdXlnjMgD",
        "id": "6PAt558ZEZl0DmdXlnjMgD",
        "name": "Eric Clapton",
        "type": "artist",
        "uri": "spotify:artist:6PAt558ZEZl0DmdXlnjMgD"
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
    "duration_ms": 171013,
    "episode": false,
    "explicit": false,
    "external_ids": {
      "isrc": "NLF057090020"
    },
    "external_urls": {
      "spotify": "https://open.spotify.com/track/27mdmXNcO0gNpXlrWi9DPZ"
    },
    "href": "https://api.spotify.com/v1/tracks/27mdmXNcO0gNpXlrWi9DPZ",
    "id": "27mdmXNcO0gNpXlrWi9DPZ",
    "is_local": false,
    "name": "After Midnight",
    "popularity": 43,
    "preview_url": "https://p.scdn.co/mp3-preview/6c77f1380359a467ba2daab392ef37b264143675?cid=e9909de30f3342a79a418dd576811ab4",
    "track": true,
    "track_number": 4,
    "type": "track",
    "uri": "spotify:track:27mdmXNcO0gNpXlrWi9DPZ"
  };

  renderer.render(<TrackDetails track={track}/>);
  const result = renderer.getRenderOutput();
});

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
