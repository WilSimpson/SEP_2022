import React from 'react';
import '@testing-library/jest-dom';
import GameSession from './gameSession';
import {shallow} from 'enzyme';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {render, unmountComponentAtNode} from 'react-dom';
import {act} from 'react-dom/test-utils';
import {findByTestId, fireEvent, getByTestId, waitFor} from '@testing-library/react';
import {inProgressGame} from '../../helpers/dummyData';
import GamePlayService from '../../services/gameplay';
import GamePlayTimeout from './gamePlayTimeout';

const TEAM_ID = 1;

jest.mock('../../services/gameplay');

// const mockSetTimeout = jest.fn();
// jest.mock('react', () => ({
//   useState: timeoutOpen => [timeoutOpen, mockSetTimeout]
// }));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    state: {
      pathname: 'localhost:3000/gameSession',
      code: '123456',
      currentQuestion: {
        id: 1,
        value: "Question 1",
        passcode: "123456",
        chance: false,
        chance_game: "NO_GAME",
        game: '1'
      },
      team_id: TEAM_ID,
      game: {
          id: 1,
          title: "TestGame",
          creator_id: 1,
          code: 123456,
          active: true,
          questions: [
            {
              id: 1,
              value: "Question 1",
              passcode: "123456",
              chance: false,
              chance_game: "NO_GAME",
              game: '1'
            },
            {
              id: 2,
              value: "Question 2",
              passcode: "123456",
              chance: true,
              chance_game: "NO_GAME",
              game: '1'
            },
            {
              id: 3,
              value: "Question 3",
              passcode: "123456",
              chance: false,
              chance_game: "NO_GAME",
              game: '1'
            },
          ],
          options: [
            {
              id: 1,
              value: 'Option 1',
              dest_question: 2,
              source_question: 1,
              weight: 1,
            },
            {
              id: 2,
              value: 'Option 2',
              dest_question: 3,
              source_question: 1,
              weight: 1,
            },
            {
                id: 3,
                value: 'Option 3',
                des_question: 3,
                source_question: 2,
                weight: 1,
            },
            {
              id: 4,
              value: 'Option 4',
              des_question: 3,
              source_question: 2,
              weight: 1,
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
  GamePlayService.getInProgressGame.mockReturnValue(inProgressGame);
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
  let chanceButton;

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
  describe('Game Play', () => {
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
  
      fireEvent.click(option1);
      fireEvent.click(continueButton);
      expect(GamePlayService.answerQuestion).toHaveBeenCalled();
      await act(() => promise);
    });
    it('should change the text on the screen when "Continue" button clicked', async () => {
      expect(container.textContent).toContain(
          'Question 1',
      );
      const promise = Promise.resolve();
      GamePlayService.answerQuestion.mockResolvedValue({
        response: jest.fn(() => promise),
      });
  
      fireEvent.click(option1);
      fireEvent.click(continueButton);
      await waitFor(() => {
        expect(container.textContent).toContain(
          'Question 2',
        );
      });
    });
    it('should call updateCurrentQuestion when "Continue" button clicked', async () => {
      const promise = Promise.resolve();
      GamePlayService.answerQuestion.mockResolvedValue({
        response: jest.fn(() => promise),
      });
      GamePlayService.updateCurrentQuestion.mockResolvedValue({
        response: jest.fn(),
      });
      fireEvent.click(option1);
      fireEvent.click(continueButton);
      await waitFor(() => {
        expect(GamePlayService.updateCurrentQuestion).toHaveBeenCalled();
      });
    });
  });
  
  describe('Complete Game', () => {
    let completeButton;
    beforeEach(async () => {
      // to get to the last page
      const promise = Promise.resolve();
      GamePlayService.answerQuestion.mockResolvedValue({
        response: jest.fn(() => promise),
      });
      fireEvent.click(option2);
      fireEvent.click(continueButton);
      completeButton = await findByTestId(container, 'complete');
    });
    it ('"Complete" button should exist when on final question page', () => {
      expect(container.textContent).toContain(
        'Complete',
      );
    });
    it('"Complete" button should not be disabled', () => {
      expect(completeButton).not.toBeDisabled();
    });
    it('should call teamCompleteGame when "Complete" button clicked', async () => {
      const promise = Promise.resolve();
      GamePlayService.teamCompleteGame.mockResolvedValue({
        response: jest.fn(() => promise),
      });
  
      fireEvent.click(completeButton);
      expect(GamePlayService.teamCompleteGame).toHaveBeenCalledWith(TEAM_ID);
      await act(() => promise);
    });
  });
  describe('<GameSession />', () => {
    let continueButton;
    let option1;
    let option2;
    let option3;
    let option4;
    let chanceButton;
    beforeEach(async () => {
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
      const promise = Promise.resolve();
      GamePlayService.answerQuestion.mockResolvedValue({
        response: jest.fn(() => promise),
      });
      continueButton = getByTestId(container, 'continue');
      option1 = getByTestId(container, 'option1');
      option2 = getByTestId(container, 'option2');
      fireEvent.click(option1);
      fireEvent.click(continueButton);
      chanceButton = await findByTestId(container, 'chance');
      option3 = getByTestId(container, 'option3');
      option4 = getByTestId(container, 'option4');
    });
    it('should have disabled "Continue" button when option not selected', () => {
      expect(continueButton).toBeDisabled();
    });
    it('option3 should be disabled', () => {
      expect(option3).toBeDisabled();
    });
    it('option4 should be disabled', () => {
      expect(option4).toBeDisabled();
    });
    it('should call random when chance is clicked', () => {
      fireEvent.click(chanceButton);
      expect(GamePlayService.random).toHaveBeenCalled();
    });
  });
});
