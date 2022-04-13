import React from 'react';
import { shallow } from 'enzyme';
import ViewReportPage from './view';
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

describe('<ViewReportPage />', () => {
  it('should render', () => {
    let mount;
    act(() => {
      mount = shallow(<BrowserRouter><ViewReportPage /></BrowserRouter>);
    });
    expect(mount);
  });
});
