import axios from 'axios';
import {gameSessions} from '../helpers/dummyData';
import {API_URL} from '../store/store';

class GameSessionService {
  getGameSessions() {
    // @TODO: Replace with api calls
    return gameSessions;
  }

  /**
   * Get all the game sessions for the given game
   * @param {number} id game id to get sessions for
   * @return {Promise} all game sessions for the given game
   */
  getSessions(id) {
    return axios.get(`${API_URL}/games/${id}/sessions/`);
  }

  createGameSession(creatorId, gameId, notes, timeout) {
    return axios.post(API_URL + '/games/startSession/', {
      creator_id: parseInt(creatorId),
      id: parseInt(gameId),
      notes: notes,
      timeout: parseInt(timeout),
    });
  }

  getReport(gameId, sessionId, csv = true) {
    return axios.get(`${API_URL}/games/${gameId}/sessions/${sessionId}/report/`, {headers: {
      'accept': csv ? 'text/csv' : 'application/json',
    }});
  }
}

export default new GameSessionService();
