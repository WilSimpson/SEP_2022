import React from 'react';
import '../../setupTests';
import {shallow, mount} from 'enzyme';
import GameCode from './gameCode';
import '@testing-library/jest-dom/extend-expect';
import {render, fireEvent, waitFor} from '@testing-library/react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import MockGamePlayService from '../../services/gameplay';
import { Alert } from '@mui/material';

const mockedNavigate = jest.fn();

jest.mock('../../services/gameplay');

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom")), 
  useNavigate: () => mockedNavigate,
}));

afterEach(() => {
  jest.restoreAllMocks();
});

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

  describe('join game with 6 digit code', () => {
    describe('on success', () => {
      it('should call joinGame if join code is 6 digits', async () => {
        let wrapper;
        let joinCode = '123456';
        const promise = Promise.resolve();
        MockGamePlayService.joinGame.mockResolvedValue({});
        await act(async () => {
          wrapper = mount(
            <BrowserRouter>
              <GameCode joinCode={joinCode} />
            </BrowserRouter>
          );
        });
        await act(() => promise);
        expect(MockGamePlayService.joinGame).toHaveBeenCalledWith(joinCode); 
      });

      it('should navigate', async () => {
        let wrapper;
        let joinCode = '123456';
        const promise = Promise.resolve();
        MockGamePlayService.joinGame.mockResolvedValue({});
        await act(async () => {
          wrapper = mount(
            <BrowserRouter>
              <GameCode joinCode={joinCode} />
            </BrowserRouter>
          );
        });
        await act(() => promise);
        expect(mockedNavigate).toHaveBeenCalled();
      });
    });
    describe('on failure', () => {
      it ('should give error message on status 404', async () => {
        let wrapper;
        let joinCode = '123456';
        const promise = Promise.resolve();
        MockGamePlayService.joinGame.mockRejectedValue({response: {status: 404}});
        await act(async () => {
          wrapper = mount(
            <BrowserRouter>
              <GameCode joinCode={joinCode} />
            </BrowserRouter>
          );
        });
        await act(() => promise);
        wrapper.update();
        expect(wrapper.find(Alert).prop('children')).toEqual(
          'There was an unexpected error reaching the server. ' +
          'Please try again later.'
        );
      });

      it ('should give error message on status 500', async () => {
        let wrapper;
        let joinCode = '123456';
        const promise = Promise.resolve();
        MockGamePlayService.joinGame.mockRejectedValue({response: {status: 500, data: 'test-error'}});
        await act(async () => {
          wrapper = mount(
            <BrowserRouter>
              <GameCode joinCode={joinCode} />
            </BrowserRouter>
          );
        });
        await act(() => promise);
        wrapper.update();
        expect(wrapper.find(Alert).prop('children')).toEqual('test-error');
      });

      it ('should give error message on unknown status', async () => {
        let wrapper;
        let joinCode = '123456';
        const promise = Promise.resolve();
        MockGamePlayService.joinGame.mockRejectedValue({response: {status: 700}});
        await act(async () => {
          wrapper = mount(
            <BrowserRouter>
              <GameCode joinCode={joinCode} />
            </BrowserRouter>
          );
        });
        await act(() => promise);
        wrapper.update();
        expect(wrapper.find(Alert).prop('children')).toEqual(
          'The server is currently unreachable. ' +
          'Please try again later.'
        );
      });
    });
  });
  describe('join game with 6 non-digits or less than 6 digits', () => {
    it('should NOT call joinGame if join code is 6 non-digits', async () => {
      let wrapper;
      let joinCode = 'gohawk';
      const promise = Promise.resolve();
      MockGamePlayService.joinGame.mockResolvedValue({});
      await act(async () => {
        wrapper = mount(
          <BrowserRouter>
            <GameCode joinCode={joinCode} />
          </BrowserRouter>
        );
      });
      await act(() => promise);
      expect(MockGamePlayService.joinGame).not.toHaveBeenCalled(); 
    });
    it('should display error message if code 6 non-digits', async () => {
      let wrapper;
      let joinCode = 'gohawk';
      const promise = Promise.resolve();
      MockGamePlayService.joinGame.mockResolvedValue({});
      await act(async () => {
        wrapper = mount(
          <BrowserRouter>
            <GameCode joinCode={joinCode} />
          </BrowserRouter>
        );
      });
      await act(() => promise);
      wrapper.update();
      expect(wrapper.find(Alert).prop('children')).toEqual(
        'This Gamecode is not valid. ' +
        'Gamecodes must contain only number values.'
      );
    });
    it ('should display error message if code is less than 6 digits', async () => {
      let wrapper;
      let joinCode = '12345';
      await act(async () => {
        wrapper = mount(
          <BrowserRouter>
            <GameCode joinCode={joinCode} />
          </BrowserRouter>
        );
      });
      wrapper.update();
      expect(wrapper.find(Alert).prop('children')).toEqual(
        'This Gamecode is not valid. Gamecodes must be six digits long.'
      );
    });
  });

});
