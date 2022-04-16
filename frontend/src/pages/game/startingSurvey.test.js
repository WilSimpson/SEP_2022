import React from 'react';
import '../../setupTests';
import {shallow} from 'enzyme';
import StartingSurvey from './startingSurvey';
import '@testing-library/jest-dom/extend-expect';
import {fireEvent, getByTestId} from '@testing-library/react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {render, unmountComponentAtNode} from 'react-dom';
import {act} from 'react-dom/test-utils';
import {inProgressGame} from '../../helpers/dummyData';

let container = null;

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    state: {
      code: '123456',
      game: {},
    },
  }),
}));

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
  localStorage.setItem('inProgress', JSON.stringify(inProgressGame));
  act(() => {
    render(
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<StartingSurvey />} />
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


describe('<StartingSurvey />', () => {

  it('should render the StartingSurvey component', () => {
    expect(
        shallow(
            <BrowserRouter>
              <Routes>
                <Route path="*" element={<StartingSurvey />} />
              </Routes>
            </BrowserRouter>,
        ),
    );
  });

  it('should route towards the game session', () => {
    const submit = getByTestId(container, 'submit');
    expect(submit).toBeInTheDocument();
    fireEvent.click(submit);
    expect(submit).toBeInTheDocument();
  });

  it('should display alert text about in progress game when game in localStorage', () => {
    expect(container.textContent).toContain(
      'You have a game currently in progress. Would you like to join this game?',
    );
  });

  it('should NOT display alert text about in progress game when it is for a different game session', () => {
    inProgressGame.state.code = '654321';
    localStorage.setItem('inProgress', JSON.stringify(inProgressGame));
    act(() => {
      render(
          <BrowserRouter>
            <Routes>
              <Route path="*" element={<StartingSurvey />} />
            </Routes>
          </BrowserRouter>,
          container,
      );
    });
    expect(container.textContent).not.toContain(
      'You have a game currently in progress. Would you like to join this game?',
    );
  });

  it('should NOT display alert text about in progress game when game not in localStorage', () => {
    localStorage.removeItem('inProgress');
    act(() => {
      render(
          <BrowserRouter>
            <Routes>
              <Route path="*" element={<StartingSurvey />} />
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
