// import {expect}        from 'expect';
// import { screen }      from '@testing-library/react';
import React           from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { shallow, mount, render } from 'enzyme';
import App             from './App';
import Enzyme          from 'enzyme';
import { configure }   from 'enzyme';
import Adapter         from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

it('renders Home page', () => {
  const renderer = new ShallowRenderer();
  const accessToken = '1234567890';
  const data = {images: [{url:'xyz'}], external_urls: 'xxx'};
  renderer.render(<App />);
  const result = renderer.getRenderOutput();
});
