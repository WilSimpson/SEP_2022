import React from 'react';
import '../../setupTests';
import {shallow, mount} from 'enzyme';
import AddCourse from './addCourse';

import {render, fireEvent} from '@testing-library/react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import MockCourseService from '../../services/courses';
import {User} from '../../models/user';
import {act} from 'react-dom/test-utils';
import {Alert} from '@mui/material';


const mockedNavigate = jest.fn();

const user = new User(
  'email@example.com',
  'FirstName',
  'LastName',
  'ADMIN',
  'token',
  1,
);

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

  describe('onSubmit()', () => {
    let wrapper;
    let event;
    beforeEach(() => {
      wrapper = mount(<BrowserRouter><AddCourse /></BrowserRouter>);
      event = { preventDefault: () => {} };
    });
    it('should call Course Service create course', async () => {
      let promise = Promise.resolve();
      MockCourseService.createCourse.mockResolvedValue({});
      wrapper.find('#create-course').hostNodes().props().onClick(event);
      await act(() => promise);
      expect(MockCourseService.createCourse).toHaveBeenCalled();
    });
    describe('on success', () => {
      it('should navigate to faculty dash', async () => {
        let promise = Promise.resolve();
        MockCourseService.createCourse.mockResolvedValue({});
        wrapper.find('#create-course').hostNodes().props().onClick(event);
        await act(() => promise);
        expect(mockedNavigate).toHaveBeenCalledWith('../dashboard');
      });
    });
    describe('on fail', () => {
      it('should set error message on 404 status', async () => {
        let promise = Promise.resolve();
        MockCourseService.createCourse.mockRejectedValue({response:{status: 404, data: ''}});
        wrapper.find('#create-course').hostNodes().props().onClick(event);
        await act(() => promise);
        wrapper.update();
        expect(wrapper.find(Alert).prop('children')).toEqual(
          'There was an unexpected error reaching the server. ' +
                'Please try again later.'
        );
      });
      it('should set response message on 500 status', async () => {
        let promise = Promise.resolve();
        MockCourseService.createCourse.mockRejectedValue({response:{status: 500, data: 'test-error'}});
        wrapper.find('#create-course').hostNodes().props().onClick(event);
        await act(() => promise);
        wrapper.update();
        expect(wrapper.find(Alert).prop('children')).toEqual('test-error');
      });
      it('should set error message on other status', async () => {
        let promise = Promise.resolve();
        MockCourseService.createCourse.mockRejectedValue({response:{status: 700, data: ''}});
        wrapper.find('#create-course').hostNodes().props().onClick(event);
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
      let wrapper = mount(<BrowserRouter><AddCourse /></BrowserRouter>);
      act(() => {wrapper.find('#name').hostNodes().simulate('change', event)});
      expect(mapSpy).toHaveBeenCalled();
    });
  });
});
