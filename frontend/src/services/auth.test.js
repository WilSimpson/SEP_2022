import React from 'react';
import '../setupTests';
import AuthService, {authHeader} from './auth';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import {User} from '../models/user';
import { API_URL } from '../store/store';


jest.mock('axios');
jest.mock('jwt-decode');

afterEach(() => jest.clearAllMocks());

describe('AuthService', () => {
  describe('register', () => {
    it('should return the post response on success', () => {
      const response = {
        response: [
          {
            status: 200,
            data: 'access-token',
          },
        ],
      };
      axios.post.mockResolvedValue(response);

      const result = AuthService.register(
          'valid@gmail.com',
          'morethan6',
          'John',
          'Smith',
          'Faculty',
      );
      // expect(result).toEqual(Promise.resolve(response));
    });

    it('should return the post response on fail', () => {
      const response = {
        response: [
          {
            status: 401,
            data: 'access-token',
          },
        ],
      };
      axios.post.mockResolvedValue(response);

      const result = AuthService.register(
          'valid@gmail.com',
          'morethan6',
          'John',
          'Smith',
          'Faculty',
      );
      // expect(result).toEqual(Promise.resolve(response));
    });
  });
  describe('authHeader()', () => {
    let user;
    beforeEach(() => {
      user = new User('email@test.com', 'Ella', 'Test', 'ADMIN', {access: 'test-token'}, 1);
      localStorage.setItem('user', JSON.stringify(user));
    });
    afterEach(() => {
      localStorage.removeItem('user');
    });
    it ('should return filled out JSON when user exists', () => {
      let response = authHeader();
      expect(response).toEqual({Authorization: 'Bearer ' + user.token.access})
    });
    it ('should return empty JSON when no user', () => {
      localStorage.removeItem('user');
      let response = authHeader();
      expect(response).toEqual({});
    });
  });
  describe('logout()', () => {
    it ('should remove user from localStorage', () => {
      let user = new User('email@test.com', 'Ella', 'Test', 'ADMIN', {access: 'test-token'}, 1);
      localStorage.setItem('user', JSON.stringify(user));
      expect(localStorage.getItem('user')).not.toBeNull();
      AuthService.logout();
      expect(localStorage.getItem('user')).toBeNull();
    });
  });
  describe('login', () => {
    it('should return the post response on success', () => {
      const response = {
        response: [
          {
            status: 200,
            data: 'access-token',
          },
        ],
      };
      axios.post.mockResolvedValue(response);

      const result = AuthService.login('valid@email.com', 'morethan6');
      // expect(result).toEqual(Promise.resolve(response));
    });

    it('should return the post response on fail', () => {
      const response = {
        response: [
          {
            status: 401,
            data: 'access-token',
          },
        ],
      };
      axios.post.mockResolvedValue(response);

      const result = AuthService.login('valid@email.com', 'morethan6');
      // expect(result).toEqual(Promise.resolve(response));
    });

    describe('on success', () => {
      beforeEach(() => {
        localStorage.removeItem('user');
      });
      it('should add a user to localStorage and call jwtDecode', async () => {
        let promise = Promise.resolve();
        jwtDecode.mockReturnValue({
          email: 'test@email.com',
          role: 'ADMIN'
        });
        let response = {
          status: 200,
          data: {
            access: 'access-token',
          }
        };
        axios.post.mockResolvedValue(response);
        AuthService.login('test-email', 'test-password');
        await promise;
        expect(jwtDecode).toHaveBeenCalled();
        expect(localStorage.getItem('user')).not.toBeNull();
      });
    });
  });
});
