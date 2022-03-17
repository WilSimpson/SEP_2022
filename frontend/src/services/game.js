import axios from 'axios';
import {API_URL} from '../store/store';

class GameService {
  getGames() {
    return axios.get(API_URL + '/games/');
  }

  getGame(id) {
    return axios.get(`${API_URL}/games/${id}/`);
  }

  createGame(title, active, creatorId, code, questionsJSON, optionsJSON) {
    return axios.post(API_URL + '/games/', {
      title: title,
      active: active,
      questions: JSON.parse(questionsJSON),
      code: code,
      creator_id: parseInt(creatorId),
      options: JSON.parse(optionsJSON),
    });
  }

  updateGame(id, title, active, creatorId, code, questionsJSON, optionsJSON) {
    return axios.put(API_URL + `/games/${id}/`, {
      title: title,
      active: active,
      questions: JSON.parse(questionsJSON),
      code: parseInt(code),
      creator_id: parseInt(creatorId),
      options: JSON.parse(optionsJSON),
    });
  }

  deleteGame(id) {
    return axios.delete(`${API_URL}/games/${id}/`);
  }
}

export default new GameService();
