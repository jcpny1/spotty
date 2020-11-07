import React           from 'react';
import ReactDOM        from 'react-dom';
import {Button, Header, Icon, Modal} from 'semantic-ui-react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Enzyme          from 'enzyme';
import { shallow, mount, render } from 'enzyme';
import Adapter         from 'enzyme-adapter-react-16';

import CredentialsPage    from '../../src/containers/CredentialsPage';

const myDispatch = jest.fn();
const myMock     = jest.fn();
const mySort     = jest.fn();

const accessToken = 'BQDTol9gRJ2paaIbGXXZetNjR-CCrI6XljAoDb9IhYEvUjRjMyNzekb9ReJ0pblZeJgO62TNh-dCwHDlc2dTNzvnVoKiEipqOLajR-QeAC7iBJwE60raxHUYBTzX27T-myVyQkTcc2uVpvzeXy5GMNsXVqcK6ai8mJXrDUHd0sCVoprhKRRImcNgA0dWeQ';
const trigger  = jest.fn();
const data = {
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


Enzyme.configure({ adapter: new Adapter() });

it('renders the Credentials Page', () => {
  const renderer = new ShallowRenderer();
  renderer.render (
    <CredentialsPage accessToken={accessToken} trigger={<Button style={{marginBottom:'15px'}} content='Credentials'  title='Display Spotify connection data' inverted size='medium' />} />
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
