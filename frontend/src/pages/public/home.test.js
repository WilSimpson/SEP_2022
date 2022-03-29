import React from 'react';
import {render, unmountComponentAtNode} from 'react-dom';
import {act} from 'react-dom/test-utils';
import Home from './home';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

let container = null;
const inProgressGame = {
  state: {
    code: '123456',
    currentQuestion: {
      id: 1,
      value: "Question 1",
      passcode: "123456",
      chance: false,
      chance_game: "NO_GAME",
      game: '1'
    },
    team_id: 1,
    game: {
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
      ]
    },
  },
};


beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
  localStorage.setItem('inProgress', inProgressGame);
  act(() => {
    render(
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<Home />} />
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
  localStorage.removeItem('inProgress');
});

describe('<Home />', () => {
  it('Should have correct text content', () => {
    expect(container.textContent).toContain(
        'To join a game, enter your 6-digit game code',
    );
  });
  it('should display alert text about in progress game when game in localStorage', () => {
    expect(container.textContent).toContain(
      'You have a game currently in progress. Would you like to join this game?',
    );
  });
  it('should NOT display alert text about in progress game when game not in localStorage', () => {
    localStorage.removeItem('inProgress');
    act(() => {
      render(
          <BrowserRouter>
            <Routes>
              <Route path="*" element={<Home />} />
            </Routes>
          </BrowserRouter>,
          container,
      );
    });
    expect(container.textContent).not.toContain(
      'You have a game currently in progress. Would you like to join this game?',
    );
  });
});
