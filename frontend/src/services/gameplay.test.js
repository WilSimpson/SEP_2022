import React from 'react';
import '../setupTests';
import gamePlayService from './gameplay';
import axios from 'axios';
import {inProgressGame} from '../helpers/dummyData';
import {API_URL} from '../store/store';

jest.mock('axios');

describe('Game Play Service', () => {
  

  describe('joinGame', () => {
    it('should return a game object on success', () => {
      const response = {
        response: [
          {
            status: 200,
            data: [
              {
                id: '1',
                text: 'This is the question itself',
                password: 'psw',
                onlyChance: false,
                options: [
                  {
                    text: 'Option 1',
                    link: '1a',
                  },
                  {
                    text: 'Option 2',
                    link: '1b',
                  },
                ],
              },
            ],
          },
        ],
      };
      axios.post.mockResolvedValue(response);

      const result = gamePlayService.joinGame('555555');
      expect(result).toEqual(Promise.resolve(response));
    });

    it('no response on failure', async () => {
      const response = {
        response: [
          {
            status: 404,
            data: [],
          },
        ],
      };
      axios.post.mockResolvedValue(response);

      const result = await gamePlayService.joinGame('555555');
      expect(result).toEqual(undefined);
    });
  });

  describe('random', () => {
    it('should return an index', () => {
      expect(["0","1","2"]).toContain(gamePlayService.random({0:2, 1:1, 2:3}))
    });
  });


  describe('teamCompleteGame', () => {
    it('should return status 200 on success', () => {
      const response = {
        response: [
          {
            status: 200,
          },
        ],
      };
      axios.post.mockResolvedValue(response);

      const result = gamePlayService.teamCompleteGame(1);
      expect(result).toEqual(Promise.resolve(response));
    });

    it('no response on failure', async () => {
      const response = {
        response: [
          {
            status: 404,
          },
        ],
      };
      axios.post.mockResolvedValue(response);

      const result = await gamePlayService.teamCompleteGame(1);
      expect(result).toEqual(undefined);
    });
  });

  describe('inProgressGame functions', () => {
    beforeEach(() => {
      localStorage.setItem('inProgress', JSON.stringify(inProgressGame));
    });
    afterEach(() => {
      localStorage.removeItem('inProgress');
    });
    describe('setInProgressGame', () => {
      it('should add in progress game to localStorage', () => {
        localStorage.removeItem('inProgress');
        expect(localStorage.getItem('inProgress')).toBeNull();
        gamePlayService.setInProgressGame(inProgressGame);
        expect(localStorage.getItem('inProgress')).not.toBeNull();
      });
    });
    describe('getInProgressGame', () => {
      it('should return the in progress game from localStorage', () => {
        const localStorageGame = gamePlayService.getInProgressGame();
        expect(localStorageGame).toEqual(inProgressGame);
        expect(localStorageGame).toEqual(JSON.parse(localStorage.getItem('inProgress')));
      });
    });
    describe('gameInProgress', () => {
      it('should return TRUE when in progress game in localStorage', () => {
        expect(localStorage.getItem('inProgress')).not.toBeNull();
        expect(gamePlayService.gameInProgress()).toEqual(true);
      });
      it('should return FALSE when in progress game not in localStorage', () => {
        localStorage.removeItem('inProgress');
        expect(localStorage.getItem('inProgress')).toBeNull();
        expect(gamePlayService.gameInProgress()).toEqual(false);
      });
    });
    describe('updateCurrentQuestion', () => {
      let oldquestion;
      let newQuestion;
      beforeEach(() => {
        oldquestion = inProgressGame.state.currentQuestion;
        newQuestion = inProgressGame.state.game.questions[1];
      });
      it('should update the current question in the game state', () => {
        expect(localStorage.getItem('inProgress')).not.toBeNull();
        expect(JSON.parse(localStorage.getItem('inProgress')).state.currentQuestion).toEqual(oldquestion);
        gamePlayService.updateCurrentQuestion(newQuestion);
        expect(JSON.parse(localStorage.getItem('inProgress')).state.currentQuestion).toEqual(newQuestion);
      });
      it('should call getInProgressGame', () => {
        expect(localStorage.getItem('inProgress')).not.toBeNull();
        let spy = jest.spyOn(gamePlayService, 'getInProgressGame')
        .mockImplementation(() => JSON.parse(localStorage.getItem('inProgress')));
        gamePlayService.updateCurrentQuestion(newQuestion);
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
      });
      it('should call setInProgressGame', () => {
        expect(localStorage.getItem('inProgress')).not.toBeNull();
        let spy = jest.spyOn(gamePlayService, 'setInProgressGame');
        gamePlayService.updateCurrentQuestion(newQuestion);
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
      });
    });
    describe('clearInProgressGame', () => {
      it('should remove the inProgress game from localStorage', () => {
        expect(localStorage.getItem('inProgress')).not.toBeNull();
        gamePlayService.clearInProgressGame();
        expect(localStorage.getItem('inProgress')).toBeNull();
      });
    });
    describe('setEnteredPasscode', () => {
      let ipGame;
      beforeEach(() => {
        ipGame = JSON.parse(localStorage.getItem('inProgress'));
      });
      it('set entered passcode value to true if false', () => {
        expect(ipGame).not.toBeNull();
        expect(ipGame.state.enteredPasscode).toBe(false);
        gamePlayService.setEnteredPasscode(true);
        expect(JSON.parse(localStorage.getItem('inProgress')).state.enteredPasscode).toBe(true);
      });
      it('set entered passcode value to false if true', () => {
        expect(ipGame).not.toBeNull();
        ipGame.state.enteredPasscode = true;
        localStorage.setItem('inProgress', JSON.stringify(ipGame));
        expect(JSON.parse(localStorage.getItem('inProgress')).state.enteredPasscode).toBe(true);
        gamePlayService.setEnteredPasscode(false);
        expect(JSON.parse(localStorage.getItem('inProgress')).state.enteredPasscode).toBe(false);
      });
      it('should call getInProgressGame', () => {
        expect(localStorage.getItem('inProgress')).not.toBeNull();
        let spy = jest.spyOn(gamePlayService, 'getInProgressGame')
        .mockImplementation(() => JSON.parse(localStorage.getItem('inProgress')));
        gamePlayService.setEnteredPasscode(true);
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
      });
      it('should call setInProgressGame', () => {
        expect(localStorage.getItem('inProgress')).not.toBeNull();
        let spy = jest.spyOn(gamePlayService, 'setInProgressGame');
        gamePlayService.setEnteredPasscode(true);
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
      });
    });
    describe('hasEnteredPasscode', () => {
      it('set entered passcode value to true if false', () => {
        let ipGame = JSON.parse(localStorage.getItem('inProgress'));
        expect(ipGame).not.toBeNull();
        expect(gamePlayService.hasEnteredPasscode()).toEqual(ipGame.state.enteredPasscode);
      });
      it('should call getInProgressGame', () => {
        expect(localStorage.getItem('inProgress')).not.toBeNull();
        let spy = jest.spyOn(gamePlayService, 'getInProgressGame')
        .mockImplementation(() => JSON.parse(localStorage.getItem('inProgress')));
        gamePlayService.hasEnteredPasscode();
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
      });
    });
    describe('setLastAnswerId', () => {
      it('should add feild "answerId" to localStorage', () => {
        let id = '1';
        gamePlayService.setLastAnswerId(id);
        expect(localStorage.getItem('answerId')).toEqual(id);
      });
    });
    describe('getLastAnswerId', () => {
      it('should add feild "answerId" to localStorage', () => {
        let id = '1';
        localStorage.setItem('answerId', id);
        expect(gamePlayService.getLastAnswerId()).toEqual(id);
      });
    });
    describe('getGameMode', () => {
      it('should return the formData type', () => {
        let ipGame = JSON.parse(localStorage.getItem('inProgress'));
        expect(ipGame).not.toBeNull();
        expect(gamePlayService.getGameMode()).toEqual(ipGame.state.formData.type);
      });
      it('should call getInProgressGame', () => {
        expect(localStorage.getItem('inProgress')).not.toBeNull();
        let spy = jest.spyOn(gamePlayService, 'getInProgressGame')
        .mockImplementation(() => JSON.parse(localStorage.getItem('inProgress')));
        gamePlayService.getGameMode();
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
      });
    });
    describe('updateOption', () => {
      beforeEach(() => {
        let id = '1';
        localStorage.setItem('answerId', id);
      });
      it('should return response on success', async () => {
        const response = {
          response: [
            {
              status: 200,
            },
          ],
        };
        axios.put.mockResolvedValue(response);
        const result = await gamePlayService.updateOption(1);
        expect(result).toEqual(response);
      });
      it('returns response on failure', async () => {
        const response = {
          response: [
            {
              status: 404,
            },
          ],
        };
        axios.put.mockResolvedValue(response);
        const result = await gamePlayService.updateOption(1);
        expect(result).toEqual(response);
      });
      it('should call getLastAnswerId', async () => {
        const response = {
          response: [
            {
              status: 200,
            },
          ],
        };
        expect(localStorage.getItem('inProgress')).not.toBeNull();
        let spy = jest.spyOn(gamePlayService, 'getLastAnswerId');
        axios.put.mockResolvedValue(response);
        let result = await gamePlayService.updateOption(1);
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
      });
    });
    describe('sendTeamInit', () => {
      it ('should make POST request', () => {
        let teamData = {
          session: 1,
          mode: 'Walking',
          guest: true,
          size: 1,
          first_time: true,
        };
        const response = {
          response: [
            {
              status: 200,
            },
          ],
        };
        axios.post.mockResolvedValue(response);
        let spy = jest.spyOn(axios, 'post');
        gamePlayService.sendTeamInit(
          1,
          'Walking',
          true,
          1,
          true,
        );
        expect(spy).toHaveBeenCalledWith(
          `${API_URL}/teams/createTeam/`, teamData
        ); 
      });
    });
    describe('getQuestionContext', () => {
      it ('should make GET request', () => {
        let spy = jest.spyOn(axios, 'get');
        gamePlayService.getQuestionContext(1);
        expect(spy).toHaveBeenCalledWith(`${API_URL}/contextHelp/1/by_question`); 
      });
    });
    describe('createAnswer', () => {
      it('should return response on success', async () => {
        const response = {
          response: [
            {
              status: 200,
              data: {
                id: 1
              },
            },
          ],
        };
        axios.post.mockResolvedValue(response);
        const result = await gamePlayService.createAnswer(1, 1, 1, null);
        expect(result).toEqual(response);
      });
      it('returns response on failure', async () => {
        const response = {
          response: [
            {
              status: 404,
            },
          ],
        };
        axios.post.mockResolvedValue(response);
  
        const result = await gamePlayService.createAnswer(1, 1, 1, null);
        expect(result).toEqual(response);
      });
      it('calls setLastAnswerId', async () => {
        gamePlayService.setLastAnswerId = jest.fn();
        axios.post.mockResolvedValue({status: 200, data: {id: 1}});
        await gamePlayService.createAnswer(1, 1, 1, null);
        expect(axios.post).toHaveBeenCalledWith(
          API_URL + '/gameSession/createAnswer/',
          {code_entered: null, question: 1, option_id: 1, team_id: 1}
        );
        expect(gamePlayService.setLastAnswerId).toHaveBeenCalledWith(1);
      });
    });
  });
});
