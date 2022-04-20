import React from 'react';
import '../../setupTests';
import {render, unmountComponentAtNode} from 'react-dom';
import {act} from 'react-dom/test-utils';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {getByTestId} from '@testing-library/react';
import GameInProgressAlert from './gameInProgressAlert';
import {mount} from 'enzyme';
import MockGamePlayService from '../../services/gameplay';
import {expect} from '@jest/globals';

let container = null;

const mockedNavigate = jest.fn();

jest.mock('../../services/gameplay');

let state = {
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
};

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom")), 
  useNavigate: () => mockedNavigate,
}));

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
  act(() => {
    render(
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<GameInProgressAlert />} />
          </Routes>
        </BrowserRouter>,
        container,
    );
  });
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe('<GameInProgressAlert />', () => {
  it('should have the correct text content', () => {
    expect(container.textContent).toContain(
      'You have a game currently in progress. Would you like to join this game?',
    );
  });
  it('should have a button to join in progress game', () => {
    let joinButton = getByTestId(container, 'joinGame');
    expect(joinButton).not.toBeDisabled();
  });

  it ('should call getInProgress game when clicked', () => {
    let spy = jest.spyOn(MockGamePlayService, 'getInProgressGame').mockImplementation(
      () => state
    );
    let wrapper = mount(<BrowserRouter><GameInProgressAlert /></BrowserRouter>);
    wrapper.find('#joinGame').hostNodes().simulate('click');
    expect(spy).toHaveBeenCalled();
  });
  
  it ('should call navigate when clicked', () => {
    jest.spyOn(MockGamePlayService, 'getInProgressGame').mockImplementation(
      () => state
    );
    let wrapper = mount(<BrowserRouter><GameInProgressAlert /></BrowserRouter>);
    wrapper.find('#joinGame').hostNodes().simulate('click');
    expect(mockedNavigate).toHaveBeenCalled();
  });
});
