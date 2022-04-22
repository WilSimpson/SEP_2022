import React from 'react';
import '../../setupTests';
import {shallow} from 'enzyme';
import {render} from 'react-dom';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {act} from 'react-dom/test-utils';
import EndGamePlay from './endGamePlay';
import {getByTestId} from '@testing-library/react';



let container = null;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

describe('<EndGamePlay />', () => {
  beforeEach(() => {
    act(() => {
      render(
          <BrowserRouter>
            <Routes>
              <Route path="*" element={<EndGamePlay />} />
            </Routes>
          </BrowserRouter>,
          container,
      );
    });
  });

  it('should render', () => {
    shallow(
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<EndGamePlay />} />
        </Routes>
      </BrowserRouter>,
    );
  });

  it('should have correct text content', () => {
    expect(container.textContent).toContain(
      'Thank you for playing',
    );
    expect(container.textContent).toContain(
      'Your game path has been recorded!',
    );
  });

  it('should have a Return Home button enabled', () => {
    expect(container.textContent).toContain(
      'Return Home',
    );
    let returnHomeButton = getByTestId(container, 'return-home');
    expect(returnHomeButton).not.toBeDisabled();
  });
});