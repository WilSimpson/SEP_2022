import axios from 'axios';
import {API_URL} from '../store/store';

class GamePlayService {
  joinGame(gameCode) {
    return axios
        .post(API_URL + 'joinGame', {
          gameCode,
        })
        .then((response) => {
          if (response.data) {
          // Expects a string format as JSON
          // Should result in an array of keyed question objects. Ex:
          // {"1": {'text': "You are a software engineer doing stuff with cars. Make Choices.",
          //             'options': [{'text': "Ignore Result", 'link': "1A"},
          //             {'text': "Technician Re-test", 'link': "2A"},
          //             {'text': "Engineer Re-test", 'link': "5A"},
          //             {'text': "Inform Manager", 'link': "4A"},
          //             {'text': "Email CEO", 'link': "3A"}],
          //              'password': "psw",
          //              'only_chance': false}}
            localStorage.setItem('gameObject', JSON.parse(response.data));
          }
          return response.data;
        });
  }

  clearGame() {
    localStorage.removeItem('gameCode');
  }

  checkPasscode(pcd) {
    // need axios once a backend exists
    if (pcd === 'correct') {
      return {response: {status: 200}};
    } else {
      return {
        error: {
          response: {status: 401, data: {detail: 'wrong passcode'}},
        },
      };
    }
  }
}

export default new GamePlayService();
