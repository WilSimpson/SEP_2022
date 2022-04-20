import React from 'react';
import '../../../setupTests';
import { mount } from 'enzyme';
import ReportPage from './report';
import { User } from '../../../models/user';
import {Routes, Route, MemoryRouter} from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import axios from 'axios';
import AuthenticatedLayout from '../../../components/layout/authenticated.layout';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import {expect} from '@jest/globals';

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
  jest.clearAllMocks();
});

jest.mock('axios');

describe('<ReportPage />', () => {
  let wrapper;
  const gameId = 1;

  beforeEach(async () => {
    const resp = {data: []};
    axios.get.mockResolvedValue(resp);
    await act(async () => {
        wrapper = mount(
          <MemoryRouter initialEntries={[`/report/${gameId}`]}>
            <Routes>
              <Route path='/report/:id' element={<ReportPage />}>
              </Route>
            </Routes>
          </MemoryRouter>
          ,
        );
    });
  });

  afterEach(() => {
    wrapper.unmount();
    wrapper = null;
  })

  it('should render', () => {
    expect(wrapper);
  });

  it('should have navigation', () => {
    expect(wrapper.find(AuthenticatedLayout).length).toEqual(1);
  });

  it('should have correct content', () => {
    expect(wrapper.text()).toContain(`Generating Report for Game ${gameId}`);
    expect(wrapper.find(MobileDatePicker).length).toEqual(2);
    expect(wrapper.find({name: 'start-time-reference'}).hostNodes().length).toEqual(2);
    expect(wrapper.find({name: 'end-time-reference'}).hostNodes().length).toEqual(2);
  });
});
