import React from 'react';
import {shallow} from 'enzyme';
import '../setupTests';
import '@testing-library/jest-dom/extend-expect';
import {render, fireEvent} from '@testing-library/react';
import {User} from '../models/user.model';
import FacultyDash from '../pages/faculty/FacultyDash';
import {BrowserRouter} from 'react-router-dom';
import GamesTable from '../components/admin/GamesTable';
import axios from 'axios';

const result = new User('test@test.com', '', '', 'FACULTY', 'jwt-token');

jest.mock('axios');

describe('<FacultyDash />', () => {
  beforeEach(() => {
    localStorage.setItem('user', JSON.stringify(result));
  });
  afterEach(() => {
    localStorage.clear();
  });

  it('should render the FacultyDash component', () => {
    expect(
        shallow(
            <BrowserRouter>
              <FacultyDash />
            </BrowserRouter>,
        ),
    );
  });

  it('should have an All Games table', () => {
    expect(shallow(<FacultyDash />).find(GamesTable).length).toEqual(1);
  });

  it('should have an indicator to Total Games', () => {
    const {getByTestId} = render(
        <BrowserRouter>
          <FacultyDash />
        </BrowserRouter>,
    );
    expect(getByTestId('total-games')).toBeInTheDocument();
  });

  it('should have a table to show Active Game Sessions', () => {
    const {getByTestId} = render(
        <BrowserRouter>
          <FacultyDash />
        </BrowserRouter>,
    );
    expect(getByTestId('active-game-sessions')).toBeInTheDocument();
  });
});
