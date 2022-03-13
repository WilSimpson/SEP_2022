import {gameSessions} from '../helpers/dummyData';

class GameSessionService {
  getGameSessions() {
    // @TODO: Replace with api calls
    return gameSessions;
  }
}

export default new GameSessionService();
