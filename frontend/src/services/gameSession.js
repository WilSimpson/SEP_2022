import axios from 'axios';
import {gameSessions} from '../helpers/dummyData';
import {API_URL} from '../store/store';

class GameSessionService {
  getGameSessions() {
    // @TODO: Replace with api calls
    return gameSessions;
  }

  createGameSession(creatorId, gameId, notes, timeout) {
    return axios.post(API_URL + '/games/', {
      creator_id: parseInt(creatorID),
      game: parseInt(gameID),
      notes: notes,
      timeout: timeout,
    });
  }
}

export default new GameSessionService();
