import React from 'react';
import { shallow } from 'enzyme';
import '../setupTests';
import '@testing-library/jest-dom/extend-expect';
import AdminDash, { GameSessionTable } from '../pages/admin/AdminDash';
import { User } from '../models/user.model';
import { afterEach, beforeEach } from '@jest/globals';
import GamesTable from '../components/admin/GamesTable';

const user = new User('test@test.com', '', '', 'ADMIN', 'jwt-token', 1);

describe("<AdminDash />", () => {
  beforeEach(() => {
    localStorage.setItem('user', JSON.stringify(user));
  })
  afterEach(() => {
    localStorage.clear();
  })

  it("should render the AdminDash component", () => {
    const shallowWrapper = shallow(<AdminDash />);
    expect(shallowWrapper);
  });

  it("should have an All Games table", () => {
    const shallowWrapper = shallow(<AdminDash />);
    expect(shallowWrapper.find(GamesTable).length).toEqual(1);
  });

  it("should have an indicator to Total Games", () => {
    const shallowWrapper = shallow(<AdminDash />);
    expect(shallowWrapper.find('[data-testid="total-games"]').length).toEqual(1);
  });

  it("should have a table to show Active Game Sessions", () => {
    const shallowWrapper = shallow(<AdminDash />);
    expect(shallowWrapper.find(GameSessionTable).length).toEqual(1);
  });
});
