import {formatDate} from '../helpers/DateFormatter';

class GameQuestion {
  constructor(id, value, passcode, chance, game_id) {
    this.id = id;
    this.value = value;
    this.password = passcode;
    this.chance = chance;
    this.game_id = game_id;
  }
}

class GameOption {
  constructor(id, value, weight, dest_question_id, source_question_id) {
    this.id = id;
    this.value = value;
    this.weight = weight;
    this.dest_question_id = dest_question_id;
    this.source_question_id = source_question_id;
  }
}

class Game {
  constructor(id, title, creator_id, active, createdAt, questions, options) {
    this.id = id;
    this.title = title;
    this.creator_id = creator_id;
    this.active = active;
    this.questions = questions;
    this.options = options;
  }

  status() {
    return this.active ? 'active' : 'inactive';
  }

  formatCreatedAt() {
    return formatDate(this.createdAt);
  }

  asOption() {
    return {label: this.title, id: this.id};
  }
}

export {Game, GameQuestion, GameOption};
