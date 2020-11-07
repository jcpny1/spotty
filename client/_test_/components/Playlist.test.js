import React           from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { shallow, mount, render } from 'enzyme';
import {Playlist} from '../../src/components/Playlist';

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

it('renders Playlist', () => {
  const renderer = new ShallowRenderer();
  const accessToken = 'BQDWwA5GKF6qRuc8LZY96zPN0HIbqxWKcrqgYwapA0kyq8QJ0xzCTrqjpDW23kSS3I7hLM7CVSsZvFbpRUggYl_Ra-Cgqq7oCN3UE4FIQAY6kxesPnBnsB2U5Sf1_FksCa5t81SGQyM8uAsxCj2a3lMGv1cwlcc_27Wpj12WDdkUQB2eg2UinUixZi4dag';
  const active   = false;
  const index    = 0;
  const loading  = false;
  const onClick  = jest.fn();
  const onSort   = jest.fn();
  const playlist = {
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
  };

  renderer.render(<Playlist accessToken={accessToken} active={active} index={index} loading={loading} onClick={onClick} onSort={onSort} playlist={playlist} />);
  const result = renderer.getRenderOutput();
});
