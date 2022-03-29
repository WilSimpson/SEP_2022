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

  teamCompleteGame(teamId) {
    return axios
        .post(API_URL + '/teams/complete/', {
          team: teamId,
        })
        .then((response) => {});
  }

  answerQuestion(optionId, teamId) {
    return axios
        .post(API_URL + '/gameSession/answer/', {
          option_id: optionId,
          team_id: teamId,
        })
        .then((response) => {});
  }

  setInProgressGame(state) {
    localStorage.setItem('inProgress', JSON.stringify(state));
  }

  getInProgressGame() {
    return JSON.parse(localStorage.getItem('inProgress'));
  }

  gameInProgress() {
    return localStorage.getItem('inProgress') !== null;
  }

  updateCurrentQuestion(question) {
    const ipGame = this.getInProgressGame();
    ipGame.state.currentQuestion = question;
    this.setInProgressGame(ipGame);
  }

  clearInProgressGame() {
    localStorage.removeItem('inProgress');
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
  random(options) { // {0:2, 1:1, 2:3}
    let i;
    let total = 0;
    for (i in options) {
      if (options.hasOwnProperty(i)) {
        total += options[i];
      }
    }
    for (i in options) {
      if (options.hasOwnProperty(i)) {
        options[i] = options[i]/total;
      }
    }
    let sum = 0;
    const r=Math.random();
    for (i in options) {
      if (options.hasOwnProperty(i)) {
        sum += options[i];
        if (r <= sum) return i;
      }
    }
  }
}

export default new GameService();
