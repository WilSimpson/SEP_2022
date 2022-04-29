import React from 'react';
import '../../setupTests';
import {mount} from 'enzyme';
import {User} from '../../models/user';
import FacultyDash from './dashboard';
import {BrowserRouter} from 'react-router-dom';
import GamesTable from '../../components/admin/gamesTable';
import {render, waitFor} from '@testing-library/react'
import MockGameService from '../../services/game';
import MockGameSessionService from '../../services/gameSession';
import { act } from 'react-dom/test-utils';
import GameSessionsTable from '../../components/faculty/gameSessionsTable';

const result = new User('test@test.com', '', '', 'FACULTY', 'jwt-token');

let game = [{
    id: 1,
    title: "",
    created_at: new Date(),
    active: true,
  }]
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

jest.mock('../../services/game');
jest.mock('../../services/gameSession');
jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom")), 
  useNavigate: () => mockedNavigate,
}));

afterEach(() => {
  jest.clearAllMocks();
});

describe('<FacultyDash />', () => {
  beforeEach(() => {
    localStorage.setItem('user', JSON.stringify(result));
    MockGameService.getGames.mockResolvedValue({data: game});
    MockGameSessionService.getMyActiveSessions.mockResolvedValue({data: sessions});
    MockGameSessionService.getSessions.mockResolvedValue({data: sessions});
  });
  afterEach(() => {
    jest.clearAllMocks();
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

  describe('FacultyDash', () => {
    let wrapper;
    let promise;
    beforeEach(async () => {
      promise = Promise.resolve();
      await act(async() => {
        const resp = {data: [game]};
        MockGameService.getGames.mockResolvedValue(resp);
        MockGameSessionService.getMyActiveSessions.mockResolvedValue(resp);
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
      //
      // These are commented out because getMyActiveSessions is never called
      //
      // describe('game service getGames on success', () => {
      //   it('should call gameSessionService.getMyActiveSessions', async() => {
      //     await act(() => promise);
      //     expect(MockGameSessionService.getMyActiveSessions).toHaveBeenCalled();
      //   });
      // });      
      // describe('gameSessionService getMyActiveSessions on fail', () => {
      //   it('should call alertService alert', async () => {
      //     MockGameSessionService.getMyActiveSessions.mockRejectedValue({});
      //     let alertSpy = jest.spyOn(alertService, 'alert');
      //     let wrapper;
      //     await act(async () => {
      //       wrapper = mount(
      //         <BrowserRouter>
      //           <FacultyDash />
      //         </BrowserRouter>
      //       )
      //     });
      //     await act(() => promise);
      //     expect(alertSpy).toHaveBeenCalled();
      //   });
      // });
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
