import React from 'react';
import { shallow } from 'enzyme';
import ReportPage from './report';
import { User } from '../../../models/user';
import { BrowserRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';

const user = new User(
  'email@example.com',
  'FirstName',
  'LastName',
  'ADMIN',
  'token',
  1,
);

beforeEach(() => {
  localStorage.setItem('user', JSON.stringify(user));
});

afterEach(() => {
  localStorage.clear();
});

describe('<ReportPage />', () => {
  it('should render', () => {
    let mount;
    act(() => {
      mount = shallow(<BrowserRouter><ReportPage /></BrowserRouter>);
    });
    expect(mount);
  });
});
