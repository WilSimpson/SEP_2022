import React from 'react';
import '../../setupTests';
import {mount} from 'enzyme';
import StartingSurvey from './startingSurvey';
import '@testing-library/jest-dom/extend-expect';
import {BrowserRouter} from 'react-router-dom';
import {act} from 'react-dom/test-utils';
import {inProgressGame} from '../../helpers/dummyData';
import MockGamePlayService from '../../services/gameplay';
import {Alert} from '@mui/material';

let container = null;

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    state: {
      code: '123456',
      game: {
        questions: [{
          id: 1,
          value: 'Question 1',
          passcode: '123456',
          chance: false,
          chance_game: 'NO_GAME',
          game: '1',
          help: [],
        },],
        options: [{
          id: 1,
          value: 'Option 1',
          dest_question: 2,
          source_question: 1,
          weight: 1,
        },],
      },
    },
  }),
  useNavigate: () => mockedNavigate,
}));

jest.mock('../../services/gameplay');

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
  localStorage.setItem('inProgress', JSON.stringify(inProgressGame));
});

afterEach(() => {
  localStorage.removeItem('inProgress');
});


describe('<StartingSurvey />', () => {

  it('should render the StartingSurvey component', () => {
    let wrapper = mount(<BrowserRouter><StartingSurvey /></BrowserRouter>);
    expect (wrapper);
  });
  
  describe('handleSubmit()', () => {
    describe('on success', () => {
      it('should call sendTeamInit in GamePlayService', async () => {
        const event = { preventDefault: () => {} };
        jest.spyOn(event, 'preventDefault');
        let wrapper = mount(<BrowserRouter><StartingSurvey /></BrowserRouter>);
        const promise = Promise.resolve();
        MockGamePlayService.sendTeamInit.mockResolvedValue({});
        act(() => {wrapper.find('form').simulate('submit', event)});
        await act(() => promise);
        expect(event.preventDefault).toHaveBeenCalled();
        expect(MockGamePlayService.sendTeamInit).toHaveBeenCalled();
      });
      it('should call setInProgressGame in GamePlayService', async () => {
        const event = { preventDefault: () => {} };
        jest.spyOn(event, 'preventDefault');
        let wrapper = mount(<BrowserRouter><StartingSurvey /></BrowserRouter>);
        const promise = Promise.resolve();
        MockGamePlayService.sendTeamInit.mockResolvedValue({});
        act(() => {wrapper.find('form').simulate('submit', event)});
        await act(() => promise);
        expect(event.preventDefault).toHaveBeenCalled();
        expect(MockGamePlayService.setInProgressGame).toHaveBeenCalledTimes(1);
      });
      it('should navigate to /gameSession', async () => {
        const event = { preventDefault: () => {} };
        jest.spyOn(event, 'preventDefault');
        let wrapper = mount(<BrowserRouter><StartingSurvey /></BrowserRouter>);
        const promise = Promise.resolve();
        MockGamePlayService.sendTeamInit.mockResolvedValue({});
        act(() => {wrapper.find('form').simulate('submit', event)});
        await act(() => promise);
        expect(event.preventDefault).toHaveBeenCalled();
        expect(mockedNavigate).toHaveBeenCalled();
      });  
    });
    describe('on fail', () => {
      let wrapper;
      let event;
      let promise;
      beforeEach(() => {
        wrapper = mount(<BrowserRouter><StartingSurvey /></BrowserRouter>);
        event = { preventDefault: () => {} };
        promise = Promise.resolve();
      });
      it ('should display error message on status 404', async () => {
        MockGamePlayService.sendTeamInit.mockRejectedValue({response: {status: 404}});
        act(() => {wrapper.find('form').simulate('submit', event)});
        await act(() => promise);
        wrapper.update();
        expect(wrapper.find(Alert).prop('children')).toEqual(
          'There was an unexpected error reaching the server. ' +
          'Please try again later.'
        );
      });
      it ('should display error message on status 500', async () => {
        MockGamePlayService.sendTeamInit.mockRejectedValue({response: {status: 500, data: 'test-error'}});
        act(() => {wrapper.find('form').simulate('submit', event)});
        await act(() => promise);
        wrapper.update();
        expect(wrapper.find(Alert).prop('children')).toEqual('test-error');
      });
      it ('should display error message on unknown error', async () => {
        MockGamePlayService.sendTeamInit.mockRejectedValue({response: {status: 700}});
        act(() => {wrapper.find('form').simulate('submit', event)});
        await act(() => promise);
        wrapper.update();
        expect(wrapper.find(Alert).prop('children')).toEqual(
          'The server is unreachable at this time. ' +
          'Please try again later.'
        );
      });
    });
  });
  describe('handleOnChange()', () => {
    it('should loop through form Values', () => {
      const event = {
        preventDefault() {},
        target: { value: 'the-value' }
      };
      let mapSpy = jest.spyOn(Object, 'entries');
      let wrapper = mount(<BrowserRouter><StartingSurvey /></BrowserRouter>);
      act(() => {wrapper.find('#team-size').hostNodes().simulate('change', event)});
      expect(mapSpy).toHaveBeenCalledTimes(1);
    });
  });
});
