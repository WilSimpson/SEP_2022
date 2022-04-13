import axios from 'axios';
import {gameSessions} from '../helpers/dummyData';
import {API_URL} from '../store/store';

class GameSessionService {
  getGameSessions() {
    // @TODO: Replace with api calls
    return gameSessions;
  }

  createGameSession(creatorId, gameId, notes, timeout, courseID) {
    return axios.post(API_URL + '/games/startSession/', {
      creator_id: parseInt(creatorId),
      id: parseInt(gameId),
      notes: notes,
      timeout: parseInt(timeout),
      courseID: parseInt(courseID),
    });
  }
}

export default new GameSessionService();
