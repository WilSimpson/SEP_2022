import React from 'react';
import '../../setupTests';
import {User} from '../../models/user';
import { BrowserRouter } from 'react-router-dom';
import ReportsPage from './reports';
import { mount } from 'enzyme';

const result = new User('test@test.com', '', '', 'FACULTY', 'jwt-token');

describe('<ReportsPage />', () => {
  let comp = null;

  beforeEach(() => {
    localStorage.setItem('user', JSON.stringify(result));
    comp = mount(
      <BrowserRouter>
        <ReportsPage />
      </BrowserRouter>
    );
  })

  afterEach(() => {
    localStorage.clear();
  })

  it('should render', () => {
    expect(comp).not.toBeNull();
  })
})