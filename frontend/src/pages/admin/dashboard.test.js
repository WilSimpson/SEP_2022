import React from 'react';
import '../../setupTests';
import {mount} from 'enzyme';

import AdminDash from './dashboard';
import {User} from '../../models/user';
import GamesTable from '../../components/admin/gamesTable';
import {BrowserRouter} from 'react-router-dom';
import {act} from 'react-dom/test-utils';
import GameSessionsTable from '../../components/faculty/gameSessionsTable';
// import axios from 'axios';
import Loading from '../../components/layout/loading';
import MockGameSessionService from '../../services/gameSession';
import MockGameService from '../../services/game';
import { alertService } from '../../services/alert';


const user = new User('test@test.com', '', '', 'ADMIN', 'jwt-token', 1);
const mockedNavigate = jest.fn();
// jest.mock('axios');
jest.mock('../../services/game');
jest.mock('../../services/gameSession');
jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom")), 
  useNavigate: () => mockedNavigate,
}));

let game = {
  id: 1,
  title: "",
  created_at: new Date(),
  active: true,
}

describe('<AdminDash />', () => {
  let wrapper;

  beforeEach(async () => {
    localStorage.setItem('user', JSON.stringify(user));
    await act(async() => {
      const resp = {data: [game]};
      MockGameService.getGames.mockResolvedValue(resp);
      MockGameSessionService.getSessions.mockResolvedValue(resp);
      wrapper = mount(
        <BrowserRouter>
          <AdminDash />
        </BrowserRouter>,
      );
    });
  });
  
  afterEach(() => {
    localStorage.clear();
    wrapper = null;
    jest.restoreAllMocks();
  });

  it('should render the AdminDash component', () => {
    expect(wrapper);
  });

  it('should be loading', () => {
    expect(wrapper.find(Loading).length).toEqual(1);
  });

  it.skip('should have an All Games table', () => {
    let length;
    act(() => {
      length = wrapper.find(GamesTable).length;
      expect(length).toEqual(1);
    });
  });

  describe('GamesTable component', () => {
    it ('should have a GamesTable component', () => {
      wrapper.update();
      expect(wrapper.find(GamesTable).exists()).toBe(true);
    });
    it.skip('should have an indicator to Total Games', () => {
      expect(wrapper.find('[data-testid="total-games"]').length)
          .toEqual(1);
    });
    it('should call navigate with edit prop', () => {
      wrapper.update();
      act(() => {wrapper.find(GamesTable).props().onEdit(1)});
      expect(mockedNavigate).toHaveBeenCalled();
    });
  });

  describe('gameService.getGames()', () => {
    it ('should be called', async () => {
      const promise = Promise.resolve();
      await act(() => promise);
      expect(MockGameService.getGames).toHaveBeenCalled();
    });
    describe('on success', () => {
      it('should call getSessions', async () => {
        const promise = Promise.resolve();
        await act(() => promise);
        expect(MockGameSessionService.getSessions).toHaveBeenCalled();
      });
    });
    describe('on fail', () => {
      it('should call alert service', async () => {
        let wrapper;
        let alertSpy = jest.spyOn(alertService, 'alert');
        const promise = Promise.resolve();
        MockGameService.getGames.mockRejectedValue({response: {data: 'error'}});
        await act(async() => {
          wrapper = mount(
            <BrowserRouter>
              <AdminDash />
            </BrowserRouter>,
          );
        });
        await act(() => promise);
        expect(alertSpy).toHaveBeenCalled();
        alertSpy.mockRestore();
      });
    });
  });

  describe('gameSessionService.getSessions()', () => {
    it('should be called', async () => {
      const promise = Promise.resolve();
      await act(() => promise);
      expect(MockGameSessionService.getSessions).toHaveBeenCalled();
    });
    describe('on fail', () => {
      it('should call alert service', async () => {
        let wrapper;
        let alertSpy = jest.spyOn(alertService, 'alert');
        const promise = Promise.resolve();
        MockGameSessionService.getSessions.mockRejectedValue({response: {data: 'error'}});
        await act(async() => {
          wrapper = mount(
            <BrowserRouter>
              <AdminDash />
            </BrowserRouter>,
          );
        });
        await act(() => promise);
        expect(alertSpy).toHaveBeenCalled();
        alertSpy.mockRestore();
      });
    });
  });

  describe('handleQRCodeButtonClicked', () => {
    it ('should navigate when clicked', () => {
      wrapper.update();
      act(() => {wrapper.find(GameSessionsTable).props().onQRCodeButtonClicked(123456)});
      expect(mockedNavigate).toHaveBeenCalled();
    });
  });

  it('should have a table to show Active Game Sessions', () => {
    wrapper.update();
    expect(wrapper.find(GameSessionsTable).exists()).toBe(true);
  });  
});
