import React from 'react';
import GameSessionsTable from './gameSessionsTable';
import {mount} from 'enzyme';
import {User} from '../../models/user';
import {act} from 'react-dom/test-utils';
import {BrowserRouter} from 'react-router-dom';

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

describe('<GameSessionsTable />', () => {
  it('should render', () => {
    let wrapper;
    act(() => {
      wrapper = mount(<BrowserRouter><GameSessionsTable /></BrowserRouter>);
    });
    expect(wrapper);
    expect(wrapper.text()).toContain('Game Sessions');
  });
});
