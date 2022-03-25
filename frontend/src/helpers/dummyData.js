export const Games = require('./games.json');
export const Courses = require('./courses.json');

function createGameSessionTable(id, name, starttime, endtime, gamecode) {
  return {id, name, starttime, endtime, gamecode};
}

export const gameSessions = [
  createGameSessionTable(0, 'Biomedical', '2022-05-01', '2022-05-30', '973380'),
  createGameSessionTable(1, 'Biomedical', '2022-05-01', '2022-05-30', '113018'),
  createGameSessionTable(2, 'Biomedical', '2022-05-01', '2022-05-30', '470337'),
  createGameSessionTable(3, 'Biomedical', '2022-05-01', '2022-05-30', '442590'),
  createGameSessionTable(4, 'Biomedical', '2022-05-01', '2022-05-30', '796420'),
  createGameSessionTable(5, 'Biomedical', '2022-05-01', '2022-05-30', '651756'),
];

