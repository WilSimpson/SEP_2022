import { mount } from 'enzyme';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import '../../setupTests';
import Settings from './settings';

beforeEach(() => {
  localStorage.setItem('dark', false);
});

afterEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});

describe('<Settings />', () => {
  describe('theme change toggle', () => {
    it ('should call prop function when switch clicked', () => {
      let handleThemeMock = jest.fn();
      let wrapper = mount(<BrowserRouter><Settings handleTheme={handleThemeMock} /></BrowserRouter>);
      wrapper.find('#darkSwitch').hostNodes().simulate('change');
      expect (handleThemeMock).toHaveBeenCalled();
    });
  });
});