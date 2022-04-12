import '../setupTests';
import GameService from './game';
import axios from 'axios';
import {API_URL} from '../store/store';

jest.mock('axios');

describe('Game Service', () => {
  let gameJSON;
  beforeEach(() => {
    gameJSON = {
      active: true, 
      code: 123456, 
      creator_id: 1, 
      options: {},
      questions: {}, 
      title: 'testGame', 
    };
  });
  describe('getGames()', () => {
    it ('should make GET request', () => {
      let spy = jest.spyOn(axios, 'get');
      GameService.getGames();
      expect(spy).toHaveBeenCalledWith(`${API_URL}/games/`); 
    });
  });
  describe('getGame()', () => {
    it ('should make GET request', () => {
      let spy = jest.spyOn(axios, 'get');
      GameService.getGame(1);
      expect(spy).toHaveBeenCalledWith(`${API_URL}/games/1/`); 
    });
  });
  describe('createGame()', () => {
    it ('should make POST request', () => {
      let spy = jest.spyOn(axios, 'post');
      GameService.createGame(
        'testGame', 
        true, 
        1, 
        123456, 
        JSON.stringify({}), 
        JSON.stringify({})
      );
      expect(spy).toHaveBeenCalledWith(`${API_URL}/games/`, gameJSON); 
    });
  });
  describe('updateGame()', () => {
    it ('should make PUT request', () => {
      let spy = jest.spyOn(axios, 'put');
      GameService.updateGame(
        1,
        'testGame', 
        true, 
        1, 
        123456, 
        JSON.stringify({}), 
        JSON.stringify({})
      );
      expect(spy).toHaveBeenCalledWith(`${API_URL}/games/1/`, gameJSON); 
    });
  });
  describe('deleteGame()', () => {
    it ('should make DELETE request', () => {
      let spy = jest.spyOn(axios, 'delete');
      GameService.deleteGame(1);
      expect(spy).toHaveBeenCalledWith(`${API_URL}/games/1/`);
    });
  });
});