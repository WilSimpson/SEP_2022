import React from 'react';
import '../../../setupTests';
import {mount} from 'enzyme';
import ReportsPage from './reports';
import {User} from '../../../models/user';
import {act} from 'react-dom/test-utils';
import {BrowserRouter} from 'react-router-dom';
import axios from 'axios';
import AuthenticatedLayout from '../../../components/layout/authenticated.layout';
import {alertService} from '../../../services/alert';


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
  let wrapper;

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
      wrapper = null;
    }
  })

  describe('successful response data', () => {
    beforeEach(async () => {
      const resp = {data: []};
      axios.get.mockResolvedValue(resp);
      await act(async () => {
          wrapper = mount(
            <BrowserRouter>
              <ReportsPage />
            </BrowserRouter>,
          );
      });
    });
  
    it('should render', () => {
      expect(wrapper);
    });
  
    it('should have navigation', () => {
      expect(wrapper.find(AuthenticatedLayout).length).toEqual(1);
    });
  
    it('has correct components', () => {
      expect(wrapper.text()).toContain('Select Game');
    });
  })

  describe('invalid response data', () => {
    it('should show errors', async () => {
      const err = new Error('test error');
      axios.get.mockRejectedValue(err);
      const spy = jest.spyOn(alertService, 'alert');
      await act(async () => {
          wrapper = mount(
            <BrowserRouter>
              <ReportsPage />
            </BrowserRouter>,
          );
      });

      expect(spy).toBeCalledTimes(1);
    });
  })
});
