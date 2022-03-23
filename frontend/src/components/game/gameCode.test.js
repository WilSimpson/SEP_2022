import React from 'react';
import {shallow} from 'enzyme';
import GameCode from './gameCode';
import '../../setupTests';
import '@testing-library/jest-dom/extend-expect';
import {render, fireEvent} from '@testing-library/react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

describe('<GameCode />', () => {
  it('should render the GameCode component', () => {
    expect(shallow(<GameCode />));
  });

  it('should accept a valid gamecode', () => {
    const {getByTestId} = render(
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<GameCode />} />
          </Routes>
        </BrowserRouter>,
    );
    const codeBox = getByTestId('codeBox');

    expect(codeBox).toBeInTheDocument();
    expect(codeBox.value).toBe('');
    fireEvent.change(codeBox, {target: {value: '123456'}});
    expect(codeBox.value).toBe('123456');
  });

  it('should have a disabled button', () => {
    render(
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<GameCode />} />
          </Routes>
        </BrowserRouter>,
    );
    const submit = document.querySelector('[data-testid=submit]');

    expect(submit).toBeInTheDocument();
    expect(submit.disabled).toBe(true);
  });

  it('should enable button with valid code', () => {
    const {getByTestId} = render(
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<GameCode />} />
          </Routes>
        </BrowserRouter>,
    );
    const codeBox = getByTestId('codeBox');
    const submit = document.querySelector('[data-testid=submit]');

    expect(submit).toBeInTheDocument();
    expect(submit.disabled).toBe(true);

    fireEvent.change(codeBox, {target: {value: '123456'}});
    expect(submit.disabled).toBe(false);
  });

  it('should not enable with no input', () => {
    const {getByTestId} = render(
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<GameCode />} />
          </Routes>
        </BrowserRouter>,
    );
    const codeBox = getByTestId('codeBox');
    const submit = document.querySelector('[data-testid=submit]');

    expect(submit).toBeInTheDocument();
    expect(submit.disabled).toBe(true);

    fireEvent.change(codeBox, {target: {value: ''}});
    expect(submit.disabled).toBe(true);
  });

  it('should not enable non-numerical input', () => {
    const {getByTestId} = render(
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<GameCode />} />
          </Routes>
        </BrowserRouter>,
    );
    const codeBox = getByTestId('codeBox');
    const submit = document.querySelector('[data-testid=submit]');

    expect(submit).toBeInTheDocument();
    expect(submit.disabled).toBe(true);

    fireEvent.change(codeBox, {target: {value: 'Hello'}});
    expect(submit.disabled).toBe(true);
  });

  it('should not enable with input shorter than 6', () => {
    const {getByTestId} = render(
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<GameCode />} />
          </Routes>
        </BrowserRouter>,
    );
    const codeBox = getByTestId('codeBox');
    const submit = document.querySelector('[data-testid=submit]');

    expect(submit).toBeInTheDocument();
    expect(submit.disabled).toBe(true);

    fireEvent.change(codeBox, {target: {value: '12345'}});
    expect(submit.disabled).toBe(true);
  });
});