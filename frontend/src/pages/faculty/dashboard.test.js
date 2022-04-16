import React from 'react';
import '../../setupTests';
import {mount} from 'enzyme';
import '@testing-library/jest-dom/extend-expect';
import {User} from '../../models/user';
import FacultyDash from './dashboard';
import {BrowserRouter} from 'react-router-dom';
import GamesTable from '../../components/admin/gamesTable';
import {render, waitFor} from '@testing-library/react'
import axios from 'axios';
import { act } from 'react-dom/test-utils';

const result = new User('test@test.com', '', '', 'FACULTY', 'jwt-token');
const res = [{department: 'There was a problem',
  name: 'N/A', courseNumber: 'N/A', sectionNumber: 'N/A',
  semester: 'N/A'}];

jest.mock('axios');


describe('<FacultyDash />', () => {
  beforeEach(() => {
    localStorage.setItem('user', JSON.stringify(result));
    const resp = {data: []};
    axios.get.mockResolvedValue(resp);
  });
  afterEach(() => {
    localStorage.clear();
  });

  it('should render the FacultyDash component', async () => {
    let wrapper;
    await act(async () => {
      wrapper = mount(
        <BrowserRouter>
          <FacultyDash />
        </BrowserRouter>,
      );
    });
    expect(wrapper);
  });

  it('should have an All Games table', async () => {
    let wrapper;
    await act(async () => {
      wrapper = mount(
        <BrowserRouter>
          <FacultyDash />
        </BrowserRouter>,
      );
    });
    expect(wrapper.find(GamesTable).length).toEqual(1);
  });

  it('should have an indicator to Total Games', async () => {
    const resp = {data: []};
    axios.get.mockResolvedValue(resp);
    const {getByTestId} = render(
        <BrowserRouter>
          <FacultyDash />
        </BrowserRouter>,
    );
    await waitFor(() => expect(getByTestId('total-games')).toBeInTheDocument());
  });

  it('should have a table to show Active Game Sessions', async () => {
    const resp = {data: []};
    axios.get.mockResolvedValue(resp);
    const {getByTestId} = render(
        <BrowserRouter>
          <FacultyDash />
        </BrowserRouter>,
    );
    await waitFor(() => expect(getByTestId('active-game-sessions')).toBeInTheDocument());
  });

  it('should have a courses table', async () => {
    const resp = {data: []};
    axios.get.mockResolvedValue(resp);
    const {getByTestId} = render(
      <BrowserRouter>
        <FacultyDash />
      </BrowserRouter>,
    );
    await waitFor(() => expect(getByTestId('course_table')).toBeInTheDocument());
  });

  it('should have a button to add a new course', async () => {
    const resp = {data: []};
    axios.get.mockResolvedValue(resp);
    const {getByTestId} = render(
        <BrowserRouter>
          <FacultyDash />
        </BrowserRouter>,
    );
    await waitFor(() => expect(getByTestId('courses-button')).toBeInTheDocument());
  });
});
