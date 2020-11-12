import React           from 'react';
import ReactDOM        from 'react-dom';
import ShallowRenderer from 'react-test-renderer/shallow';
import Enzyme          from 'enzyme';
import { shallow, mount, render } from 'enzyme';
import Adapter         from 'enzyme-adapter-react-16';

import App from '../src/App';

Enzyme.configure({ adapter: new Adapter() });

it('renders Home page', () => {
  const wrapper = shallow(<App />);
  wrapper.find('#login').simulate('click');
});
