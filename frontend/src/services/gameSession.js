import axios from 'axios';
import {API_URL} from '../store/store';
// import {gameSessions} from '../helpers/dummyData';

class GameSessionService {
  getGameSessions(gameID) {
    // @TODO: Replace with api calls
    return axios.get(API_URL + `/game/${gameID}/gameSessions/`);
    // return gameSessions;
  }

  getActiveGameSessions() {
    return axios.get(API_URL + `/gameSession/`);
  }

  getMyActiveSessions(facultyId) {
    return axios.get(`${API_URL}/gameSession/${facultyId}/`);
  }

  getGameSession(gameID, sessionID) {
    return axios.get(`${API_URL}/game/${gameID}/gameSessions/${sessionID}/`);
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
    return axios.put(`${API_URL}/games/endSession/${id}/`, {
    });
  }
}

export default new GameSessionService();
