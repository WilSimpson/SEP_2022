import React from 'react';
import {shallow} from 'enzyme';
import EditCourse from './editCourse';
import '../../setupTests';
import '@testing-library/jest-dom/extend-expect';
import {render, fireEvent} from '@testing-library/react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {User} from '../../models/user';

const result = new User('test@test.com', '', '', 'FACULTY', 'jwt-token');

describe('<EditCourse />', () => {
  beforeEach(() => {
    localStorage.setItem('user', JSON.stringify(result));
  });
  afterEach(() => {
    localStorage.clear();
  });
  it('should render the add course page', () => {
    expect(
        shallow(
            <BrowserRouter>
              <Routes>
                <Route path="*" element={<EditCourse />} />
              </Routes>
            </BrowserRouter>,
        ),
    );
  });

  it('should route towards the faculty dashboard', () => {
    render(
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<EditCourse />} />
          </Routes>
        </BrowserRouter>,
    );
    const back = document.querySelector('[data-testid=back]');

    expect(back).toBeInTheDocument();
    fireEvent.click(back);
    expect(back).toBeInTheDocument()
  });
});
