import axios from 'axios';
import {API_URL} from '../store/store';

const IN_PROGRESS = 'inProgress';
const ANSWER_ID = 'answerId';
export const WALKING = 'Walking';
export const LIMITED_WALKING = 'Limited Walking';
export const NO_WALKING = 'No Walking';

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
        }).catch(() => {});
  }

  teamCompleteGame(teamId) {
    return axios
        .post(API_URL + '/teams/complete/', {
          team: teamId,
        })
        .then((response) => {}).catch(() => {});
  }

  getQuestionContext(questionId) {
    return axios.get(API_URL + '/contextHelp/' + String(questionId) + '/by_question');
  }

  createAnswer(optionId, questionId, teamId, passcodeEntered) {
    return axios
        .post(API_URL + '/gameSession/createAnswer/', {
          code_entered: passcodeEntered,
          question: questionId,
          option_id: optionId,
          team_id: teamId,
        })
        .then(
            (response) => {
              if (response.status === 200) {
                this.setLastAnswerId(response.data.id);
              }
              return response;
            },
        ).catch(() => {});
  }

  updateOption(optionId) {
    return axios
        .put(API_URL + `/gameSession/updateAnswer/${this.getLastAnswerId()}/`, {
          option_id: optionId,
        })
        .then().catch(() => {});
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

  setEnteredPasscode(hasEntered) {
    const ipGame = this.getInProgressGame();
    ipGame.state.enteredPasscode = hasEntered;
    this.setInProgressGame(ipGame);
  }

  hasEnteredPasscode() {
    const ipGame = this.getInProgressGame();
    return ipGame.state.enteredPasscode;
  }

  clearInProgressGame() {
    localStorage.removeItem(IN_PROGRESS);
  }

  setLastAnswerId(answerId) {
    localStorage.setItem(ANSWER_ID, answerId);
  }

  getLastAnswerId() {
    return localStorage.getItem(ANSWER_ID);
  }

  getGameMode() {
    return this.getInProgressGame().state.formData.type;
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
