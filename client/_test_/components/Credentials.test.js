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

it('renders Credentials', () => {
  const renderer = new ShallowRenderer();
  const accessToken = 'BQDflSswgxzzG4jEtrAkGHMgcL77G_kgj7A-nbWyo8dNY8cEk4RazkH85Q_PnhVZfphIYHg6CfI4whnXnXnPTiDKvXzTiFdqKzXC10ynQkcbh16rNCJeB21ncpu9PNMn0QprIwh6oOmcHYl6slfWBpmO4UQWofAs0PA20ZQzzxzW_rHNDArkYE9_y4aVHA';
  const profile_data = {
    "country": "US",
    "display_name": "John Pfingst",
    "email": "john@liboatpages.com",
    "explicit_content": {
      "filter_enabled": false,
      "filter_locked": false
    },
    "external_urls": {
      "spotify": "https://open.spotify.com/user/22ktibc2flnvkjz3nhv2dlhji"
    },
    "followers": {
      "href": null,
      "total": 1
    },
    "href": "https://api.spotify.com/v1/users/22ktibc2flnvkjz3nhv2dlhji",
    "id": "22ktibc2flnvkjz3nhv2dlhji",
    "images": [
      {
        "height": null,
        "url": "https://i.scdn.co/image/ab6775700000ee85285a573a5b37a80df8e4a06f",
        "width": null
      }
    ],
    "product": "premium",
    "type": "user",
    "uri": "spotify:user:22ktibc2flnvkjz3nhv2dlhji"
  };

  renderer.render(<Credentials accessToken={accessToken} profile_data={profile_data}/>);
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
