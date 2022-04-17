import React from 'react';
import '../../setupTests';
import GameSession from './gameSession';
import {mount, shallow} from 'enzyme';
import {BrowserRouter} from 'react-router-dom';
import {unmountComponentAtNode} from 'react-dom';
import {act} from 'react-dom/test-utils';
import {inProgressGame, inProgressGamePasscodeRequired} from '../../helpers/dummyData';
import GamePlayService from '../../services/gameplay';
import GamePlayTimeout from './gamePlayTimeout';
import {alertService} from '../../services/alert';
import Passcode from '../../pages/game/passcode';

const TEAM_ID = 1;

const mockedNavigate = jest.fn();

jest.mock('../../services/gameplay');

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    state: {
      pathname: 'localhost:3000/gameSession',
      code: '123456',
      currentQuestion: {
        id: 1,
        value: "Question 1",
        passcode: "123456",
        chance: false,
        chance_game: "NO_GAME",
        game: '1',
        help: []
      },
      team_id: TEAM_ID,
      game: {
          id: 1,
          title: "TestGame",
          creator_id: 1,
          code: 123456,
          active: true,
          questions: [
            {
              id: 1,
              value: "Question 1",
              passcode: "123456",
              chance: false,
              chance_game: "NO_GAME",
              game: '1',
              help: []
            },
            {
              id: 2,
              value: "Question 2",
              passcode: "123456",
              chance: true,
              chance_game: "NO_GAME",
              game: '1',
              help: []
            },
            {
              id: 3,
              value: "Question 3",
              passcode: "123456",
              chance: false,
              chance_game: "NO_GAME",
              game: '1',
              help: []
            },
          ],
          options: [
            {
              id: 1,
              value: 'Option 1',
              dest_question: 2,
              source_question: 1,
              weight: 1,
            },
            {
              id: 2,
              value: 'Option 2',
              dest_question: 3,
              source_question: 1,
              weight: 1,
            },
            {
                id: 3,
                value: 'Option 3',
                des_question: 3,
                source_question: 2,
                weight: 1,
            },
            {
              id: 4,
              value: 'Option 4',
              des_question: 3,
              source_question: 2,
              weight: 1,
            },
          ],
        },
      formValue: null,
    },
  }),
  useNavigate: () => mockedNavigate,
}));

let container = null;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
  GamePlayService.getInProgressGame.mockReturnValue(inProgressGame);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
  jest.restoreAllMocks();
});

describe('<GameSession />', () => {
  describe('Game Play', () => {
    let wrapper;
    beforeEach( async () => {
      await act(async () => {wrapper = mount(
        <BrowserRouter>
          <GameSession />
        </BrowserRouter>
        );
      });
    });
    it('should render', () => {
      shallow(
          <BrowserRouter>
            <GameSession />
          </BrowserRouter>,
      );
    });
    it('should call createAnswer when "Continue" button clicked', async () => {
      const promise = Promise.resolve();
      GamePlayService.createAnswer.mockResolvedValue({});
      wrapper.find({'data-testid': 'option1'}).hostNodes().simulate('click');
      wrapper.find({'data-testid': 'continue'}).hostNodes().simulate('click');
      await act(() => promise);
      expect(GamePlayService.createAnswer).toHaveBeenCalled();
    });
    it('should call alert service on createAnswer fail', async () => {
      let alertSpy = jest.spyOn(alertService, 'alert');
      const promise = Promise.resolve();
      GamePlayService.createAnswer.mockRejectedValue({response: {status: 404}});
      wrapper.find({'data-testid': 'option1'}).hostNodes().simulate('click');
      wrapper.find({'data-testid': 'continue'}).hostNodes().simulate('click');
      await act(() => promise);
      expect(alertSpy).toHaveBeenCalled();
    });
    it('should call updateCurrentQuestion when "Continue" button clicked', async () => {
      const promise = Promise.resolve();
      GamePlayService.createAnswer.mockResolvedValue({});
      GamePlayService.updateCurrentQuestion.mockResolvedValue({});
      wrapper.find({'data-testid': 'option1'}).hostNodes().simulate('click');
      wrapper.find({'data-testid': 'continue'}).hostNodes().simulate('click');
      await act(() => promise);
      expect(GamePlayService.updateCurrentQuestion).toHaveBeenCalled();
    });
    it('should have a help button', async () => {
      expect(wrapper.find({'data-testid': 'helpButton'}).exists()).toBe(true);
    });
  });
  
  describe('Complete Game', () => {
    let wrapper;
    beforeEach(async () => {
      // to get to the last page
      await act(async () => {wrapper = mount(
        <BrowserRouter>
          <GameSession />
        </BrowserRouter>
        );
      });
      const promise = Promise.resolve();
      GamePlayService.createAnswer.mockResolvedValue({});
      wrapper.find({'data-testid': 'option2'}).hostNodes().simulate('click');
      wrapper.find({'data-testid': 'continue'}).hostNodes().simulate('click');
      await act(() => promise);
    });
    it('should call teamCompleteGame when "Complete" button clicked', async () => {
      const promise = Promise.resolve();
      GamePlayService.teamCompleteGame.mockResolvedValue({});
      wrapper.update();
      wrapper.find({'data-testid': 'complete'}).hostNodes().simulate('click');
      await act(() => promise);
      expect(GamePlayService.teamCompleteGame).toHaveBeenCalledWith(TEAM_ID);
    });
    describe('teamCompleteGame on success', () => {
      it('should navigate', async () => {
        const promise = Promise.resolve();
        GamePlayService.teamCompleteGame.mockResolvedValue({});
        wrapper.update();
        wrapper.find({'data-testid': 'complete'}).hostNodes().simulate('click');
        await act(() => promise);
        expect(mockedNavigate).toHaveBeenCalledWith('../endGame');
      });
      it('should clear in progress Game', async () => {
        let clearInProgressSpy = jest.spyOn(GamePlayService, 'clearInProgressGame');
        const promise = Promise.resolve();
        GamePlayService.teamCompleteGame.mockResolvedValue({});
        wrapper.update();
        wrapper.find({'data-testid': 'complete'}).hostNodes().simulate('click');
        await act(() => promise);
        expect(clearInProgressSpy).toHaveBeenCalled();
      });
    });
    describe('teamCompleteGame on fail', () => {
      it('should call alert service', async () => {
        let alertSpy = jest.spyOn(alertService, 'alert');
        const promise = Promise.resolve();
        GamePlayService.teamCompleteGame.mockRejectedValue({response: {status: 404}});
        wrapper.update();
        wrapper.find({'data-testid': 'complete'}).hostNodes().simulate('click');
        await act(() => promise);
        expect(alertSpy).toHaveBeenCalled();
      });
    });
  });
  describe('<GameSession />', () => {
    let wrapper;
    beforeEach(async () => {
      await act(async () => {
        wrapper = mount(
        <BrowserRouter>
          <GameSession />
        </BrowserRouter>
        );
      });
      const promise = Promise.resolve();
      GamePlayService.createAnswer.mockResolvedValue({});
      wrapper.find({'data-testid': 'option1'}).hostNodes().simulate('click');
      wrapper.find({'data-testid': 'continue'}).hostNodes().simulate('click');
      await act(() => promise);
    });
    it('should call random when chance is clicked', () => {
      wrapper.update();
      wrapper.find({'data-testid': 'chance'}).hostNodes().simulate('click');
      expect(GamePlayService.random).toHaveBeenCalled();
    });
  });
  describe('Timeout Dialog functionality', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(
        <BrowserRouter>
          <GameSession />
        </BrowserRouter>
      );
    });
    it('dialog should be rendered with component', () => {
      const dialog = wrapper.find('GamePlayTimeout');
      expect(dialog.getElement()).not.toBeNull();
    });
    it('dialog should have an open prop that is false initially', () => {
      const dialog = wrapper.find('GamePlayTimeout');
      expect(dialog.props().open).toBe(false);
    });
    describe('returnHome prop function', () => {
      it('should navigate home', () => {
        act(() => {wrapper.find(GamePlayTimeout).props().returnHome()});
        expect(mockedNavigate).toHaveBeenCalledWith('/');
      });
      it ('should call clearInProgressGame in game play service', () => {
        act(() => {wrapper.find(GamePlayTimeout).props().returnHome()});
        let clearInProgressSpy = jest.spyOn(GamePlayService, 'clearInProgressGame');
        expect(clearInProgressSpy).toHaveBeenCalled();
      });
    });
    describe('newGame prop function', () => {
      it ('should call clear inProgressGame', async () => {
        const promise = Promise.resolve();
        let clearInProgressSpy = jest.spyOn(GamePlayService, 'clearInProgressGame');
        GamePlayService.joinGame.mockResolvedValue({});
        act(() => {wrapper.find(GamePlayTimeout).props().newGame()});
        await act(() => promise);
        expect(clearInProgressSpy).toHaveBeenCalled();
      });        
      it ('should call joinGame in game play service', async () => {
        const promise = Promise.resolve();
        GamePlayService.joinGame.mockResolvedValue({});
        act(() => {wrapper.find(GamePlayTimeout).props().newGame()});
        await act(() => promise);
        expect(GamePlayService.joinGame).toHaveBeenCalled();
      }); 
      describe('on success', () => {
        it('should navigate', async () => {
          const promise = Promise.resolve();
          GamePlayService.joinGame.mockResolvedValue({});
          act(() => {wrapper.find(GamePlayTimeout).props().newGame()});
          await act(() => promise);
          expect(mockedNavigate).toHaveBeenCalled();
        });
      });
      describe('on fail', () => {
        it('should display error message with alert service on status 404', async () => {
          let alertSpy = jest.spyOn(alertService, 'alert');
          const promise = Promise.resolve();
          GamePlayService.joinGame.mockRejectedValue({response: {status: 404}});
          act(() => {wrapper.find(GamePlayTimeout).props().newGame()});
          await act(() => promise);
          expect(alertSpy).toHaveBeenCalled();
          alertSpy.mockRestore();
        });
        it('should display error message with alert service on status 500', async () => {
          let alertSpy = jest.spyOn(alertService, 'alert');
          let err = 'test-err';
          let alertError = {
            message: err, 
            severity: "error"
          }
          const promise = Promise.resolve();
          GamePlayService.joinGame.mockRejectedValue({response: {status: 500, data: err}});
          act(() => {wrapper.find(GamePlayTimeout).props().newGame()});
          await act(() => promise);
          expect(alertSpy).toHaveBeenCalled();
          alertSpy.mockRestore();
        });
        it('should display error message with alert service on unknown status', async () => {
          let alertSpy = jest.spyOn(alertService, 'alert');
          let alertError = { 
            message: 'The server is currently unreachable. ' +
            'Please try again later.', 
            severity: "error"
          }
          const promise = Promise.resolve();
          GamePlayService.joinGame.mockRejectedValue({response: {status: 700}});
          act(() => {wrapper.find(GamePlayTimeout).props().newGame()});
          await act(() => promise);
          expect(alertSpy).toHaveBeenCalled();
          alertSpy.mockRestore();
        });
      });
    });
  });
  describe('WALKING MODE', () => {
    beforeEach(() => {
      localStorage.setItem('inProgress', inProgressGamePasscodeRequired);
      jest.spyOn(GamePlayService, 'getGameMode').mockImplementation(
        () => 'Walking');
      jest.spyOn(GamePlayService, 'getInProgressGame').mockImplementation(
        () => inProgressGamePasscodeRequired);
    });
    afterEach(() => {
      localStorage.removeItem('inProgress');
    });
    describe('Passcode method calls', () => {
      let wrapper;
      it('should call getGameMode initially', async () => {
        await act(async () => {
          wrapper = mount(
            <BrowserRouter>
              <GameSession />
            </BrowserRouter>
          );
        });
        let spy = jest.spyOn(GamePlayService, 'getGameMode').mockImplementation(() => 'Walking');
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
      });
      it('should call getInProgressGame initially', async () => {
        await act(async () => {
          wrapper = mount(
            <BrowserRouter>
              <GameSession />
            </BrowserRouter>
          );
        });
        let spy = jest.spyOn(GamePlayService, 'getInProgressGame').mockImplementation(() => inProgressGamePasscodeRequired);
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
      });
      it ('should be in document when in walking mode', async () => {
        await act(async () => {
          wrapper = mount(
            <BrowserRouter>
              <GameSession />
            </BrowserRouter>
          );
        });
        expect(wrapper.find(Passcode).getElement()).not.toBeNull();
      });
      describe('submitPasscode()', () => {
        it ('should call createAnswer in gameplay service', async () => {
          await act(async () => {
            wrapper = mount(
              <BrowserRouter>
                <GameSession />
              </BrowserRouter>
            );
          });
          const promise = Promise.resolve();
          GamePlayService.createAnswer.mockResolvedValue({});
          act(() => {wrapper.find(Passcode).props().submitPasscode()})
          await act(() => promise);
          expect(GamePlayService.createAnswer).toHaveBeenCalled();
        });
        describe('on success', () => {
          it('should call setEnteredPasscode in game play service', async () => {
            let setEnteredPasscodeSpy = jest.spyOn(GamePlayService, 'setEnteredPasscode');
            await act(async () => {wrapper = mount(
                <BrowserRouter>
                  <GameSession />
                </BrowserRouter>
              );
            });
            const promise = Promise.resolve();
            GamePlayService.createAnswer.mockResolvedValue({});
            act(() => {wrapper.find(Passcode).props().submitPasscode()})
            await act(() => promise);
            expect(setEnteredPasscodeSpy).toHaveBeenCalled();
          });
          it ('should take passcode screen off of the game session', async () => {
            await act(async () => {wrapper = mount(
              <BrowserRouter>
                <GameSession />
              </BrowserRouter>
              );
            });
            const promise = Promise.resolve();
            GamePlayService.createAnswer.mockResolvedValue({});
            expect(wrapper.find('#passcode-screen').exists()).toBeTruthy();
            act(() => {wrapper.find(Passcode).props().submitPasscode()})
            await act(() => promise);
            wrapper.update();
            expect(wrapper.find('#passcode-screen').exists()).toBeFalsy();
          });
        });
        describe('on fail', () => {
          it('should call alert service if response data', async () => {
            let alertSpy = jest.spyOn(alertService, 'alert');
            let msg = 'test-err';
            await act(async () => {wrapper = mount(
              <BrowserRouter>
                <GameSession />
              </BrowserRouter>
              );
            });
            const promise = Promise.resolve();
            GamePlayService.createAnswer.mockRejectedValue({response: {status: 400, data: msg}});
            act(() => {wrapper.find(Passcode).props().submitPasscode()})
            await act(() => promise);
            expect(alertSpy).toHaveBeenCalled();
            alertSpy.mockRestore();
          });
          it ('should call alert service if no response data', async () => {
            let alertSpy = jest.spyOn(alertService, 'alert');
            await act(async () => {wrapper = mount(
              <BrowserRouter>
                <GameSession />
              </BrowserRouter>
              );
            });
            const promise = Promise.resolve();
            GamePlayService.createAnswer.mockRejectedValue({response: {status: 400}});
            act(() => {wrapper.find(Passcode).props().submitPasscode()})
            await act(() => promise);
            expect(alertSpy).toHaveBeenCalled();
            alertSpy.mockRestore();
          });
        });
      });  
    });

    describe('nextQuestion()', () => {
      let wrapper;
      beforeEach(async () => {
        await act(async () => {wrapper = mount(
          <BrowserRouter>
            <GameSession />
          </BrowserRouter>
          );
        });
        const promise = Promise.resolve();
        GamePlayService.createAnswer.mockResolvedValue({});
        expect(wrapper.find('#passcode-screen').exists()).toBeTruthy();
        act(() => {wrapper.find(Passcode).props().submitPasscode()})
        await act(() => promise);
        wrapper.update();
        expect(wrapper.find('#passcode-screen').exists()).toBeFalsy();
      });
   
      it ('should call updateOption in game play services', async () => {
        wrapper.update();
        const promise = Promise.resolve();
        GamePlayService.updateOption.mockResolvedValue({});
        act(() => {wrapper.find({'data-testid': 'option1'}).hostNodes().simulate('click')});
        act(() => {wrapper.find({'data-testid': 'continue'}).hostNodes().simulate('click')});
        await act(() => promise);
        expect(GamePlayService.updateOption).toHaveBeenCalled();
      });

      describe('updateOption on success', () => {
        it('should show passcode screen', async () => {
          wrapper.update();
          const promise = Promise.resolve();
          GamePlayService.updateOption.mockResolvedValue({});
          act(() => {wrapper.find({'data-testid': 'option1'}).hostNodes().simulate('click')});
          act(() => {wrapper.find({'data-testid': 'continue'}).hostNodes().simulate('click')});
          await act(() => promise);
          wrapper.update();
          expect(wrapper.find('#passcode-screen').exists()).toBeTruthy();
        });
        it('should call setEnteredPasscode in game play service', async () => {
          wrapper.update();
          let setEnteredPasscodeSpy = jest.spyOn(GamePlayService, 'setEnteredPasscode');
          const promise = Promise.resolve();
          GamePlayService.updateOption.mockResolvedValue({});
          act(() => {wrapper.find({'data-testid': 'option1'}).hostNodes().simulate('click')});
          act(() => {wrapper.find({'data-testid': 'continue'}).hostNodes().simulate('click')});
          await act(() => promise);
          expect(setEnteredPasscodeSpy).toHaveBeenCalled();
        });
      });
      describe('updateOption on fail', () => {
        it ('should call alert service', async () => {
          wrapper.update();
          let alertSpy = jest.spyOn(alertService, 'alert');
          const promise = Promise.resolve();
          GamePlayService.updateOption.mockRejectedValue({response: {status: 404}});
          act(() => {wrapper.find({'data-testid': 'option1'}).hostNodes().simulate('click')});
          act(() => {wrapper.find({'data-testid': 'continue'}).hostNodes().simulate('click')});
          await act(() => promise);
          expect(alertSpy).toHaveBeenCalled();
        });
        it ('should set Timeout Dialog open if status 404 with timeout message', async () => {
          wrapper.update();
          let timeoutMessage = 'Your Game has timed out. Please start a new Game.';
          const promise = Promise.resolve();
          GamePlayService.updateOption.mockRejectedValue({response: {status: 400, data: timeoutMessage}});
          act(() => {wrapper.find({'data-testid': 'option1'}).hostNodes().simulate('click')});
          act(() => {wrapper.find({'data-testid': 'continue'}).hostNodes().simulate('click')});
          await act(() => promise);
          wrapper.update();
          expect(wrapper.find(GamePlayTimeout).props().open).toBe(true);
        });
        it ('should clear in progress if status 404 with timeout message', async () => {
          wrapper.update();
          let clearInProgressSpy = jest.spyOn(GamePlayService, 'clearInProgressGame');
          let timeoutMessage = 'Your Game has timed out. Please start a new Game.';
          const promise = Promise.resolve();
          GamePlayService.updateOption.mockRejectedValue({response: {status: 400, data: timeoutMessage}});
          act(() => {wrapper.find({'data-testid': 'option1'}).hostNodes().simulate('click')});
          act(() => {wrapper.find({'data-testid': 'continue'}).hostNodes().simulate('click')});
          await act(() => promise);
          wrapper.update();
          expect(clearInProgressSpy).toHaveBeenCalled();
        });
      });
    });
  });
  describe('Help Dialog', () => {
    it('should open when help dialog clicked', async () => {
      let wrapper;
      let promise;
      await act(async () => {wrapper = mount(
        <BrowserRouter>
          <GameSession />
        </BrowserRouter>
        );
      });
      await act(() => promise);
      expect(wrapper.find('SimpleDialog').props().open).toBe(false);
      wrapper.find({'data-testid': 'helpButton'}).hostNodes().simulate('click');
      wrapper.update();
      expect(wrapper.find('SimpleDialog').props().open).toBe(true);
    });
    it('should close when close function runs', async () => {
      let wrapper;
      let promise = Promise.resolve();
      await act(async () => {wrapper = mount(
        <BrowserRouter>
          <GameSession />
        </BrowserRouter>
        );
      });
      await act(() => promise);
      wrapper.find({'data-testid': 'helpButton'}).hostNodes().simulate('click');
      expect(wrapper.find('SimpleDialog').props().open).toBe(true);
      act(() => {wrapper.find('SimpleDialog').props().onClose()});
      wrapper.update();
      expect(wrapper.find('SimpleDialog').props().open).toBe(false);
    });
  });
});
