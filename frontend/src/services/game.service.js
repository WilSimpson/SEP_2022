import axios from "axios";
import configureStore from "../store/store";

const { persistor, store, API_URL } = configureStore();

class GameService {
  getGames() {
    return axios.get(API_URL + 'api/games/')
  }

  getGame(id) {
    return axios.get(`${API_URL}api/games/${id}/`)
  }

  createGame(name, json) {
    return axios.post(API_URL + 'api/games/', json)
  }

  updateGame(id, json) {
    return axios.put(API_URL + 'api/games/id', json)
  }
}

export default new GameService();