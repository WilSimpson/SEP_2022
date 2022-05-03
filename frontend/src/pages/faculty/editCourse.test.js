import React from 'react';
import '../../setupTests';
import {shallow, mount, ReactWrapper} from 'enzyme';
import EditCourse from './editCourse';

import {render, fireEvent} from '@testing-library/react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {User} from '../../models/user';
import MockCourseService from '../../services/courses';
import {act} from 'react-dom/test-utils';
import {Alert} from '@mui/material';
import EndCourseDialog from '../../components/faculty/endCourseDialog';


const user = new User(
  'email@example.com',
  'FirstName',
  'LastName',
  'ADMIN',
  'token',
  1,
);

const mockedNavigate = jest.fn();

const assignMock = jest.fn();
delete window.location;
window.location = { assign: assignMock };

jest.mock('../../services/courses');
jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom")), 
  useNavigate: () => mockedNavigate,
}));

beforeEach(() => {
  localStorage.setItem('user', JSON.stringify(user));
});
afterEach(() => {
  assignMock.mockClear();
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

  it('should route towards the faculty dashboard', () => {
    render(
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<EditCourse />} />
          </Routes>
        </BrowserRouter>,
    );
    const del = document.querySelector('[data-testid=delete]');

    expect(del).toBeInTheDocument();
    fireEvent.click(del);
    expect(del).toBeInTheDocument()
  });

  describe('onSubmit()', () => {
    let wrapper;
    let event;
    beforeEach(() => {
      wrapper = mount(<BrowserRouter><EditCourse /></BrowserRouter>);
      event = { preventDefault: () => {} };
    });
    // it('should call Course Service edit course', async () => {
    //   let promise = Promise.resolve();
    //   MockCourseService.editCourse.mockResolvedValue({});
    //   wrapper.find('form').simulate('submit', event);
    //   await act(() => promise);
    //   expect(MockCourseService.editCourse).toHaveBeenCalled();
    // });
    describe('on success', () => {
      it('should navigate to faculty dash', async () => {
        let promise = Promise.resolve();
        MockCourseService.editCourse.mockResolvedValue({});
        wrapper.find('#edit-course').hostNodes().props().onClick(event);
        await act(() => promise);
        expect(mockedNavigate).toHaveBeenCalledWith('../dashboard');
      });
    });
    describe('on fail', () => {
      it('should set error message on 404 status', async () => {
        let promise = Promise.resolve();
        MockCourseService.editCourse.mockRejectedValue({response:{status: 404, data: ''}});
        wrapper.find('#edit-course').hostNodes().props().onClick(event);
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
        wrapper.find('#edit-course').hostNodes().props().onClick(event);
        await act(() => promise);
        wrapper.update();
        expect(wrapper.find(Alert).prop('children')).toEqual('test-error');
      });
      it('should set error message on other status', async () => {
        let promise = Promise.resolve();
        MockCourseService.editCourse.mockRejectedValue({response:{status: 700, data: ''}});
        wrapper.find('#edit-course').hostNodes().props().onClick(event);
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

  describe('Delete confirm dialog', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(<BrowserRouter><EditCourse /></BrowserRouter>);
    });
    it ('should open a dialog when clicked', () => {
      act(() => wrapper.find('#delete').hostNodes().props().onClick());
      wrapper.update();
      let deleteDialog = wrapper.find(EndCourseDialog);
      expect(deleteDialog.props().open).toBe(true);
    });
    describe('End Course button', () => {
      let promise;
      beforeEach(() => {
        promise = Promise.resolve();
        wrapper.find('#delete').hostNodes().props().onClick();
        wrapper.update();
      });
      it ('should call courseService editCourse', async () => {
        MockCourseService.editCourse.mockResolvedValue({});
        act(() => wrapper.find(EndCourseDialog).props().endCourse());
        await act(() => promise);
        expect(MockCourseService.editCourse).toHaveBeenCalled();
      });
      describe('end course on success', () => {
        it('should navigate', async () => {
          MockCourseService.editCourse.mockResolvedValue({});
          act(() => wrapper.find(EndCourseDialog).props().endCourse());
          await act(() => promise);
          expect(mockedNavigate).toHaveBeenCalledWith('../dashboard');
        });
      });
      describe('end course on fail', () => {
        it('should set Error on status 404', async () => {
          MockCourseService.editCourse.mockRejectedValue({response:{status: 404}});
          act(() => wrapper.find(EndCourseDialog).props().endCourse());
          await act(() => promise);
          wrapper.update();
          expect(wrapper.find(Alert).prop('children')).toEqual(
            'There was an unexpected error reaching the server. ' +
              'Please try again later.',
          );
        });
        it('should set Error on status 500', async () => {
          MockCourseService.editCourse.mockRejectedValue({response:{status: 500, data: 'test-err'}});
          act(() => wrapper.find(EndCourseDialog).props().endCourse());
          await act(() => promise);
          wrapper.update();
          expect(wrapper.find(Alert).prop('children')).toEqual('test-err');
        });
        it('should set Error on status unknown', async () => {
          MockCourseService.editCourse.mockRejectedValue({response:{status: 700}});
          act(() => wrapper.find(EndCourseDialog).props().endCourse());
          await act(() => promise);
          wrapper.update();
          expect(wrapper.find(Alert).prop('children')).toEqual(
            'The server is unreachable at this time. ' +
                'Please try again later.',
          );
        });
      });
    });
  });
});
