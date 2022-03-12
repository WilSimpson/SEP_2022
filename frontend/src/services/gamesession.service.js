import {gameSessions} from '../helpers/DummyData';

class GameSessionService {
  getGameSessions() {
    // @TODO: Replace with api calls
    return gameSessions;
  }
}

export default new GameSessionService();
