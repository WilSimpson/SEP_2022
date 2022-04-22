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
    // it ('should make a GET request', () => {
    //   let spy = jest.spyOn(axios, 'get');
    //   GameSessionService.getGameSessions(1);
    //   expect(spy).toHaveBeenCalledWith(`${API_URL}/games/1/sessions/`); 
    // });

    // delete when implemented
    it ('should return gameSessions from dummyData', () => {
      let response = GameSessionService.getGameSessions();
      expect(response).toEqual(gameSessions);
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
        timeout: 19
      };
      let spy = jest.spyOn(axios, 'post');
      GameSessionService.createGameSession(
        1,
        1,
        'this is a note',
        19
      );
      expect(spy).toHaveBeenCalled();
    });
  });
  describe('getReport', () => {
    it ('should make GET request', () => {
      let spy = jest.spyOn(axios, 'get');
      GameSessionService.getReport(1, 1, true);
      expect(spy).toHaveBeenCalledWith(
        `${API_URL}/games/1/sessions/1/report/`,
        {headers: {'accept': 'text/csv'}}
      )
    });
  });

});