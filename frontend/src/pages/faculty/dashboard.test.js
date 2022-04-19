import React from 'react';
import '../../setupTests';
import {mount} from 'enzyme';
import '@testing-library/jest-dom/extend-expect';
import {User} from '../../models/user';
import FacultyDash from './dashboard';
import {BrowserRouter} from 'react-router-dom';
import GamesTable from '../../components/admin/gamesTable';
import {render, waitFor} from '@testing-library/react'
import MockCourseService from '../../services/courses';
import MockGameService from '../../services/game';
import MockGameSessionService from '../../services/gameSession';
import { act } from 'react-dom/test-utils';
import { LinearProgress } from '@mui/material';
import {alertService} from '../../services/alert';
import GameSessionsTable from '../../components/faculty/gameSessionsTable';

const result = new User('test@test.com', '', '', 'FACULTY', 'jwt-token');
const res = [{id: 1, department: 'There was a problem',
  name: 'N/A', courseNumber: 'N/A', sectionNumber: 'N/A',
  semester: 'N/A'}];

let game = {
    id: 1,
    title: "",
    created_at: new Date(),
    active: true,
  }
let sessions = [
  {
    id:4,
  },
  {
    id:5,
  },{
    id:6,
  },
];

const mockedNavigate = jest.fn();

jest.mock('../../services/courses');
jest.mock('../../services/game');
jest.mock('../../services/gameSession');
jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom")), 
  useNavigate: () => mockedNavigate,
}));

afterEach(() => {
  jest.restoreAllMocks();
});

describe('<FacultyDash />', () => {
  beforeEach(() => {
    localStorage.setItem('user', JSON.stringify(result));
    const resp = {data: res};
    MockCourseService.getMyCourses.mockResolvedValue(resp);
    MockGameService.getGames.mockResolvedValue({data: game});
    MockGameSessionService.getSessions.mockResolvedValue({data: sessions});
  });
  afterEach(() => {
    jest.restoreAllMocks();
    localStorage.clear();
  });

  it('should render the FacultyDash component', async () => {
    let wrapper;
    await act(async () => {
      wrapper = mount(
        <BrowserRouter>
          <FacultyDash />
        </BrowserRouter>,
      );
    });
    expect(wrapper);
  });

  it('should have an All Games table', async () => {
    let wrapper;
    await act(async () => {
      wrapper = mount(
        <BrowserRouter>
          <FacultyDash />
        </BrowserRouter>,
      );
    });
    expect(wrapper.find(GamesTable).length).toEqual(1);
  });

  it('should have an indicator to Total Games', async () => {
    const resp = {data: []};
    // axios.get.mockResolvedValue(resp);
    const {getByTestId} = render(
        <BrowserRouter>
          <FacultyDash />
        </BrowserRouter>,
    );
    await waitFor(() => expect(getByTestId('total-games')).toBeInTheDocument());
  });

  it('should have a table to show Active Game Sessions', async () => {
    const resp = {data: []};
    // axios.get.mockResolvedValue(resp);
    const {getByTestId} = render(
        <BrowserRouter>
          <FacultyDash />
        </BrowserRouter>,
    );
    await waitFor(() => expect(getByTestId('active-game-sessions')).toBeInTheDocument());
  });

  it('should have a courses table', async () => {
    const resp = {data: []};
    // axios.get.mockResolvedValue(resp);
    const {getByTestId} = render(
      <BrowserRouter>
        <FacultyDash />
      </BrowserRouter>,
    );
    await waitFor(() => expect(getByTestId('course_table')).toBeInTheDocument());
  });

  it('should have a button to add a new course', async () => {
    const resp = {data: []};
    // axios.get.mockResolvedValue(resp);
    const {getByTestId} = render(
        <BrowserRouter>
          <FacultyDash />
        </BrowserRouter>,
    );
    await waitFor(() => expect(getByTestId('courses-button')).toBeInTheDocument());
  });

  describe('Course Table', () => {
    let wrapper;
    let promise;
    beforeEach(async () => {
      promise = Promise.resolve();
      await act(async () => {
        wrapper = mount(
          <BrowserRouter>
            <FacultyDash />
          </BrowserRouter>
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
            wrapper = mount(
              <BrowserRouter>
                <FacultyDash />
              </BrowserRouter>
            )
          });
          await act(() => promise);
          wrapper.update();
          expect(wrapper.find(LinearProgress).exists()).toBe(false);
        });
      });
    });

    describe('editThisCourse', () => {
      it('should navigate', async () => {
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

  describe('FacultyDash', () => {
    let wrapper;
    let promise;
    beforeEach(async () => {
      promise = Promise.resolve();
      await act(async() => {
        const resp = {data: [game]};
        MockGameService.getGames.mockResolvedValue(resp);
        MockGameSessionService.getSessions.mockResolvedValue(resp);
        wrapper = mount(
          <BrowserRouter>
            <FacultyDash />
          </BrowserRouter>,
        );
      });
    });

    describe('ON LOAD', () =>{
      it('should call gameService.getGames', async () => {
        await act(() => promise);
        expect(MockGameService.getGames).toHaveBeenCalled();
      });
      describe('game service getGames on success', () => {
        it('should call gameSessionService.getSessions', async() => {
          await act(() => promise);
          expect(MockGameSessionService.getSessions).toHaveBeenCalled();
        });
      });      
      describe('gameSessionService getSessions on fail', () => {
        it('should call alertService alert', async () => {
          MockGameSessionService.getSessions.mockRejectedValue({});
          let alertSpy = jest.spyOn(alertService, 'alert');
          let wrapper;
          await act(async () => {
            wrapper = mount(
              <BrowserRouter>
                <FacultyDash />
              </BrowserRouter>
            )
          });
          await act(() => promise);
          expect(alertSpy).toHaveBeenCalled();
        });
      });
    });
  });

  describe('handleQRCodeButtonClicked', () => {
    it('should navigate', async () => {
      let wrapper;
      let promise = Promise.resolve();
      await act(async() => {
        wrapper = mount(
          <BrowserRouter>
            <FacultyDash />
          </BrowserRouter>,
        );
      });
      await act(() => promise);
      wrapper.find(GameSessionsTable).props().onQRCodeButtonClicked();
      expect(mockedNavigate).toHaveBeenCalled();
    });
  });


});
