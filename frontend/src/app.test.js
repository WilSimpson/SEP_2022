import React from 'react';
import {shallow} from 'enzyme';
import {expect, jest} from '@jest/globals';
import {act} from 'react-dom/test-utils';
import {render, unmountComponentAtNode} from 'react-dom';
import {BrowserRouter as Router, Routes, Route, BrowserRouter} from 'react-router-dom';
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