// import {expect}        from 'expect';
// import { screen }      from '@testing-library/react';
import React           from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import App             from './App';
import Enzyme          from 'enzyme';
import Adapter         from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

it('renders Home page', () => {
  const renderer = new ShallowRenderer();
  renderer.render(<App />);
  const result = renderer.getRenderOutput();
});
