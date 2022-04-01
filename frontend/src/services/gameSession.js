import axios from 'axios';
import {API_URL} from '../store/store';
import {gameSessions} from '../helpers/dummyData';

class GameSessionService {
  getGameSessions() {
    // @TODO: Replace with api calls
    // return axios.get(API_URL + '/gameSessions/');
    return gameSessions;
  }

  getGameSession(id) {
    return axios.get(`${API_URL}/gameSessions/${id}/`);
  }

  createGameSession(creatorId, gameId, notes, timeout) {
    return axios.post(API_URL + '/games/startSession/', {
      creator_id: parseInt(creatorId),
      id: parseInt(gameId),
      notes: notes,
      timeout: parseInt(timeout),
    });
  }

  endSession(id) {
    return axios.delete(`${API_URL}/gameSession/${id}/`);
  }
}

export default new GameSessionService();
