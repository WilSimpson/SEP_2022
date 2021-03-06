import React from 'react';
import '../setupTests';
import GameSessionService from './gameSession';
import axios from 'axios';
import {API_URL} from '../store/store';
import {gameSessions} from '../helpers/dummyData';


jest.mock('axios');

describe('GameSessionService', () => {
  describe('getGameSessions', () => {
    // uncomment when code is updated
    it ('should make a GET request', () => {
      let spy = jest.spyOn(axios, 'get');
      GameSessionService.getGameSessions(1);
      expect(spy).toHaveBeenCalledWith(`${API_URL}/game/1/gameSessions/`);
   });
  });
  describe('createGameSession', () => {
    it ('should make POST request', () => {
      let gameSessionJSON = { 
        courseID: NaN,
        creator_id: 1,
        id: 1,
        isGuest: undefined,
        notes: 'this is a note',
        timeout: 19,
        courseID: 1,
        isGuest: false,
      };
      let spy = jest.spyOn(axios, 'post').mockImplementation();
      GameSessionService.createGameSession(
        1,
        1,
        'this is a note',
        19,
        1,
        false,
      );
      expect(spy).toHaveBeenCalled();
    });
  });
  describe('getReport', () => {
    it ('should make GET request', () => {
      let spy = jest.spyOn(axios, 'get').mockImplementation();
      GameSessionService.getReport(1, 1, true);
      expect(spy).toHaveBeenCalledWith(
        `${API_URL}/games/1/sessions/1/report/`,
        {headers: {'accept': 'text/csv'}}
      )
    });
  });

});