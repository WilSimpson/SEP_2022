import '../setupTests';
import gamePlayService from './gameplay';
import axios from 'axios';

jest.mock('axios');

describe('Game Play Service', () => {
  describe('answerQuestion', () => {
    it('should return status 200 on success', () => {
      const response = {
        response: [
          {
            status: 200,
          },
        ],
      };
      axios.post.mockResolvedValue(response);

      const result = gamePlayService.answerQuestion(1, 1);
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

      const result = await gamePlayService.answerQuestion(1,1);
      expect(result).toEqual(undefined);
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
});
