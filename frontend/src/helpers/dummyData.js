export const Games = require('./games.json');
export const Courses = require('./courses.json');

function createGameSessionTable(id, name, starttime, endtime, gamecode) {
  return {id, name, starttime, endtime, gamecode};
}

export const gameSessions = [
  createGameSessionTable(
      0,
      'Biomedical 1',
      '2022-05-01',
      '2022-05-02',
      '973380',
  ),

  createGameSessionTable(
      1,
      'Biomedical 2',
      '2022-05-02',
      '2022-05-03',
      '113018',
  ),

  createGameSessionTable(
      2,
      'Biomedical 3',
      '2022-05-05',
      '2022-05-06',
      '470337',
  ),

  createGameSessionTable(
      3,
      'Biomedical 4',
      '2022-06-01',
      '2022-06-02',
      '442590',
  ),

  createGameSessionTable(
      4,
      'Biomedical 5',
      '2022-07-02',
      '2022-07-03',
      '796420',
  ),

  createGameSessionTable(
      5,
      'Biomedical 6',
      '2022-07-02',
      '2022-07-03',
      '651756',
  ),
];

export const inProgressGame = {
  state: {
    code: '123456',
    currentQuestion: {
      id: 1,
      value: 'Question 1',
      passcode: '123456',
      chance: false,
      chance_game: 'NO_GAME',
      game: '1',
      help: [],
    },
    team_id: 1,
    game: {
      questions: [
        {
          id: 1,
          value: 'Question 1',
          passcode: '123456',
          chance: false,
          chance_game: 'NO_GAME',
          game: '1',
          help: [],
        },
        {
          id: 2,
          value: 'Question 2',
          passcode: '123456',
          chance: true,
          chance_game: 'NO_GAME',
          game: '1',
          help: [],
        },
      ],
    },
    formData: {
      type: 'No Walking',
    },
    enteredPasscode: false,
  },
};

export const inProgressGamePasscodeRequired = {
  state: {
    code: '123456',
    currentQuestion: {
      id: 1,
      value: 'Question 1',
      passcode: '123456',
      chance: false,
      chance_game: 'NO_GAME',
      game: '1',
      help: [],
    },
    team_id: 1,
    game: {
      questions: [
        {
          id: 1,
          value: 'Question 1',
          passcode: '123456',
          chance: false,
          chance_game: 'NO_GAME',
          game: '1',
          help: [],
        },
        {
          id: 2,
          value: 'Question 2',
          passcode: '123456',
          chance: true,
          chance_game: 'NO_GAME',
          game: '1',
          help: [],
        },
      ],
    },
    formData: {
      type: 'Walking',
    },
    enteredPasscode: false,
  },
};
