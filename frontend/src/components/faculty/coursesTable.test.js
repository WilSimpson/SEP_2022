import React from 'react';
import '../../setupTests';
import MockCourseService from '../../services/courses';
import { act } from 'react-dom/test-utils';
import {mount} from 'enzyme';
import CoursesTable from './coursesTable';
import { BrowserRouter } from 'react-router-dom';
import {User} from '../../models/user';
import { LinearProgress } from '@mui/material';

const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom")), 
  useNavigate: () => mockedNavigate,
}));
jest.mock('../../services/courses');


const user = new User('test@test.com', '', '', 'FACULTY', 'jwt-token');
const res = [{id: 1, department: 'There was a problem',
  name: 'N/A', courseNumber: 'N/A', sectionNumber: 'N/A',
  semester: 'N/A'}];

afterEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});

describe('<CoursesTable />', () => {
  let wrapper;
  let promise;
  beforeEach(async () => {
    const resp = {data: res};
    localStorage.setItem('user', JSON.stringify(user));
    MockCourseService.getMyCourses.mockResolvedValue(resp);
    promise = Promise.resolve();
    await act(async () => {
      wrapper = mount(
        <BrowserRouter><CoursesTable /></BrowserRouter>
      )
    });
  });
  describe('ON LOAD', () => {
    it('should call courseService getMyCourses', async () => {
      await act(() => promise);
      expect(MockCourseService.getMyCourses).toHaveBeenCalled();
    });
    describe('on success', () => {
      it('should no longer be loading', async () => {
        await act(() => promise);
        wrapper.update();
        expect(wrapper.find(LinearProgress).exists()).toBe(false);
      });
    });
    describe('on fail', () => {
      it('should no longer be loading', async () => {
        MockCourseService.getMyCourses.mockRejectedValue({})
        let wrapper;
        await act(async () => {
          wrapper = mount(<BrowserRouter><CoursesTable /></BrowserRouter>)
        });
        await act(() => promise);
        wrapper.update();
        expect(wrapper.find(LinearProgress).exists()).toBe(false);
      });
    });
  });

  describe('editThisCourse', () => {
    it('should navigate', async () => {
      await act(async () => {
        wrapper = mount(<BrowserRouter><CoursesTable editable /></BrowserRouter>)
      });
      await act(() => promise);
      wrapper.update();
      act(() => {wrapper.find('#row1').simulate('click')})
      expect(mockedNavigate).toHaveBeenCalled();
    });
  });

  describe('searchCourses', () => {
    it('should use Object.values to find matching terms', async () => {
      let spy = jest.spyOn(Object, 'values');
      const event = {
        preventDefault() {},
        target: { value: 'the-value' }
      };        
      await act(() => promise);
      wrapper.update();
      
      act(() => {wrapper.find('#searchCourses').hostNodes().simulate('change', event)})
      expect(spy).toHaveBeenCalled();
    });
  });
});