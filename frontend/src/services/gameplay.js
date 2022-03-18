import axios from 'axios';
import {API_URL} from '../store/store';

class GameService {
  joinGame(gameCode) {
    return axios
        .post(API_URL + '/games/joinGame/', {
          code: gameCode,
        })
        .then((response) => {
          if (response.data) {
          // Expects a string format as JSON
          // Should result in an array of keyed question objects. Ex:
          // {"1": {'text': "You are a software engineer doing stuff
          //                 with cars. Make Choices.",
          //             'options': [{'text': "Ignore Result", 'link': "1A"},
          //             {'text': "Technician Re-test", 'link': "2A"},
          //             {'text': "Engineer Re-test", 'link': "5A"},
          //             {'text': "Inform Manager", 'link': "4A"},
          //             {'text': "Email CEO", 'link': "3A"}],
          //              'password': "psw",
          //              'only_chance': false}}
            localStorage.setItem('gameObject', response.data);
          }
          return response.data;
        });
  }

  sendTeamInit(sessionId, mode, guest, size, firstTime) {
    return axios
        .post(API_URL + '/teams/createTeam/', {
          session: sessionId,
          mode: mode,
          guest: guest,
          size: size,
          first_time: firstTime,
        })
        .then((response) => {
          if (response.data) {
            localStorage.setItem('teamObject', response.data);
          }
          return response.data;
        });
  }

  answerQuestion(optionId, teamId) {
    return axios
        .post(API_URL + '/gameSession/answer/', {
          option_id: optionId,
          team_id: teamId,
        })
        .then((response) => {});
  }

  clearGame() {
    localStorage.removeItem('gameObject');
  }

  clearTeam() {
    localStorage.removeItem('teamObject');
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

export default new GameService();
