import CreateGame from './create';
import GameFields from '../../../components/admin/gameFields';
import {mount, shallow} from 'enzyme';
import AuthMock from '../../../services/auth';
import {User} from '../../../models/user';
import MockGameService from '../../../services/game';
import {act} from 'react-dom/test-utils';
import { alertService } from '../../../services/alert';

const mockedNavigate = jest.fn();
jest.mock('../../../services/auth');
jest.mock('../../../models/user');
jest.mock('../../../services/game');

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom")), 
  useNavigate: () => mockedNavigate,
}));

describe('<CreateGame />', () => {
  it ('should have a <GameFields /> component', () => {
    const wrapper = shallow(<CreateGame />);
    expect (wrapper.find(GameFields)).toHaveLength(1);
  });
  describe('Game Fields prop methods', () => {
    let spy;
    beforeEach(() => {
      const user = new User('email@email.com', 'Test', 'Test', 'ADMIN', null, 1);
      spy = jest.spyOn(user, 'isAdmin').mockImplementation(() => true);
      AuthMock.currentUser.mockImplementation(() => user);
    });
    afterEach(() => {
      spy.mockRestore();
    });
    it ('onCancel method passed as prop should call navigate()', () => {
      const wrapper = mount(<CreateGame />);
      wrapper.find(GameFields).props().onCancel();
      expect(mockedNavigate).toHaveBeenCalledWith('/admin-dashboard/games');
    });
    it('handleSubmit method passed as prop calls createGame', async () => {
      const wrapper = mount(<CreateGame />);
      const promise = Promise.resolve();
      MockGameService.createGame.mockResolvedValue({
        response: jest.fn(() => promise),
      });
      wrapper.find(GameFields).props().onSubmit();
      await act(() => promise);
      expect(MockGameService.createGame).toHaveBeenCalled();      
    });
    it ('handleSubmit method passed as prop calls alert service on success', async () => {
      let alertSpy = jest.spyOn(alertService, 'alert');
      const wrapper = mount(<CreateGame />);
      const promise = Promise.resolve();
      MockGameService.createGame.mockResolvedValue({
        response: jest.fn(() => promise),
      });
      wrapper.find(GameFields).props().onSubmit();
      await act(() => promise);
      expect(alertSpy).toHaveBeenCalled();
    });
    it ('handleSubmit method passed as prop calls navigate on success', async () => {
      const wrapper = mount(<CreateGame />);
      const promise = Promise.resolve();
      MockGameService.createGame.mockResolvedValue({
        response: jest.fn(() => promise),
      });
      wrapper.find(GameFields).props().onSubmit();
      await act(() => promise);
      expect(mockedNavigate).toHaveBeenCalledWith('/admin-dashboard/games');
    });
    it ('handleSubmit method passed as prop calls alert on error', async () => {
      let alertSpy = jest.spyOn(alertService, 'alert');
      const err = new Error('test error');
      const wrapper = mount(<CreateGame />);
      MockGameService.createGame.mockRejectedValue(err);
      await wrapper.find(GameFields).props().onSubmit();
      expect(alertSpy).toHaveBeenCalled();
    });
  });
});