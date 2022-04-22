import React from 'react';
import '../../../setupTests';
import {mount} from 'enzyme';
import ViewReportPage from './view';
import {User} from '../../../models/user';
import {BrowserRouter} from 'react-router-dom';
import {act} from 'react-dom/test-utils';
// import axios from 'axios';
import MockGameSessionService from '../../../services/gameSession';
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

// jest.mock('axios');
jest.mock('../../../services/gameSession');
let respWids;

beforeEach(() => {
  const resp = {data: []};
  respWids = {data: [{id: 1}]};
  MockGameSessionService.getReport.mockResolvedValue(resp);
  MockGameSessionService.getSessions.mockResolvedValue(resp);
  localStorage.setItem('user', JSON.stringify(user));
});

afterEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});

describe('<ViewReportPage />', () => {
  let wrapper;

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
      wrapper = null;
    }
  })

  describe('successful response data', () => {
    beforeEach(async () => {
      // const resp = {data: []};
      // axios.get.mockResolvedValue(resp);
      await act(async () => {
          wrapper = mount(
            <BrowserRouter>
              <ViewReportPage />
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
      expect(wrapper.text()).toContain('Viewing Report');
    });
  });

  describe('invalid response data', () => {
    it('should show errors', async () => {
      const err = new Error('test error');
      MockGameSessionService.getSessions.mockRejectedValue(err);
      const spy = jest.spyOn(alertService, 'alert');
      await act(async () => {
          wrapper = mount(
            <BrowserRouter>
              <ViewReportPage />
            </BrowserRouter>,
          );
      });

      expect(spy).toBeCalledTimes(1);
    });
  });

  describe('getReport', () => {
    let promise;
    beforeEach(async () => {
      MockGameSessionService.getSessions.mockResolvedValue(respWids);
      MockGameSessionService.getReport.mockResolvedValue(respWids);
      await act(async () => {
        wrapper = mount(
          <BrowserRouter>
            <ViewReportPage />
          </BrowserRouter>,
        );
      });
      promise = Promise.resolve();
    });
    it('should initially call gameSessionService getReport', async () => {
      await act(() => promise);
      expect(MockGameSessionService.getReport).toHaveBeenCalled();
    });
    it('should call alert service on invalid getReport call', async () => {
      MockGameSessionService.getReport.mockRejectedValue({message: 'error happend'});
      let alertSpy = jest.spyOn(alertService, 'alert');
      await act(async () => {
        wrapper = mount(
          <BrowserRouter>
            <ViewReportPage />
          </BrowserRouter>,
        );
      });
      await act(() => promise);
      expect(alertSpy).toHaveBeenCalled();
    });
  });
});
