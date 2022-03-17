import React from 'react';
import {shallow} from 'enzyme';
import StartingSurvey from '../components/game/startingSurvey';
import '../setupTests';
import '@testing-library/jest-dom/extend-expect';
import {render, fireEvent} from '@testing-library/react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

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
    render(
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<StartingSurvey />} />
          </Routes>
        </BrowserRouter>,
    );
    const submit = document.querySelector('[data-testid=submit]');

    expect(submit).toBeInTheDocument();
    fireEvent.click(submit);
    expect(submit).toBeInTheDocument();
  });
});
