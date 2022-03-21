import React from 'react';
import GameSession from './gameSession';
import {shallow} from 'enzyme';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {render, unmountComponentAtNode} from 'react-dom';
import {act} from 'react-dom/test-utils';
import {fireEvent, getByTestId} from '@testing-library/react';
import GamePlayService from '../../services/gameplay';

jest.mock('../../services/gameplay');

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    state: {
      pathname: 'localhost:3000/gameSession',
      code: '123456',
      game: {
        id: 1,
        title: 'TestGame',
        creator_id: 1,
        code: 123456,
        active: true,
        questions: [
          {
            id: 1,
            value: 'Question 1',
            passcode: '123456',
            chance: false,
            chance_game: 'NO_GAME',
            game: '1',
          },
          {
            id: 2,
            value: 'Question 2',
            passcode: '123456',
            chance: false,
            chance_game: 'NO_GAME',
            game: '1',
          },
        ],
        options: [
          {
            id: 1,
            value: 'Option 1',
            dest_question: 2,
            source_question: 1,
          },
          {
            id: 2,
            value: 'Option 2',
            dest_question: 2,
            source_question: 1,
          },
        ],
      },
      formValue: null,
    },
  }),
}));

let container = null;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe('<GameSession />', () => {
  let continueButton;
  let option1;
  let option2;

  beforeEach(() => {
    act(() => {
      render(
          <BrowserRouter>
            <Routes>
              <Route path="*" element={<GameSession />} />
            </Routes>
          </BrowserRouter>,
          container,
      );
    });
    continueButton = getByTestId(container, 'continue');
    option1 = getByTestId(container, 'option1');
    option2 = getByTestId(container, 'option2');
  });

  it('should render', () => {
    shallow(
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<GameSession />} />
          </Routes>
        </BrowserRouter>,
    );
  });
  it('should have correct text content', () => {
    expect(container.textContent).toContain(
        'Question 1',
    );
  });
  it('should have disabled "Continue" button when option not selected', () => {
    expect(continueButton).toBeDisabled();
  });
  it('should not have disabled "Continue" button after option1 selected', () => {
    fireEvent.click(option1);
    expect(continueButton).not.toBeDisabled();
  });
  it('should not have disabled "Continue" button after option2 selected', () => {
    fireEvent.click(option2);
    expect(continueButton).not.toBeDisabled();
  });
  it('should call answerQuestion when "Continue" button clicked', async () => {
    const promise = Promise.resolve();
    GamePlayService.answerQuestion.mockResolvedValue({
      response: jest.fn(() => promise),
    });

    fireEvent.click(option2);
    fireEvent.click(continueButton);
    expect(GamePlayService.answerQuestion).toHaveBeenCalled();
    await act(() => promise);
  });
  it('should change the text on the screen when "Continue" button clicked', () => {
    expect(container.textContent).toContain(
        'Question 1',
    );
    const promise = Promise.resolve();
    GamePlayService.answerQuestion.mockResolvedValue({
      response: jest.fn(() => promise),
    });

    fireEvent.click(option2);
    fireEvent.click(continueButton);
    expect(container.textContent).toContain(
        'Question 2',
    );
    expect(continueButton).toBeDisabled();
  });
});
