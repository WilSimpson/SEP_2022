import React from 'react';
import { shallow } from 'enzyme';
import {ReportsPage} from './reports';
import { User } from '../../../models/user';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';

const user = new User(
  'email@example.com',
  'FirstName',
  'LastName',
  'ADMIN',
  'token',
  1,
);

jest.mock('axios');


beforeEach(() => {
  localStorage.setItem('user', JSON.stringify(user));
  const resp = {data: []};
  axios.get.mockResolvedValue(resp);
});

afterEach(() => {
  localStorage.clear();
});

describe('<ReportsPage />', () => {
  it('should render', () => {
    let mount;
    act(() => {
      mount = shallow(<BrowserRouter><ReportsPage /></BrowserRouter>);
    });
    expect(mount);
  });
});
