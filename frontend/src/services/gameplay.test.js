import '../setupTests';
import gamePlayService from './gameplay';
import axios from 'axios';
import {inProgressGame} from '../helpers/dummyData';

jest.mock('axios');

describe('Game Play Service', () => {
  describe('createAnswer', () => {
    it('should return status 200 on success', () => {
      const response = {
        response: [
          {
            status: 200,
          },
        ],
      };
      axios.post.mockResolvedValue(response);

      const result = gamePlayService.createAnswer(1, 1, 1, null);
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

      const result = await gamePlayService.createAnswer(1, 1, 1, null);
      expect(result).toEqual(response);
    });
  });

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
      it('should update the current question in the game state', () => {
        expect(localStorage.getItem('inProgress')).not.toBeNull();
        const oldquestion = inProgressGame.state.currentQuestion;
        const newQuestion = inProgressGame.state.game.questions[1];
        expect(JSON.parse(localStorage.getItem('inProgress')).state.currentQuestion).toEqual(oldquestion);
        gamePlayService.updateCurrentQuestion(newQuestion);
        expect(JSON.parse(localStorage.getItem('inProgress')).state.currentQuestion).toEqual(newQuestion);
      });
    });
    describe('clearInProgressGame', () => {
      it('should remove the inProgress game from localStorage', () => {
        expect(localStorage.getItem('inProgress')).not.toBeNull();
        gamePlayService.clearInProgressGame();
        expect(localStorage.getItem('inProgress')).toBeNull();
      });
    });
  });
});
