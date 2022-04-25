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

  /**
   * Get all the game sessions for the given game
   * @param {number} id game id to get sessions for
   * @return {Promise} all game sessions for the given game
   */
  getSessions(id) {
    return axios.get(`${API_URL}/games/${id}/sessions/`);
  }

  createGameSession(creatorId, gameId, notes, timeout, courseID, isGuest) {
    return axios.post(API_URL + '/games/startSession/', {
      creator_id: parseInt(creatorId),
      id: parseInt(gameId),
      notes: notes,
      timeout: parseInt(timeout),
      courseID: parseInt(courseID),
      isGuest: isGuest,
    });
  }


  endSession(id) {
    return axios.put(`${API_URL}/games/endSession/${id}/`, {
    });
  }

  getReport(gameId, sessionId, csv = true) {
    return axios.get(`${API_URL}/games/${gameId}/sessions/${sessionId}/report/`, {headers: {
      'accept': csv ? 'text/csv' : 'application/json',
    }});
  }
}

export default new GameSessionService();
