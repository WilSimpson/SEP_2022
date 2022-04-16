import React from 'react';
import '../../setupTests';
import {mount} from 'enzyme';
import '@testing-library/jest-dom/extend-expect';
import AdminDash from './dashboard';
import {User} from '../../models/user';
import {afterEach, beforeEach} from '@jest/globals';
import GamesTable from '../../components/admin/gamesTable';
import {BrowserRouter} from 'react-router-dom';
import {act} from 'react-dom/test-utils';
import GameSessionsTable from '../../components/faculty/gameSessionsTable';
import axios from 'axios';
import Loading from '../../components/layout/loading';

const user = new User('test@test.com', '', '', 'ADMIN', 'jwt-token', 1);
jest.mock('axios');


describe('<AdminDash />', () => {
  let wrapper;

  beforeEach(async () => {
    localStorage.setItem('user', JSON.stringify(user));
    await act(async() => {
      const resp = {data: []};
      axios.get.mockResolvedValue(resp);
      wrapper = mount(
        <BrowserRouter>
          <AdminDash />
        </BrowserRouter>,
      );
    });
  });
  
  afterEach(() => {
    localStorage.clear();
    wrapper = null;
  });

  it('should render the AdminDash component', () => {
    expect(wrapper);
  });

  it('should be loading', () => {
    expect(wrapper.find(Loading).length).toEqual(1);
  });

  it.skip('should have an All Games table', () => {
    let length;
    act(() => {
      length = wrapper.find(GamesTable).length;
      expect(length).toEqual(1);
    });
  });

  it.skip('should have an indicator to Total Games', () => {
    expect(wrapper.find('[data-testid="total-games"]').length)
        .toEqual(1);
  });

  it.skip('should have a table to show Active Game Sessions', () => {
    expect(wrapper.find(GameSessionsTable).length).toEqual(1);
  });
});
