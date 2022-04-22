import React from 'react';
import '../setupTests';
import { Game, GameOption, GameQuestion } from "./game";
import * as dateFormatter from '../helpers/dateFormatter';



describe('Game model', () => {
  describe('Game', () => {});
  describe('Game Question', () => {
    it ('can be created', () => {
      let gameQuestion = new GameQuestion(1, 'test value', 123456, true, 1);
      expect(gameQuestion);
    });
  });
  describe('Game Option', () => {
    it ('can be created', () => {
      let gameOption = new GameOption(1, 'test value', 3, 1, 1);
      expect(gameOption);
    });
  });
  describe('Game', () => {
    let gameActive;
    let gameInactive;
    beforeEach(() => {
      gameActive = new Game(1, 'test game', 1, true, new Date(), null, null);
      gameInactive = new Game(1, 'test game', 1, false, new Date(), null, null);
    });
    it ('can be created', () => {
      expect(gameActive);
      expect(gameInactive);
    });
    describe('status()', () => {
      it ('should return active when game is active', () => {
        expect(gameActive.status()).toEqual('active');
      });
      it ('should return inactive when game is inactive', () => {
        expect(gameInactive.status()).toEqual('inactive');
      });
    });
    describe('formatCreatedAt()', () => {
      it ('should call formatDate', () => {
        let spy = jest.spyOn(dateFormatter, 'formatDate');
        gameActive.formatCreatedAt();
        expect(spy).toHaveBeenCalledWith(gameActive.createdAt);
      });
    });
    describe('asOption()', () => {
      it ('should return object with label and id', () => {
        expect(gameActive.asOption()).toEqual(
          {label: gameActive.title, id: gameActive.id}
        );
      });
    });
  });
});