import axios from 'axios';
import configureStore from '../store/store';

const {persistor, store, API_URL} = configureStore();

class GameService {
  getGames() {
    return axios.get(API_URL + 'api/games/');
  }

  getGame(id) {
    return axios.get(`${API_URL}api/games/${id}/`);
  }

  createGame(title, active, creator_id, code, questionsJSON, optionsJSON) {
    return axios.post(API_URL + 'api/games/', {
      title: title,
      active: active,
      questions: JSON.parse(questionsJSON),
      code: code,
      creator_id: parseInt(creator_id),
      options: JSON.parse(optionsJSON),
    });
  }

  updateGame(id, title, active, creator_id, code, questionsJSON, optionsJSON) {
    return axios.put(API_URL + `api/games/${id}/`, {
      title: title,
      active: active,
      questions: JSON.parse(questionsJSON),
      code: parseInt(code),
      creator_id: parseInt(creator_id),
      options: JSON.parse(optionsJSON),
    });
  }

  deleteGame(id) {
    return axios.delete(`${API_URL}api/games/${id}/`);
  }
}

export default new GameService();
