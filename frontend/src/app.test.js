import React from 'react';
import './setupTests';
import {shallow} from 'enzyme';

import {BrowserRouter as BrowserRouter} from 'react-router-dom';
import App from './app';

describe('<App />', () => {
  describe('child components it renders', () => {
    it ('should render <Router/>', () => {
      const wrapper = shallow(<App />);
      expect(wrapper.find(BrowserRouter)).toHaveLength(1);
    });
  });
});