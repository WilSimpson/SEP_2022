import React from 'react';
import '../../../setupTests';
import {act} from 'react-dom/test-utils';
import {shallow, mount} from 'enzyme';
import {BrowserRouter} from 'react-router-dom';
import GamesTable from '../../../components/admin/gamesTable';
import ViewGamesPage from './view';
import {User} from '../../../models/user';
import MockGameService from '../../../services/game';
import Loading from '../../../components/layout/loading';
import { alertService } from '../../../services/alert';

const mockedNavigate = jest.fn();

let game = {
  id: 1,
  title: "",
  created_at: new Date(),
  active: true,
}

const user = new User(
  'email@example.com',
  'FirstName',
  'LastName',
  'ADMIN',
  'token',
  1,
);

jest.mock('../../../services/game');
jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom")), 
  useNavigate: () => mockedNavigate,
}));

let promise;
beforeEach(() => {
  localStorage.setItem('user', JSON.stringify(user));
  promise = Promise.resolve();
});

afterEach(() => {
  localStorage.clear();
  jest.restoreAllMocks();
});

describe('<ViewGamesPage />', () => {
  let wrapper;
  beforeEach(async () => {
    MockGameService.getGames.mockResolvedValue({data: [game]});
    await act(async() => {
      wrapper = mount(
          <ViewGamesPage />
      );
    });
  });

  it ('should render the GamesTable component', async () => {
    let wrapper = shallow(<ViewGamesPage />);
    expect (wrapper.find(GamesTable).exists()).toBe(true);
  });

  describe('ON LOAD', () => {
    it ('should call game service getGames', async () => {
      await act(() => promise);
      expect(MockGameService.getGames).toHaveBeenCalled();
    });
    
    describe('getGames on success', () => {
      it('will set loading to false', async () => {
        await act(() => promise);
        expect(wrapper.find(Loading).props().loading).toBe(true);
        wrapper.update();
        expect(wrapper.find(Loading).props().loading).toBe(false);
      });
    });
    describe('getGames on fail', () => {
      it('should call alert service', async () => {
        MockGameService.getGames.mockRejectedValue({});
        let alertSpy = jest.spyOn(alertService, 'alert');
        await act(async() => {
          wrapper = mount(
              <ViewGamesPage />
          );
        });
        await act(() => promise);
        expect(alertSpy).toHaveBeenCalled();
      });
    });
  });

  describe('handleGameSelected', () => {
    it('should navigate to that games page', async () => {
      await act(() => promise);
      wrapper.update();
      wrapper.find(GamesTable).props().onGameSelected(1);
      expect(mockedNavigate).toHaveBeenCalledWith('/admin-dashboard/games/1');
    });
  });
  
  describe('handleConfirmDelete', () => {
    beforeEach(() => {
      MockGameService.deleteGame.mockResolvedValue({});
    });
    it('should call deleteGame in game service', async () => {
      let id = 1;
      await act(() => promise);
      wrapper.update();
      await act(async () => {wrapper.find(GamesTable).props().onConfirmDelete(id)});
      await act(() => promise);
      expect(MockGameService.deleteGame).toHaveBeenCalledWith(id);
    });
    describe('on success', () => {
      it('should call alert service', async () => {
        let id = 1;
        let alertSpy = jest.spyOn(alertService, 'alert');
        await act(() => promise);
        wrapper.update();
        await act(async () => {wrapper.find(GamesTable).props().onConfirmDelete(id)});
        await act(() => promise);
        expect(alertSpy).toHaveBeenCalled();
      });
      it('should navigate to /admin-dashboard/games', async () => {
        let id = 1;
        await act(() => promise);
        wrapper.update();
        await act(async () => {wrapper.find(GamesTable).props().onConfirmDelete(id)});
        await act(() => promise);
        expect(mockedNavigate).toHaveBeenCalledWith('/admin-dashboard/games');
      });
    });
    describe('on fail', () => {
      it('should call alert service', async () => {
        MockGameService.deleteGame.mockRejectedValue({message: 'error-happend'});
        let id = 1;
        let alertSpy = jest.spyOn(alertService, 'alert');
        await act(() => promise);
        wrapper.update();
        await act(async () => {wrapper.find(GamesTable).props().onConfirmDelete(id)});
        await act(() => promise);
        expect(alertSpy).toHaveBeenCalled();
      });
    });
  });
  
  describe('GamesTable component onEdit', () => {
    it('should navigate', async () => {
      await act(() => promise);
      wrapper.update();
      wrapper.find(GamesTable).props().onEdit();
      expect(mockedNavigate).toHaveBeenCalled();
    });
  });
});