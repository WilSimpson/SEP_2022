import React from 'react';
import '../../setupTests';
import GameSessionsTable from './gameSessionsTable';
import {mount} from 'enzyme';
import {User} from '../../models/user';
import {act} from 'react-dom/test-utils';
import {BrowserRouter} from 'react-router-dom';
import { TablePagination } from '@mui/material';
import {expect} from '@jest/globals';

const user = new User(
    'email@example.com',
    'FirstName',
    'LastName',
    'ADMIN',
    'token',
    1,
);

const sessions = [
  {
    'code': 251772,
    'created_at': "2022-03-30T07:41:32.910199Z",
    'creator_id': 2,
    'end_time': null,
    'game': 7,
    'id': 3,
    'notes': "New notes",
    'start_time': "2022-03-30T07:41:32.908204Z",
    'timeout': 30,
    'updated_at': "2022-03-30T07:41:32.910",
    'courseID': 1,
    'isGuest': false,
  },
  
]

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

  it('should handle qr code button correctly', async () => {
    let wrapper;
    const handleCallback = jest.fn();
    await act(async () => {
      wrapper = mount(<BrowserRouter><GameSessionsTable qrCodes onQRCodeButtonClicked={handleCallback} gameSessions={sessions}/></BrowserRouter>);
      wrapper.find({'data-testid': `qrcode-download-button-${sessions[0].id}`}).hostNodes().simulate('click');
    });

    expect(handleCallback).toHaveBeenCalled();
  });

  describe('change page', () => {
    it('should change page size', async () => {
      let wrapper;
      let promise = Promise.resolve();
      await act(async () => {
        wrapper = mount(<BrowserRouter><GameSessionsTable qrCodes gameSessions={sessions}/></BrowserRouter>);
      });
      await act(() => promise);
      act(() => {wrapper.find(TablePagination).props().onRowsPerPageChange({target: {value: 1}})});
      wrapper.update();
      expect(wrapper.find(TablePagination).props().rowsPerPage).toBe(1);
    });

    it('should change page', async () => {
      let wrapper;
      let promise = Promise.resolve();
      await act(async () => {
        wrapper = mount(<BrowserRouter><GameSessionsTable qrCodes gameSessions={sessions}/></BrowserRouter>);
      });
      await act(() => promise);
      act(() => {wrapper.find(TablePagination).props().onRowsPerPageChange({target: {value: 0}})});
      act(() => {wrapper.find(TablePagination).props().onPageChange({target: {value: ''}}, 1)});
      wrapper.update();
      expect(wrapper.find(TablePagination).props().page).toBe(1);
    });
  });
  describe('checkbox change', () => {
    it ('when checkbox change function runs should set checked to true', async () => {
      let myFn = jest.fn();
      let wrapper;
      let promise = Promise.resolve();
      await act(async () => {
        wrapper = mount(<BrowserRouter><GameSessionsTable qrCodes selectable gameSessions={sessions} onSessionSelectionChange={myFn}/></BrowserRouter>);
      });
      await act(() => promise);
      wrapper.find('#checkbox3').hostNodes().simulate('change', 3);
      expect(myFn).toHaveBeenCalled();
      wrapper.update();
      expect(wrapper.find('#checkbox3').hostNodes().props().checked).toBe(true);
    });
    it ('when checkbox checked and change function runs should set checked to false', async () => {
      let myFn = jest.fn();
      let wrapper;
      let promise = Promise.resolve();
      await act(async () => {
        wrapper = mount(<BrowserRouter><GameSessionsTable qrCodes selectable gameSessions={sessions} onSessionSelectionChange={myFn}/></BrowserRouter>);
      });
      await act(() => promise);
      wrapper.find('#checkbox3').hostNodes().simulate('change', 3);
      wrapper.update();
      expect(wrapper.find('#checkbox3').hostNodes().props().checked).toBe(true);
      wrapper.find('#checkbox3').hostNodes().simulate('change', 3);
      wrapper.update();
      expect(wrapper.find('#checkbox3').hostNodes().props().checked).toBe(false);
    });
  });

  describe('main checkbox change', () => {
    it ('should call prop function onSessionSelectionChange', async () => {
      let myFn = jest.fn();
      let wrapper;
      let promise = Promise.resolve();
      await act(async () => {
        wrapper = mount(<BrowserRouter><GameSessionsTable qrCodes selectable gameSessions={sessions} onSessionSelectionChange={myFn}/></BrowserRouter>);
      });
      await act(() => promise);
      wrapper.find('#main-checkbox').hostNodes().simulate('change', {target:{checked: true}});
      expect(myFn).toHaveBeenCalled();
    });

    it ('should check all checkboxes if not checked', async () => {
      let myFn = jest.fn();
      let wrapper;
      let promise = Promise.resolve();
      await act(async () => {
        wrapper = mount(<BrowserRouter><GameSessionsTable qrCodes selectable gameSessions={sessions} onSessionSelectionChange={myFn}/></BrowserRouter>);
      });
      await act(() => promise);
      expect(wrapper.find('#checkbox3').hostNodes().props().checked).toBe(false);
      wrapper.find('#main-checkbox').hostNodes().simulate('change', {target:{checked: true}});
      wrapper.update();
      expect(wrapper.find('#checkbox3').hostNodes().props().checked).toBe(true);
    });

    it ('should uncheck checkboxes if checked', async () => {
      let myFn = jest.fn();
      let wrapper;
      let promise = Promise.resolve();
      await act(async () => {
        wrapper = mount(<BrowserRouter><GameSessionsTable qrCodes selectable gameSessions={sessions} onSessionSelectionChange={myFn}/></BrowserRouter>);
      });
      await act(() => promise);
      wrapper.find('#checkbox3').hostNodes().simulate('change', 3);
      wrapper.update();
      expect(wrapper.find('#checkbox3').hostNodes().props().checked).toBe(true);
      wrapper.find('#main-checkbox').hostNodes().simulate('change', {target:{checked: false}});
      wrapper.update();
      expect(wrapper.find('#checkbox3').hostNodes().props().checked).toBe(false);
    });
  });

  describe('report buttons', () => {
    it ('should call prop function onReportButtonClicked when clicked', async () => {
      let myFn = jest.fn();
      let wrapper;
      let promise = Promise.resolve();
      await act(async () => {
        wrapper = mount(<BrowserRouter><GameSessionsTable reportButtons qrCodes gameSessions={sessions} onReportButtonClicked={myFn}/></BrowserRouter>);
      });
      await act(() => promise);
      wrapper.find('#report-button').hostNodes().simulate('click');
      expect(myFn).toHaveBeenCalled();
    });
  });
});
