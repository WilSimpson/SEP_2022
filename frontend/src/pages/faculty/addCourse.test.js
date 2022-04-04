import React from 'react';
import {shallow} from 'enzyme';
import AddCourse from './addCourse';
import '../../setupTests';
import '@testing-library/jest-dom/extend-expect';
import {render, fireEvent} from '@testing-library/react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

describe('<AddCourse />', () => {
  it('should render the add course page', () => {
    expect(
        shallow(
            <BrowserRouter>
              <Routes>
                <Route path="*" element={<AddCourse />} />
              </Routes>
            </BrowserRouter>,
        ),
    );
  });

  it('should route towards the faculty dashboard', () => {
    render(
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<AddCourse />} />
          </Routes>
        </BrowserRouter>,
    );
    const back = document.querySelector('[data-testid=back]');

    expect(back).toBeInTheDocument();
    fireEvent.click(back);
    expect(back).toBeInTheDocument()
  });
});
