import React from 'react';
import '../../setupTests';
import {shallow, mount} from 'enzyme';
import EditCourse from './editCourse';
import '@testing-library/jest-dom/extend-expect';
import {render, fireEvent} from '@testing-library/react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {User} from '../../models/user';
import MockCourseService from '../../services/courses';
import {act} from 'react-dom/test-utils';
import {Alert} from '@mui/material';
import {expect} from '@jest/globals';

const user = new User(
  'email@example.com',
  'FirstName',
  'LastName',
  'ADMIN',
  'token',
  1,
);

const mockedNavigate = jest.fn();

jest.mock('../../services/courses');
jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom")), 
  useNavigate: () => mockedNavigate,
}));

beforeEach(() => {
  localStorage.setItem('user', JSON.stringify(user));
});
afterEach(() => {
  jest.restoreAllMocks();
  localStorage.clear();
});

describe('<EditCourse />', () => {
  it('should render the edit course page', () => {
    expect(
        shallow(
            <BrowserRouter>
              <EditCourse />
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

  describe('onSubmit()', () => {
    let wrapper;
    let event;
    beforeEach(() => {
      wrapper = mount(<BrowserRouter><EditCourse /></BrowserRouter>);
      event = { preventDefault: () => {} };
    });
    it('should call Course Service edit course', async () => {
      let promise = Promise.resolve();
      MockCourseService.editCourse.mockResolvedValue({});
      wrapper.find('form').simulate('submit', event);
      await act(() => promise);
      expect(MockCourseService.editCourse).toHaveBeenCalled();
    });
    describe('on success', () => {
      it('should navigate to faculty dash', async () => {
        let promise = Promise.resolve();
        MockCourseService.editCourse.mockResolvedValue({});
        wrapper.find('form').simulate('submit', event);
        await act(() => promise);
        expect(mockedNavigate).toHaveBeenCalledWith('../faculty-dashboard');
      });
    });
    describe('on fail', () => {
      it('should set error message on 404 status', async () => {
        let promise = Promise.resolve();
        MockCourseService.editCourse.mockRejectedValue({response:{status: 404, data: ''}});
        wrapper.find('form').simulate('submit', event);
        await act(() => promise);
        wrapper.update();
        expect(wrapper.find(Alert).prop('children')).toEqual(
          'There was an unexpected error reaching the server. ' +
                'Please try again later.'
        );
      });
      it('should set response message on 500 status', async () => {
        let promise = Promise.resolve();
        MockCourseService.editCourse.mockRejectedValue({response:{status: 500, data: 'test-error'}});
        wrapper.find('form').simulate('submit', event);
        await act(() => promise);
        wrapper.update();
        expect(wrapper.find(Alert).prop('children')).toEqual('test-error');
      });
      it('should set error message on other status', async () => {
        let promise = Promise.resolve();
        MockCourseService.editCourse.mockRejectedValue({response:{status: 700, data: ''}});
        wrapper.find('form').simulate('submit', event);
        await act(() => promise);
        wrapper.update();
        expect(wrapper.find(Alert).prop('children')).toEqual(
          'The server is unreachable at this time. ' +
                  'Please try again later.'
        );
      });
    });
  });

  describe('handle input change', () => {
    it('should loop through form Values', () => {
      const event = {
        preventDefault() {},
        target: { value: 'the-value' }
      };
      let mapSpy = jest.spyOn(Object, 'entries');
      let wrapper = mount(<BrowserRouter><EditCourse /></BrowserRouter>);
      act(() => {wrapper.find('#name').hostNodes().simulate('change', event)});
      expect(mapSpy).toHaveBeenCalled();
    });
  });

});
