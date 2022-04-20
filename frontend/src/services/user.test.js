import React from 'react';
import '../setupTests';
import UserService from './user';
import axios from 'axios';
import {API_URL} from '../store/store';
import {authHeader} from './auth';
import {expect} from '@jest/globals';

jest.mock('axios');

describe('User Service', () => {
  describe('getUser()', () => {
    it ('should make a GET request', () => {
      let spy = jest.spyOn(axios, 'get');
      UserService.getUser();
      expect(spy).toHaveBeenCalledWith(`${API_URL}/users/`, {headers: authHeader()})
    });
  });
});
