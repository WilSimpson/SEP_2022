import React from 'react';
import '../../setupTests';
import {render, unmountComponentAtNode} from 'react-dom';
import {act} from 'react-dom/test-utils';
import StickyFooter from './footer';



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

describe('<StickyFooter />', () => {
  it('Should have correct text content', () => {
    act(() => {
      render(<StickyFooter />, container);
    });
    expect(container.textContent).toBe('Copyright © Ethics Adventure 2022.');
  });
});
