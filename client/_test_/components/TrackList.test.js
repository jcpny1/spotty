import React           from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { shallow, mount, render } from 'enzyme';
import {TrackList} from '../../src/components/TrackList';

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

it('renders TrackList', () => {
  const renderer = new ShallowRenderer();
  const onSort   = jest.fn();
  const showPlaylistName = false;
  const tracks = {
    "href": "https://api.spotify.com/v1/playlists/4p870loFtiuhkWD9guNJ39/tracks",
    "total": 3,
    "items": [
      {
        "added_at": "2019-01-05T18:38:56Z",
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
            "album_type": "album",
            "artists": [
              {
                "external_urls": {
                  "spotify": "https://open.spotify.com/artist/3ciRvbBIVz9fBoPbtSYq4x"
                },
                "href": "https://api.spotify.com/v1/artists/3ciRvbBIVz9fBoPbtSYq4x",
                "id": "3ciRvbBIVz9fBoPbtSYq4x",
                "name": "Lil Jon & The East Side Boyz",
                "type": "artist",
                "uri": "spotify:artist:3ciRvbBIVz9fBoPbtSYq4x"
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
              "spotify": "https://open.spotify.com/album/0hk2hXNB5d65F400dhcdcV"
            },
            "href": "https://api.spotify.com/v1/albums/0hk2hXNB5d65F400dhcdcV",
            "id": "0hk2hXNB5d65F400dhcdcV",
            "images": [
              {
                "height": 640,
                "url": "https://i.scdn.co/image/ab67616d0000b2734ab521cf16202a5bc5f72cfe",
                "width": 640
              },
              {
                "height": 300,
                "url": "https://i.scdn.co/image/ab67616d00001e024ab521cf16202a5bc5f72cfe",
                "width": 300
              },
              {
                "height": 64,
                "url": "https://i.scdn.co/image/ab67616d000048514ab521cf16202a5bc5f72cfe",
                "width": 64
              }
            ],
            "name": "Crunk Juice",
            "release_date": "2004-11-16",
            "release_date_precision": "day",
            "total_tracks": 19,
            "type": "album",
            "uri": "spotify:album:0hk2hXNB5d65F400dhcdcV"
          },
          "artists": [
            {
              "external_urls": {
                "spotify": "https://open.spotify.com/artist/3ciRvbBIVz9fBoPbtSYq4x"
              },
              "href": "https://api.spotify.com/v1/artists/3ciRvbBIVz9fBoPbtSYq4x",
              "id": "3ciRvbBIVz9fBoPbtSYq4x",
              "name": "Lil Jon & The East Side Boyz",
              "type": "artist",
              "uri": "spotify:artist:3ciRvbBIVz9fBoPbtSYq4x"
            },
            {
              "external_urls": {
                "spotify": "https://open.spotify.com/artist/3Mcii5XWf6E0lrY3Uky4cA"
              },
              "href": "https://api.spotify.com/v1/artists/3Mcii5XWf6E0lrY3Uky4cA",
              "id": "3Mcii5XWf6E0lrY3Uky4cA",
              "name": "Ice Cube",
              "type": "artist",
              "uri": "spotify:artist:3Mcii5XWf6E0lrY3Uky4cA"
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
          "duration_ms": 308853,
          "episode": false,
          "explicit": true,
          "external_ids": {
            "isrc": "USTV10400213"
          },
          "external_urls": {
            "spotify": "https://open.spotify.com/track/3HnhrVBybVBzp9yEQcAzfC"
          },
          "href": "https://api.spotify.com/v1/tracks/3HnhrVBybVBzp9yEQcAzfC",
          "id": "3HnhrVBybVBzp9yEQcAzfC",
          "is_local": false,
          "name": "Real N***A Roll Call",
          "popularity": 48,
          "preview_url": "https://p.scdn.co/mp3-preview/111574c9d66fcc15a840dadcecbc4fb0d6dc63e3?cid=e9909de30f3342a79a418dd576811ab4",
          "track": true,
          "track_number": 4,
          "type": "track",
          "uri": "spotify:track:3HnhrVBybVBzp9yEQcAzfC"
        },
        "video_thumbnail": {
          "url": null
        },
        "playlistName": "Crunk"
      },
      {
        "added_at": "2019-01-12T01:25:43Z",
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
            "album_type": "album",
            "artists": [
              {
                "external_urls": {
                  "spotify": "https://open.spotify.com/artist/1BH45DVSTeGBvcYXNCd67g"
                },
                "href": "https://api.spotify.com/v1/artists/1BH45DVSTeGBvcYXNCd67g",
                "id": "1BH45DVSTeGBvcYXNCd67g",
                "name": "M.O.P.",
                "type": "artist",
                "uri": "spotify:artist:1BH45DVSTeGBvcYXNCd67g"
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
              "spotify": "https://open.spotify.com/album/0mw0v424Ribwwrt0oMVB1j"
            },
            "href": "https://api.spotify.com/v1/albums/0mw0v424Ribwwrt0oMVB1j",
            "id": "0mw0v424Ribwwrt0oMVB1j",
            "images": [
              {
                "height": 640,
                "url": "https://i.scdn.co/image/ab67616d0000b27399d5e13356b05f244af52d78",
                "width": 640
              },
              {
                "height": 300,
                "url": "https://i.scdn.co/image/ab67616d00001e0299d5e13356b05f244af52d78",
                "width": 300
              },
              {
                "height": 64,
                "url": "https://i.scdn.co/image/ab67616d0000485199d5e13356b05f244af52d78",
                "width": 64
              }
            ],
            "name": "Warriorz",
            "release_date": "2000-08-29",
            "release_date_precision": "day",
            "total_tracks": 20,
            "type": "album",
            "uri": "spotify:album:0mw0v424Ribwwrt0oMVB1j"
          },
          "artists": [
            {
              "external_urls": {
                "spotify": "https://open.spotify.com/artist/1BH45DVSTeGBvcYXNCd67g"
              },
              "href": "https://api.spotify.com/v1/artists/1BH45DVSTeGBvcYXNCd67g",
              "id": "1BH45DVSTeGBvcYXNCd67g",
              "name": "M.O.P.",
              "type": "artist",
              "uri": "spotify:artist:1BH45DVSTeGBvcYXNCd67g"
            },
            {
              "external_urls": {
                "spotify": "https://open.spotify.com/artist/1YfEcTuGvBQ8xSD1f53UnK"
              },
              "href": "https://api.spotify.com/v1/artists/1YfEcTuGvBQ8xSD1f53UnK",
              "id": "1YfEcTuGvBQ8xSD1f53UnK",
              "name": "Busta Rhymes",
              "type": "artist",
              "uri": "spotify:artist:1YfEcTuGvBQ8xSD1f53UnK"
            },
            {
              "external_urls": {
                "spotify": "https://open.spotify.com/artist/7362Tj1IkoHp7oWveGTf51"
              },
              "href": "https://api.spotify.com/v1/artists/7362Tj1IkoHp7oWveGTf51",
              "id": "7362Tj1IkoHp7oWveGTf51",
              "name": "Teflon",
              "type": "artist",
              "uri": "spotify:artist:7362Tj1IkoHp7oWveGTf51"
            },
            {
              "external_urls": {
                "spotify": "https://open.spotify.com/artist/7MseR8aIHbFMXzMAkRPCZy"
              },
              "href": "https://api.spotify.com/v1/artists/7MseR8aIHbFMXzMAkRPCZy",
              "id": "7MseR8aIHbFMXzMAkRPCZy",
              "name": "Remi Martin",
              "type": "artist",
              "uri": "spotify:artist:7MseR8aIHbFMXzMAkRPCZy"
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
          "duration_ms": 247693,
          "episode": false,
          "explicit": true,
          "external_ids": {
            "isrc": "USLR50100062"
          },
          "external_urls": {
            "spotify": "https://open.spotify.com/track/5osSw3tL07Tuid7AWsvYcc"
          },
          "href": "https://api.spotify.com/v1/tracks/5osSw3tL07Tuid7AWsvYcc",
          "id": "5osSw3tL07Tuid7AWsvYcc",
          "is_local": false,
          "name": "Ante Up (feat. Busta Rhymes, Teflon & Remi Martin) - Remix",
          "popularity": 61,
          "preview_url": "https://p.scdn.co/mp3-preview/1bcee65e8a1f61f93d10252e19add15e01b89edb?cid=e9909de30f3342a79a418dd576811ab4",
          "track": true,
          "track_number": 20,
          "type": "track",
          "uri": "spotify:track:5osSw3tL07Tuid7AWsvYcc"
        },
        "video_thumbnail": {
          "url": null
        },
        "playlistName": "Crunk"
      },
      {
        "added_at": "2019-04-10T09:21:45Z",
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
            "album_type": "album",
            "artists": [
              {
                "external_urls": {
                  "spotify": "https://open.spotify.com/artist/1YfEcTuGvBQ8xSD1f53UnK"
                },
                "href": "https://api.spotify.com/v1/artists/1YfEcTuGvBQ8xSD1f53UnK",
                "id": "1YfEcTuGvBQ8xSD1f53UnK",
                "name": "Busta Rhymes",
                "type": "artist",
                "uri": "spotify:artist:1YfEcTuGvBQ8xSD1f53UnK"
              }
            ],
            "available_markets": [],
            "external_urls": {
              "spotify": "https://open.spotify.com/album/1FH8ruELaU1kthrFvdcSmt"
            },
            "href": "https://api.spotify.com/v1/albums/1FH8ruELaU1kthrFvdcSmt",
            "id": "1FH8ruELaU1kthrFvdcSmt",
            "images": [
              {
                "height": 640,
                "url": "https://i.scdn.co/image/ab67616d0000b273117fafcd2354258771914e63",
                "width": 640
              },
              {
                "height": 300,
                "url": "https://i.scdn.co/image/ab67616d00001e02117fafcd2354258771914e63",
                "width": 300
              },
              {
                "height": 64,
                "url": "https://i.scdn.co/image/ab67616d00004851117fafcd2354258771914e63",
                "width": 64
              }
            ],
            "name": "Genesis",
            "release_date": "2001-11-13",
            "release_date_precision": "day",
            "total_tracks": 20,
            "type": "album",
            "uri": "spotify:album:1FH8ruELaU1kthrFvdcSmt"
          },
          "artists": [
            {
              "external_urls": {
                "spotify": "https://open.spotify.com/artist/1YfEcTuGvBQ8xSD1f53UnK"
              },
              "href": "https://api.spotify.com/v1/artists/1YfEcTuGvBQ8xSD1f53UnK",
              "id": "1YfEcTuGvBQ8xSD1f53UnK",
              "name": "Busta Rhymes",
              "type": "artist",
              "uri": "spotify:artist:1YfEcTuGvBQ8xSD1f53UnK"
            }
          ],
          "available_markets": [],
          "disc_number": 1,
          "duration_ms": 231240,
          "episode": false,
          "explicit": true,
          "external_ids": {
            "isrc": "USJAY0100418"
          },
          "external_urls": {
            "spotify": "https://open.spotify.com/track/0svl7cK07gK1ia5ainczU5"
          },
          "href": "https://api.spotify.com/v1/tracks/0svl7cK07gK1ia5ainczU5",
          "id": "0svl7cK07gK1ia5ainczU5",
          "is_local": false,
          "name": "Break Ya Neck",
          "popularity": 5,
          "preview_url": null,
          "track": true,
          "track_number": 10,
          "type": "track",
          "uri": "spotify:track:0svl7cK07gK1ia5ainczU5"
        },
        "video_thumbnail": {
          "url": null
        },
        "playlistName": "Crunk"
      }
    ]
  };

  renderer.render(<TrackList tracks={tracks} showPlaylistName={showPlaylistName} onSort={onSort} />);
  const result = renderer.getRenderOutput();
});
