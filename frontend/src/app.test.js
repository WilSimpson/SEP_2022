import React from 'react';
import './setupTests';
import {mount, shallow, render} from 'enzyme';
import Settings from './pages/public/settings';
import {BrowserRouter as BrowserRouter, Route} from 'react-router-dom';
import App from './app';
import {lightTheme, darkTheme} from './helpers/dummyData';
import Home from './pages/public/home';

afterEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});

describe('<App />', () => {
  describe('child components it renders', () => {
    it ('should render <Router/>', () => {
      const wrapper = shallow(<App />);
      expect(wrapper.find(BrowserRouter)).toHaveLength(1);
    });
  });

  describe('theme functionality', () => {
    it('should set dark boolean to local storage', () => {
      mount(<App />);
      expect(localStorage.getItem('dark')).toEqual('false');
    });

    it('should set light theme to local storage on load', () => {
      mount(<App />);
      expect(JSON.parse(localStorage.getItem('theme'))).toEqual(lightTheme);
    });

    it('should set the current theme to the theme in localStorage if exists', () => {
      localStorage.setItem('theme', JSON.stringify(lightTheme));
      mount(<App />);
      expect(JSON.parse(localStorage.getItem('theme'))).toEqual(lightTheme);
    });
  });
});