import '../../../setupTests';
import React from 'react';
import StartGameSessionPage from './startGameSession';
import SessionStart from '../../../components/faculty/sessionStart';
import {User} from '../../../models/user';
import {mount} from 'enzyme';
import {act} from 'react-dom/test-utils';
import {BrowserRouter} from 'react-router-dom';
import {alertService} from '../../../services/alert';
import MockGameSessionService from '../../../services/gameSession';
import {expect} from '@jest/globals';


const mockedNavigate = jest.fn();

jest.mock('../../../services/gameSession');

const user = new User(
  'email@example.com',
  'FirstName',
  'LastName',
  'ADMIN',
  'token',
  1,
);

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom")), 
  useNavigate: () => mockedNavigate,
}));

beforeEach(() => {
  localStorage.setItem('user', JSON.stringify(user));
});

afterEach(() => {
  localStorage.clear();
});

describe('<StartGameSessionPage />', () => {
  it ('should render Session Start component', () => {
    const wrapper = mount(
      <BrowserRouter>
        <StartGameSessionPage />
      </BrowserRouter>
    );
    const sessionStart = wrapper.find(SessionStart).first();
    expect (sessionStart.exists()).toBe(true);
  });
  describe('SessionStart prop functions', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(
        <BrowserRouter>
          <StartGameSessionPage />
        </BrowserRouter>
      );
    });
    describe('onCancel functionality', () => {
      it ('should navigate to adminDash onCancel when user is Admin', () => {
        act(() => {wrapper.find(SessionStart).first().props().onCancel()});
        expect(mockedNavigate).toHaveBeenCalledWith('/admin-dashboard');
      });
      it ('should navigate to facultyDash onCancel when user is Faculty', () => {
        let tempUser = JSON.parse(localStorage.getItem('user'));
        tempUser.role = 'FACULTY';
        localStorage.setItem('user', JSON.stringify(tempUser));
        act(() => {wrapper.find(SessionStart).first().props().onCancel()});
        expect(mockedNavigate).toHaveBeenCalledWith('/faculty-dashboard');
      });
      it ('should call alert Service onCancel', () => {
        let alertSpy = jest.spyOn(alertService, 'alert');
        act(() => {wrapper.find(SessionStart).first().props().onCancel()});
        expect(alertSpy).toHaveBeenCalled();
      });
    });

    describe('onSubmit functionality', () => {
      describe('on Success', () => {
        it ('should call createGameSession onSubmit success', async () => {
          const promise = Promise.resolve();
          MockGameSessionService.createGameSession.mockResolvedValue({data: {code: 123456}});
          act(() => {wrapper.find(SessionStart).props().onSubmit()});
          await act(() => promise);
          expect(MockGameSessionService.createGameSession).toHaveBeenCalled();
        });
        it ('should navigate to adminDash onSubmit success and user admin', async () => {
          const promise = Promise.resolve();
          MockGameSessionService.createGameSession.mockResolvedValue({data: {code: 123456}});
          act(() => {wrapper.find(SessionStart).props().onSubmit()});
          await act(() => promise);
          expect(mockedNavigate).toHaveBeenCalledWith('/admin-dashboard');
        });
        it ('should navigate to facultyDash onSubmit success and user faculty', async () => {
          let tempUser = JSON.parse(localStorage.getItem('user'));
          tempUser.role = 'FACULTY';
          localStorage.setItem('user', JSON.stringify(tempUser));
          const promise = Promise.resolve();
          MockGameSessionService.createGameSession.mockResolvedValue({data: {code: 123456}});
          act(() => {wrapper.find(SessionStart).props().onSubmit()});
          await act(() => promise);
          expect(mockedNavigate).toHaveBeenCalledWith('/faculty-dashboard');
        });
        it ('should call alert Service', async () => {
          let alertSpy = jest.spyOn(alertService, 'alert');
          const promise = Promise.resolve();
          MockGameSessionService.createGameSession.mockResolvedValue({data: {code: 123456}});
          act(() => {wrapper.find(SessionStart).props().onSubmit()});
          await act(() => promise);
          expect(alertSpy).toHaveBeenCalled();
        });
      });
      describe('on Failure', () => {
        it ('should call alert Service', async () => {
          let alertSpy = jest.spyOn(alertService, 'alert');
          const promise = Promise.resolve();
          const err = new Error('test error');
          MockGameSessionService.createGameSession.mockRejectedValue(err);
          act(() => {wrapper.find(SessionStart).props().onSubmit()});
          await act(() => promise);
          expect(alertSpy).toHaveBeenCalled();
        });
      });
    });
  });
});