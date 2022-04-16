import React from 'react';
import '../../setupTests';
import {render, unmountComponentAtNode} from 'react-dom';
import {act} from 'react-dom/test-utils';
import {getByTestId} from '@testing-library/react';
import GameNav from './gameNav';

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

describe('<GameNav />', () => {
  it('Should have non-disabled button', () => {
    act(() => {
      render(<GameNav />, container);
    });
    let homeButton = getByTestId(container, 'home-button');
    expect(homeButton).not.toBeDisabled();
  });
});
