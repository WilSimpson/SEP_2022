import React from 'react';
import {render, unmountComponentAtNode} from 'react-dom';
import {act} from 'react-dom/test-utils';
import Home from './home';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

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

describe('<Home />', () => {
  it('Should have correct text content', () => {
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
    expect(container.textContent).toContain(
        'To join a game, enter your 6-digit game code',
    );
  });
});
