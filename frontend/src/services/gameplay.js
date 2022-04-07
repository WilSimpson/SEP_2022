import axios from 'axios';
import {API_URL} from '../store/store';

const IN_PROGRESS = 'inProgress';

class GameService {
  joinGame(gameCode) {
    return axios
        .post(API_URL + '/games/joinGame/', {
          code: gameCode,
        })
        .then((response) => {
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

  getQuestionContext(questionId) {
    return axios.get(API_URL + '/contextHelp/' + String(questionId) + '/by_question');
  }

  answerQuestion(optionId, teamId) {
    return axios
        .post(API_URL + '/gameSession/answer/', {
          option_id: optionId,
          team_id: teamId,
        })
        .then();
  }

  setInProgressGame(state) {
    localStorage.setItem(IN_PROGRESS, JSON.stringify(state));
  }

  getInProgressGame() {
    return JSON.parse(localStorage.getItem(IN_PROGRESS));
  }

  gameInProgress() {
    return localStorage.getItem(IN_PROGRESS) !== null;
  }

  updateCurrentQuestion(question) {
    const ipGame = this.getInProgressGame();
    ipGame.state.currentQuestion = question;
    this.setInProgressGame(ipGame);
  }

  clearInProgressGame() {
    localStorage.removeItem(IN_PROGRESS);
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
