import { enableFetchMocks } from 'jest-fetch-mock';
enableFetchMocks();
import * as actions from '../../src/actions/actions';

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

beforeEach(() => {
  fetchMock.resetMocks();
})

it('fetches All Tracks', () => {
  fetch.mockResponse(JSON.stringify({data: '12345'}));

  const state = {
    activeIndex:  null,   // index into playlists.items
    fetchError:   null,
    loadIndex:    null,
    playlists:    null,
  };

  state.playlists = {
    "href": "https://api.spotify.com/v1/users/22ktibc2flnvkjz3nhv2dlhji/playlists?offset=0&limit=20",
    "items": [
      {
        "collaborative": false,
        "description": "",
        "external_urls": {
          "spotify": "https://open.spotify.com/playlist/0YtcPot72Tk38tPPNhUqRG"
        },
        "href": "https://api.spotify.com/v1/playlists/0YtcPot72Tk38tPPNhUqRG",
        "id": "0YtcPot72Tk38tPPNhUqRG",
        "images": [
          {
            "height": 640,
            "url": "https://mosaic.scdn.co/640/ab67616d0000b2731ba5ee8bc24979ce3eee4797ab67616d0000b27357bbb091bed7541a11829e31ab67616d0000b27385ec0264a22d007c1cbd780cab67616d0000b273e2dd29cdaa3fadbdc26d59c4",
            "width": 640
          },
          {
            "height": 300,
            "url": "https://mosaic.scdn.co/300/ab67616d0000b2731ba5ee8bc24979ce3eee4797ab67616d0000b27357bbb091bed7541a11829e31ab67616d0000b27385ec0264a22d007c1cbd780cab67616d0000b273e2dd29cdaa3fadbdc26d59c4",
            "width": 300
          },
          {
            "height": 60,
            "url": "https://mosaic.scdn.co/60/ab67616d0000b2731ba5ee8bc24979ce3eee4797ab67616d0000b27357bbb091bed7541a11829e31ab67616d0000b27385ec0264a22d007c1cbd780cab67616d0000b273e2dd29cdaa3fadbdc26d59c4",
            "width": 60
          }
        ],
        "name": "Classic Rock",
        "owner": {
          "display_name": "John Pfingst",
          "external_urls": {
            "spotify": "https://open.spotify.com/user/22ktibc2flnvkjz3nhv2dlhji"
          },
          "href": "https://api.spotify.com/v1/users/22ktibc2flnvkjz3nhv2dlhji",
          "id": "22ktibc2flnvkjz3nhv2dlhji",
          "type": "user",
          "uri": "spotify:user:22ktibc2flnvkjz3nhv2dlhji"
        },
        "primary_color": null,
        "public": true,
        "snapshot_id": "OTcsMjBiZGUxY2ZkMTM5NDBhZjIzZDQyZjM3OTAxMmMyZGUwYmY0MGM0MQ==",
        "tracks": {
          "href": "https://api.spotify.com/v1/playlists/0YtcPot72Tk38tPPNhUqRG/tracks",
          "total": 92,
          "items": null
        },
        "type": "playlist",
        "uri": "spotify:playlist:0YtcPot72Tk38tPPNhUqRG"
      },
      {
        "collaborative": false,
        "description": "",
        "external_urls": {
          "spotify": "https://open.spotify.com/playlist/4p870loFtiuhkWD9guNJ39"
        },
        "href": "https://api.spotify.com/v1/playlists/4p870loFtiuhkWD9guNJ39",
        "id": "4p870loFtiuhkWD9guNJ39",
        "images": [
          {
            "height": 640,
            "url": "https://i.scdn.co/image/ab67616d0000b2734ab521cf16202a5bc5f72cfe",
            "width": 640
          }
        ],
        "name": "Crunk",
        "owner": {
          "display_name": "John Pfingst",
          "external_urls": {
            "spotify": "https://open.spotify.com/user/22ktibc2flnvkjz3nhv2dlhji"
          },
          "href": "https://api.spotify.com/v1/users/22ktibc2flnvkjz3nhv2dlhji",
          "id": "22ktibc2flnvkjz3nhv2dlhji",
          "type": "user",
          "uri": "spotify:user:22ktibc2flnvkjz3nhv2dlhji"
        },
        "primary_color": null,
        "public": true,
        "snapshot_id": "OCxjMmEzOWRmMTJmNDQ4MGI3OTc0MTY2MzllY2U0NWY4NzZiNzI4ZTY2",
        "tracks": {
          "href": "https://api.spotify.com/v1/playlists/4p870loFtiuhkWD9guNJ39/tracks",
          "total": 3,
          "items": null
        },
        "type": "playlist",
        "uri": "spotify:playlist:4p870loFtiuhkWD9guNJ39"
      },
      {
        "collaborative": false,
        "description": "",
        "external_urls": {
          "spotify": "https://open.spotify.com/playlist/0aGJdzwbOkgIzc01a7wWij"
        },
        "href": "https://api.spotify.com/v1/playlists/0aGJdzwbOkgIzc01a7wWij",
        "id": "0aGJdzwbOkgIzc01a7wWij",
        "images": [
          {
            "height": 640,
            "url": "https://mosaic.scdn.co/640/ab67616d0000b2731b19d3175e73fa23b8f7f199ab67616d0000b2735a5a012f4063c464eab6aec3ab67616d0000b273f537479947e12db3d8d52372ab67616d0000b273f73748d9d869ff756993cfde",
            "width": 640
          },
          {
            "height": 300,
            "url": "https://mosaic.scdn.co/300/ab67616d0000b2731b19d3175e73fa23b8f7f199ab67616d0000b2735a5a012f4063c464eab6aec3ab67616d0000b273f537479947e12db3d8d52372ab67616d0000b273f73748d9d869ff756993cfde",
            "width": 300
          },
          {
            "height": 60,
            "url": "https://mosaic.scdn.co/60/ab67616d0000b2731b19d3175e73fa23b8f7f199ab67616d0000b2735a5a012f4063c464eab6aec3ab67616d0000b273f537479947e12db3d8d52372ab67616d0000b273f73748d9d869ff756993cfde",
            "width": 60
          }
        ],
        "name": "EZ Listening",
        "owner": {
          "display_name": "John Pfingst",
          "external_urls": {
            "spotify": "https://open.spotify.com/user/22ktibc2flnvkjz3nhv2dlhji"
          },
          "href": "https://api.spotify.com/v1/users/22ktibc2flnvkjz3nhv2dlhji",
          "id": "22ktibc2flnvkjz3nhv2dlhji",
          "type": "user",
          "uri": "spotify:user:22ktibc2flnvkjz3nhv2dlhji"
        },
        "primary_color": null,
        "public": true,
        "snapshot_id": "OTIsNGQxNjM5NGNlZDNhZTE3ZjYzYTk1ZTBjMTQ2MmJmNmM1YzExYmE2NA==",
        "tracks": {
          "href": "https://api.spotify.com/v1/playlists/0aGJdzwbOkgIzc01a7wWij/tracks",
          "total": 99,
          "items": null
        },
        "type": "playlist",
        "uri": "spotify:playlist:0aGJdzwbOkgIzc01a7wWij"
      },
      {
        "collaborative": false,
        "description": "",
        "external_urls": {
          "spotify": "https://open.spotify.com/playlist/2sjBUeW2iSLJZAo3Xk2Cqa"
        },
        "href": "https://api.spotify.com/v1/playlists/2sjBUeW2iSLJZAo3Xk2Cqa",
        "id": "2sjBUeW2iSLJZAo3Xk2Cqa",
        "images": [
          {
            "height": 640,
            "url": "https://mosaic.scdn.co/640/ab67616d0000b2732ad71f907cc51eddbe8a0007ab67616d0000b2736b5e54900287d7c38a25fa9aab67616d0000b273aa6b03f85a0f2cb16e88ec0cab67616d0000b273cf072fde43b770a231cdd7b2",
            "width": 640
          },
          {
            "height": 300,
            "url": "https://mosaic.scdn.co/300/ab67616d0000b2732ad71f907cc51eddbe8a0007ab67616d0000b2736b5e54900287d7c38a25fa9aab67616d0000b273aa6b03f85a0f2cb16e88ec0cab67616d0000b273cf072fde43b770a231cdd7b2",
            "width": 300
          },
          {
            "height": 60,
            "url": "https://mosaic.scdn.co/60/ab67616d0000b2732ad71f907cc51eddbe8a0007ab67616d0000b2736b5e54900287d7c38a25fa9aab67616d0000b273aa6b03f85a0f2cb16e88ec0cab67616d0000b273cf072fde43b770a231cdd7b2",
            "width": 60
          }
        ],
        "name": "Father/Daughter Dance",
        "owner": {
          "display_name": "John Pfingst",
          "external_urls": {
            "spotify": "https://open.spotify.com/user/22ktibc2flnvkjz3nhv2dlhji"
          },
          "href": "https://api.spotify.com/v1/users/22ktibc2flnvkjz3nhv2dlhji",
          "id": "22ktibc2flnvkjz3nhv2dlhji",
          "type": "user",
          "uri": "spotify:user:22ktibc2flnvkjz3nhv2dlhji"
        },
        "primary_color": null,
        "public": true,
        "snapshot_id": "MTIsMGQwNzRiMTU5MTczYWJiYzY0NGE1Mzc4YTk4YTVlNmU5ZmM5MDY5Ng==",
        "tracks": {
          "href": "https://api.spotify.com/v1/playlists/2sjBUeW2iSLJZAo3Xk2Cqa/tracks",
          "total": 8,
          "items": null
        },
        "type": "playlist",
        "uri": "spotify:playlist:2sjBUeW2iSLJZAo3Xk2Cqa"
      },
      {
        "collaborative": false,
        "description": "",
        "external_urls": {
          "spotify": "https://open.spotify.com/playlist/5X4EB3XBx8jXi8wepcXkH4"
        },
        "href": "https://api.spotify.com/v1/playlists/5X4EB3XBx8jXi8wepcXkH4",
        "id": "5X4EB3XBx8jXi8wepcXkH4",
        "images": [
          {
            "height": 640,
            "url": "https://mosaic.scdn.co/640/ab67616d0000b273136f94926d47c4986e50c877ab67616d0000b27325d8b7c6feee0c8d6593d606ab67616d0000b27397ea8cd106d06260c2c76cd6ab67616d0000b273b03ff8c30497b9d6fff5e324",
            "width": 640
          },
          {
            "height": 300,
            "url": "https://mosaic.scdn.co/300/ab67616d0000b273136f94926d47c4986e50c877ab67616d0000b27325d8b7c6feee0c8d6593d606ab67616d0000b27397ea8cd106d06260c2c76cd6ab67616d0000b273b03ff8c30497b9d6fff5e324",
            "width": 300
          },
          {
            "height": 60,
            "url": "https://mosaic.scdn.co/60/ab67616d0000b273136f94926d47c4986e50c877ab67616d0000b27325d8b7c6feee0c8d6593d606ab67616d0000b27397ea8cd106d06260c2c76cd6ab67616d0000b273b03ff8c30497b9d6fff5e324",
            "width": 60
          }
        ],
        "name": "Hard Rock",
        "owner": {
          "display_name": "John Pfingst",
          "external_urls": {
            "spotify": "https://open.spotify.com/user/22ktibc2flnvkjz3nhv2dlhji"
          },
          "href": "https://api.spotify.com/v1/users/22ktibc2flnvkjz3nhv2dlhji",
          "id": "22ktibc2flnvkjz3nhv2dlhji",
          "type": "user",
          "uri": "spotify:user:22ktibc2flnvkjz3nhv2dlhji"
        },
        "primary_color": null,
        "public": true,
        "snapshot_id": "MTEsYjRjMzVmN2I3YTYzZWZiN2RhN2I2YjU3YzkyMDIxOTU0ZjVhNmY1OA==",
        "tracks": {
          "href": "https://api.spotify.com/v1/playlists/5X4EB3XBx8jXi8wepcXkH4/tracks",
          "total": 10,
          "items": null
        },
        "type": "playlist",
        "uri": "spotify:playlist:5X4EB3XBx8jXi8wepcXkH4"
      },
      {
        "collaborative": false,
        "description": "",
        "external_urls": {
          "spotify": "https://open.spotify.com/playlist/4exlZI2COn4o619snbEcBo"
        },
        "href": "https://api.spotify.com/v1/playlists/4exlZI2COn4o619snbEcBo",
        "id": "4exlZI2COn4o619snbEcBo",
        "images": [
          {
            "height": 640,
            "url": "https://mosaic.scdn.co/640/ab67616d0000b273136f94926d47c4986e50c877ab67616d0000b27330d45198d0c9e8841f9a9578ab67616d0000b273bb7d33186e4a26421c6a77aeab67616d0000b273dcd9fe1276c16fcdad98c50c",
            "width": 640
          },
          {
            "height": 300,
            "url": "https://mosaic.scdn.co/300/ab67616d0000b273136f94926d47c4986e50c877ab67616d0000b27330d45198d0c9e8841f9a9578ab67616d0000b273bb7d33186e4a26421c6a77aeab67616d0000b273dcd9fe1276c16fcdad98c50c",
            "width": 300
          },
          {
            "height": 60,
            "url": "https://mosaic.scdn.co/60/ab67616d0000b273136f94926d47c4986e50c877ab67616d0000b27330d45198d0c9e8841f9a9578ab67616d0000b273bb7d33186e4a26421c6a77aeab67616d0000b273dcd9fe1276c16fcdad98c50c",
            "width": 60
          }
        ],
        "name": "Loud Rock",
        "owner": {
          "display_name": "John Pfingst",
          "external_urls": {
            "spotify": "https://open.spotify.com/user/22ktibc2flnvkjz3nhv2dlhji"
          },
          "href": "https://api.spotify.com/v1/users/22ktibc2flnvkjz3nhv2dlhji",
          "id": "22ktibc2flnvkjz3nhv2dlhji",
          "type": "user",
          "uri": "spotify:user:22ktibc2flnvkjz3nhv2dlhji"
        },
        "primary_color": null,
        "public": true,
        "snapshot_id": "MTA5LDBmMzM3Njk1ZjEwNDIyOWMxZGJhNTNhZGRiMGU4MjJlNTA2ZTM0MjU=",
        "tracks": {
          "href": "https://api.spotify.com/v1/playlists/4exlZI2COn4o619snbEcBo/tracks",
          "total": 103,
          "items": null
        },
        "type": "playlist",
        "uri": "spotify:playlist:4exlZI2COn4o619snbEcBo"
      },
      {
        "collaborative": false,
        "description": "This is a deep tribal sound, combining electronic elements and organic instrumentation, stemming from the folk music of Africa, Latin America, and the Middle East.",
        "external_urls": {
          "spotify": "https://open.spotify.com/playlist/37i9dQZF1DX2pprEpa9URZ"
        },
        "href": "https://api.spotify.com/v1/playlists/37i9dQZF1DX2pprEpa9URZ",
        "id": "37i9dQZF1DX2pprEpa9URZ",
        "images": [
          {
            "height": null,
            "url": "https://i.scdn.co/image/ab67706f0000000389114dc85925a55cc46e4e6e",
            "width": null
          }
        ],
        "name": "Orgánica",
        "owner": {
          "display_name": "Spotify",
          "external_urls": {
            "spotify": "https://open.spotify.com/user/spotify"
          },
          "href": "https://api.spotify.com/v1/users/spotify",
          "id": "spotify",
          "type": "user",
          "uri": "spotify:user:spotify"
        },
        "primary_color": null,
        "public": true,
        "snapshot_id": "MTYwNDk0OTY5OSwwMDAwMDAwMGQ0MWQ4Y2Q5OGYwMGIyMDRlOTgwMDk5OGVjZjg0Mjdl",
        "tracks": {
          "href": "https://api.spotify.com/v1/playlists/37i9dQZF1DX2pprEpa9URZ/tracks",
          "total": 60,
          "items": null
        },
        "type": "playlist",
        "uri": "spotify:playlist:37i9dQZF1DX2pprEpa9URZ"
      },
      {
        "collaborative": false,
        "description": "",
        "external_urls": {
          "spotify": "https://open.spotify.com/playlist/2Bm165OdJApsUpRaDBdNJP"
        },
        "href": "https://api.spotify.com/v1/playlists/2Bm165OdJApsUpRaDBdNJP",
        "id": "2Bm165OdJApsUpRaDBdNJP",
        "images": [
          {
            "height": 640,
            "url": "https://mosaic.scdn.co/640/ab67616d0000b27331ea0f86f69ae6ce2f88dc81ab67616d0000b27340eea368f4fb5f5ee6dcd9a8ab67616d0000b27381e22a82b74e995dfbce47ccab67616d0000b2739a78755d6cdef8bdd15b39bf",
            "width": 640
          },
          {
            "height": 300,
            "url": "https://mosaic.scdn.co/300/ab67616d0000b27331ea0f86f69ae6ce2f88dc81ab67616d0000b27340eea368f4fb5f5ee6dcd9a8ab67616d0000b27381e22a82b74e995dfbce47ccab67616d0000b2739a78755d6cdef8bdd15b39bf",
            "width": 300
          },
          {
            "height": 60,
            "url": "https://mosaic.scdn.co/60/ab67616d0000b27331ea0f86f69ae6ce2f88dc81ab67616d0000b27340eea368f4fb5f5ee6dcd9a8ab67616d0000b27381e22a82b74e995dfbce47ccab67616d0000b2739a78755d6cdef8bdd15b39bf",
            "width": 60
          }
        ],
        "name": "Party Rock",
        "owner": {
          "display_name": "John Pfingst",
          "external_urls": {
            "spotify": "https://open.spotify.com/user/22ktibc2flnvkjz3nhv2dlhji"
          },
          "href": "https://api.spotify.com/v1/users/22ktibc2flnvkjz3nhv2dlhji",
          "id": "22ktibc2flnvkjz3nhv2dlhji",
          "type": "user",
          "uri": "spotify:user:22ktibc2flnvkjz3nhv2dlhji"
        },
        "primary_color": null,
        "public": true,
        "snapshot_id": "MzYsNTZhMTRiYWM2ZmU1NjdhZWJiOWUxODZmM2NmN2I3MGY3Y2Y3Nzg3Mw==",
        "tracks": {
          "href": "https://api.spotify.com/v1/playlists/2Bm165OdJApsUpRaDBdNJP/tracks",
          "total": 33,
          "items": null
        },
        "type": "playlist",
        "uri": "spotify:playlist:2Bm165OdJApsUpRaDBdNJP"
      },
      {
        "collaborative": false,
        "description": "",
        "external_urls": {
          "spotify": "https://open.spotify.com/playlist/6T7zaaamdGXMWUvRwiIlgv"
        },
        "href": "https://api.spotify.com/v1/playlists/6T7zaaamdGXMWUvRwiIlgv",
        "id": "6T7zaaamdGXMWUvRwiIlgv",
        "images": [],
        "name": "SpottyEmpty",
        "owner": {
          "display_name": "John Pfingst",
          "external_urls": {
            "spotify": "https://open.spotify.com/user/22ktibc2flnvkjz3nhv2dlhji"
          },
          "href": "https://api.spotify.com/v1/users/22ktibc2flnvkjz3nhv2dlhji",
          "id": "22ktibc2flnvkjz3nhv2dlhji",
          "type": "user",
          "uri": "spotify:user:22ktibc2flnvkjz3nhv2dlhji"
        },
        "primary_color": null,
        "public": true,
        "snapshot_id": "MSxhMWM0OWNjNmQ2YzYwODU5YWNjZDUxZmQzODY2NjRjYTljMTFhNzYy",
        "tracks": {
          "href": "https://api.spotify.com/v1/playlists/6T7zaaamdGXMWUvRwiIlgv/tracks",
          "total": 0,
          "items": null
        },
        "type": "playlist",
        "uri": "spotify:playlist:6T7zaaamdGXMWUvRwiIlgv"
      },
      {
        "collaborative": false,
        "description": "This is a test description for a test playlist.",
        "external_urls": {
          "spotify": "https://open.spotify.com/playlist/6vqZMUMOjTlPEUwYgZpTOp"
        },
        "href": "https://api.spotify.com/v1/playlists/6vqZMUMOjTlPEUwYgZpTOp",
        "id": "6vqZMUMOjTlPEUwYgZpTOp",
        "images": [
          {
            "height": 640,
            "url": "https://i.scdn.co/image/ab67616d0000b273077d7940376773bfc37f09d8",
            "width": 640
          }
        ],
        "name": "SpottyTest",
        "owner": {
          "display_name": "John Pfingst",
          "external_urls": {
            "spotify": "https://open.spotify.com/user/22ktibc2flnvkjz3nhv2dlhji"
          },
          "href": "https://api.spotify.com/v1/users/22ktibc2flnvkjz3nhv2dlhji",
          "id": "22ktibc2flnvkjz3nhv2dlhji",
          "type": "user",
          "uri": "spotify:user:22ktibc2flnvkjz3nhv2dlhji"
        },
        "primary_color": null,
        "public": true,
        "snapshot_id": "OCxhNjA2YzEyMGMwMGU5MThkNzg2MTdkMmJhNGI1ZmQ4NmM0MzJkZmIw",
        "tracks": {
          "href": "https://api.spotify.com/v1/playlists/6vqZMUMOjTlPEUwYgZpTOp/tracks",
          "total": 4,
          "items": null
        },
        "type": "playlist",
        "uri": "spotify:playlist:6vqZMUMOjTlPEUwYgZpTOp"
      },
      {
        "collaborative": false,
        "description": "",
        "external_urls": {
          "spotify": "https://open.spotify.com/playlist/0C7hSUjH7SE5wb03YE1HR0"
        },
        "href": "https://api.spotify.com/v1/playlists/0C7hSUjH7SE5wb03YE1HR0",
        "id": "0C7hSUjH7SE5wb03YE1HR0",
        "images": [
          {
            "height": 640,
            "url": "https://mosaic.scdn.co/640/ab67616d0000b2730b1a128867e27ffc617e8a6eab67616d0000b273355a8d64b5a3699314e21667ab67616d0000b2738d3513b6228ce2ef7c39f642ab67616d0000b273a5f79147181976a019edf286",
            "width": 640
          },
          {
            "height": 300,
            "url": "https://mosaic.scdn.co/300/ab67616d0000b2730b1a128867e27ffc617e8a6eab67616d0000b273355a8d64b5a3699314e21667ab67616d0000b2738d3513b6228ce2ef7c39f642ab67616d0000b273a5f79147181976a019edf286",
            "width": 300
          },
          {
            "height": 60,
            "url": "https://mosaic.scdn.co/60/ab67616d0000b2730b1a128867e27ffc617e8a6eab67616d0000b273355a8d64b5a3699314e21667ab67616d0000b2738d3513b6228ce2ef7c39f642ab67616d0000b273a5f79147181976a019edf286",
            "width": 60
          }
        ],
        "name": "Trippy",
        "owner": {
          "display_name": "John Pfingst",
          "external_urls": {
            "spotify": "https://open.spotify.com/user/22ktibc2flnvkjz3nhv2dlhji"
          },
          "href": "https://api.spotify.com/v1/users/22ktibc2flnvkjz3nhv2dlhji",
          "id": "22ktibc2flnvkjz3nhv2dlhji",
          "type": "user",
          "uri": "spotify:user:22ktibc2flnvkjz3nhv2dlhji"
        },
        "primary_color": null,
        "public": true,
        "snapshot_id": "MTgyLDc5N2QxOGE2ZjU1MzhiOGFiMjQwYzRkMmQ4NmVjMTUxNDRkNjg0YmQ=",
        "tracks": {
          "href": "https://api.spotify.com/v1/playlists/0C7hSUjH7SE5wb03YE1HR0/tracks",
          "total": 175,
          "items": null
        },
        "type": "playlist",
        "uri": "spotify:playlist:0C7hSUjH7SE5wb03YE1HR0"
      },
      {
        "collaborative": false,
        "description": "Game on!",
        "external_urls": {
          "spotify": "https://open.spotify.com/playlist/7qS7WYjtuDlYJDDHSjluyW"
        },
        "href": "https://api.spotify.com/v1/playlists/7qS7WYjtuDlYJDDHSjluyW",
        "id": "7qS7WYjtuDlYJDDHSjluyW",
        "images": [
          {
            "height": 640,
            "url": "https://mosaic.scdn.co/640/ab67616d0000b27392de80d078d3e85e4327ae2aab67616d0000b2739b3053cc6adea01dbdad127dab67616d0000b273b4c911dd3959e94183cfa083ab67616d0000b273f2b1c2ed52674e40d14cd6c4",
            "width": 640
          },
          {
            "height": 300,
            "url": "https://mosaic.scdn.co/300/ab67616d0000b27392de80d078d3e85e4327ae2aab67616d0000b2739b3053cc6adea01dbdad127dab67616d0000b273b4c911dd3959e94183cfa083ab67616d0000b273f2b1c2ed52674e40d14cd6c4",
            "width": 300
          },
          {
            "height": 60,
            "url": "https://mosaic.scdn.co/60/ab67616d0000b27392de80d078d3e85e4327ae2aab67616d0000b2739b3053cc6adea01dbdad127dab67616d0000b273b4c911dd3959e94183cfa083ab67616d0000b273f2b1c2ed52674e40d14cd6c4",
            "width": 60
          }
        ],
        "name": "Workout",
        "owner": {
          "display_name": "John Pfingst",
          "external_urls": {
            "spotify": "https://open.spotify.com/user/22ktibc2flnvkjz3nhv2dlhji"
          },
          "href": "https://api.spotify.com/v1/users/22ktibc2flnvkjz3nhv2dlhji",
          "id": "22ktibc2flnvkjz3nhv2dlhji",
          "type": "user",
          "uri": "spotify:user:22ktibc2flnvkjz3nhv2dlhji"
        },
        "primary_color": null,
        "public": true,
        "snapshot_id": "MTU4LDdiOGJkNTVlNGFmZWJlZTZkMjU1NjQ3MWZhOTBkYzVmY2UzNjRjY2Q=",
        "tracks": {
          "href": "https://api.spotify.com/v1/playlists/7qS7WYjtuDlYJDDHSjluyW/tracks",
          "total": 67,
          "items": null
        },
        "type": "playlist",
        "uri": "spotify:playlist:7qS7WYjtuDlYJDDHSjluyW"
      },
      {
        "collaborative": false,
        "description": "",
        "external_urls": {
          "spotify": "https://open.spotify.com/playlist/0YtcPot72Tk38tPPNhUqRG"
        },
        "href": "https://api.spotify.com/v1/playlists/0YtcPot72Tk38tPPNhUqRG",
        "id": "LIKED",
        "images": [],
        "name": "LIKED",
        "owner": {
          "display_name": "John Pfingst",
          "external_urls": {
            "spotify": "https://open.spotify.com/user/22ktibc2flnvkjz3nhv2dlhji"
          },
          "href": "https://api.spotify.com/v1/users/22ktibc2flnvkjz3nhv2dlhji",
          "id": "22ktibc2flnvkjz3nhv2dlhji",
          "type": "user",
          "uri": "spotify:user:22ktibc2flnvkjz3nhv2dlhji"
        },
        "primary_color": null,
        "public": true,
        "snapshot_id": "OTcsMjBiZGUxY2ZkMTM5NDBhZjIzZDQyZjM3OTAxMmMyZGUwYmY0MGM0MQ==",
        "tracks": {
          "href": "https://api.spotify.com/v1/playlists/0YtcPot72Tk38tPPNhUqRG/tracks",
          "total": 92,
          "items": null
        },
        "type": "playlist",
        "uri": "spotify:playlist:0YtcPot72Tk38tPPNhUqRG"
      },
      {
        "collaborative": false,
        "description": "",
        "external_urls": {
          "spotify": "https://open.spotify.com/playlist/0YtcPot72Tk38tPPNhUqRG"
        },
        "href": "https://api.spotify.com/v1/playlists/0YtcPot72Tk38tPPNhUqRG",
        "id": "ALL TRACKS",
        "images": [],
        "name": "ALL TRACKS",
        "owner": {
          "display_name": "John Pfingst",
          "external_urls": {
            "spotify": "https://open.spotify.com/user/22ktibc2flnvkjz3nhv2dlhji"
          },
          "href": "https://api.spotify.com/v1/users/22ktibc2flnvkjz3nhv2dlhji",
          "id": "22ktibc2flnvkjz3nhv2dlhji",
          "type": "user",
          "uri": "spotify:user:22ktibc2flnvkjz3nhv2dlhji"
        },
        "primary_color": null,
        "public": true,
        "snapshot_id": "OTcsMjBiZGUxY2ZkMTM5NDBhZjIzZDQyZjM3OTAxMmMyZGUwYmY0MGM0MQ==",
        "tracks": {
          "href": "https://api.spotify.com/v1/playlists/0YtcPot72Tk38tPPNhUqRG/tracks",
          "total": 92,
          "items": null
        },
        "type": "playlist",
        "uri": "spotify:playlist:0YtcPot72Tk38tPPNhUqRG"
      }
    ],
    "limit": 20,
    "next": null,
    "offset": 0,
    "previous": null,
    "total": 12
  };

  const playlistsItems = state.playlists.items;
  // const index = playlistsItems.length - 1;
  const index = 1;
  const playlist = playlistsItems[index];
  const requestCount = {count: playlistsItems.length - 1};
  const listCombine  = {items: []};

  const props = {
    accessToken: 'BQDWwA5GKF6qRuc8LZY96zPN0HIbqxWKcrqgYwapA0kyq8QJ0xzCTrqjpDW23kSS3I7hLM7CVSsZvFbpRUggYl_Ra-Cgqq7oCN3UE4FIQAY6kxesPnBnsB2U5Sf1_FksCa5t81SGQyM8uAsxCj2a3lMGv1cwlcc_27Wpj12WDdkUQB2eg2UinUixZi4dag',
  };


  actions.getTracklist(this, accessToken, playlist.tracks.href, playlist.name, index, listCombine, requestCount);
  // actions.getAllTracks(this, props.accessToken, playlistsItems, 'ALL TRACKS', index, listCombine, requestCount);
});
