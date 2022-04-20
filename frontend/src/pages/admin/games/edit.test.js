import React from 'react';
import EditGame from './edit';
import GameFields from '../../../components/admin/gameFields';
import {mount, shallow} from 'enzyme';
import {User} from '../../../models/user';
import MockGameService from '../../../services/game';
import {act} from 'react-dom/test-utils';
import {alertService} from '../../../services/alert';
import '../../../setupTests';
import {expect} from '@jest/globals';

const mockedNavigate = jest.fn();

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

beforeEach(() => {
  localStorage.setItem('user', JSON.stringify(user));
  const promise = Promise.resolve();
  MockGameService.getGame.mockResolvedValue({
    response: jest.fn(() => promise),
  });
});

afterEach(() => {
  localStorage.clear();
});

describe('<EditGame />', () => {
  it ('should have <GameFields /> component', () => {
    const wrapper = shallow(<EditGame />);
    expect (wrapper.find(GameFields)).toHaveLength(1);
  });
  describe('Game fields component', () => {
    let wrapper;
    beforeEach(async () => {
      const resp = {data: []};
      await act(async () => {
          wrapper = mount(
              <EditGame />
          );
      });
    });

    afterEach(() => {
      if (wrapper) {
        wrapper.unmount();
        wrapper = null;
      }
    });

    it ('should render', () => {
      expect(wrapper);
    });
    it ('onCancel method passed as prop should call navigate()', () => {
      wrapper.update();
      wrapper.find(GameFields).props().onCancel();
      expect(mockedNavigate).toHaveBeenCalledWith('/admin-dashboard/games');
    });
    it('handleSubmit method passed as prop calls updateGame', async () => {
      wrapper.update();
      const promise = Promise.resolve();
      MockGameService.updateGame.mockResolvedValue({
        response: jest.fn(() => promise),
      });
      act(() => {wrapper.find(GameFields).props().onSubmit()});
      await act(() => promise);
      expect(MockGameService.updateGame).toHaveBeenCalled();      
    });
    it ('handleSubmit method passed as prop calls alert service on success', async () => {
      wrapper.update();
      let alertSpy = jest.spyOn(alertService, 'alert');
      const promise = Promise.resolve();
      MockGameService.updateGame.mockResolvedValue({
        response: jest.fn(() => promise),
      });
      act(() => {wrapper.find(GameFields).props().onSubmit()});
      await act(() => promise);
      expect(alertSpy).toHaveBeenCalled();
    });
    it ('handleSubmit method passed as prop calls navigate on success', async () => {
      wrapper.update();
      const promise = Promise.resolve();
      MockGameService.updateGame.mockResolvedValue({
        response: jest.fn(() => promise),
      });
      act(() => {wrapper.find(GameFields).props().onSubmit()});
      await act(() => promise);
      expect(mockedNavigate).toHaveBeenCalledWith('/admin-dashboard/games');
    });
    it ('handleSubmit method passed as prop calls alert on error', async () => {
      wrapper.update();
      let alertSpy = jest.spyOn(alertService, 'alert');
      const err = new Error('test error');
      MockGameService.updateGame.mockRejectedValue(err);
      await act(async () => {wrapper.find(GameFields).props().onSubmit()});
      expect(alertSpy).toHaveBeenCalled();
    });
  });
  describe('invalid response data', () => {
    it('should show errors', async () => {
      let wrapper;
      const err = new Error('test error');
      MockGameService.getGame.mockRejectedValue(err);
      const spy = jest.spyOn(alertService, 'alert');
      await act(async () => {
          wrapper = mount(
            <EditGame />
          );
      });
      expect(mockedNavigate).toHaveBeenCalledWith('/admin-dashboard/games');
      expect(spy).toHaveBeenCalled();
    });
  });
  describe('valid response data', () => {
    describe('game is null', () => {
      it('should call alert service', async () => {
        let wrapper;
        MockGameService.getGame.mockResolvedValue({data: null});
        const spy = jest.spyOn(alertService, 'alert');
        await act(async () => {
            wrapper = mount(
              <EditGame />
            );
        });
        expect(spy).toHaveBeenCalled();
      });
      it('should navigate to /admin-dashboard/games', async () => {
        let wrapper;
        MockGameService.getGame.mockResolvedValue({data: null});
        const spy = jest.spyOn(alertService, 'alert');
        await act(async () => {
            wrapper = mount(
              <EditGame />
            );
        });
        expect(mockedNavigate).toHaveBeenCalledWith('/admin-dashboard/games');
      });
    });
  });
});