import React from 'react';
import '../../setupTests';
import {render, unmountComponentAtNode} from 'react-dom';
import {act} from 'react-dom/test-utils';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {getByTestId} from '@testing-library/react';
import GameInProgressAlert from './gameInProgressAlert';

let container = null;

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
});
