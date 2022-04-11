import React from 'react';
import {shallow} from 'enzyme';
import {expect} from '@jest/globals';
import {BrowserRouter as BrowserRouter} from 'react-router-dom';
import App from './app';

describe('<App />', () => {
  describe('child components it renders', () => {
    it ('should render <Router/>', () => {
      const wrapper = shallow(<App />);
      console.log(wrapper.debug());
      expect(wrapper.find(BrowserRouter)).toHaveLength(1);
    });
  });
});