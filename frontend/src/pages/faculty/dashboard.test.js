import React from 'react';
import {shallow} from 'enzyme';
import '../../setupTests';
import '@testing-library/jest-dom/extend-expect';
import {User} from '../../models/user';
import FacultyDash from './dashboard';
import {BrowserRouter} from 'react-router-dom';
import GamesTable from '../../components/admin/gamesTable';
import {render} from '@testing-library/react'
import axios from 'axios';

const result = new User('test@test.com', '', '', 'FACULTY', 'jwt-token');
const res = [{department: 'There was a problem',
  name: 'N/A', courseNumber: 'N/A', sectionNumber: 'N/A',
  semester: 'N/A'}];

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
    const resp = {data: []};
    axios.get.mockResolvedValue(resp);
    const {getByTestId} = render(
        <BrowserRouter>
          <FacultyDash />
        </BrowserRouter>,
    );
    expect(getByTestId('total-games')).toBeInTheDocument();
  });

  it('should have a table to show Active Game Sessions', () => {
    const resp = {data: []};
    axios.get.mockResolvedValue(resp);
    const {getByTestId} = render(
        <BrowserRouter>
          <FacultyDash />
        </BrowserRouter>,
    );
    expect(getByTestId('active-game-sessions')).toBeInTheDocument();
  });

  it('should have a courses table', () => {
    const resp = {data: []};
    axios.get.mockResolvedValue(resp);
    const {getByTestId} = render(
      <BrowserRouter>
        <FacultyDash />
      </BrowserRouter>,
  );
  expect(getByTestId('course_table')).toBeInTheDocument();
  });

  it('should have a button to add a new course', () => {
    const resp = {data: []};
    axios.get.mockResolvedValue(resp);
    const {getByTestId} = render(
        <BrowserRouter>
          <FacultyDash />
        </BrowserRouter>,
    );
    expect(getByTestId('courses-button')).toBeInTheDocument();
  });
});
