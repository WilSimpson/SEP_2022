import React from 'react';
import AuthService from './auth';
import axios from 'axios';

jest.mock('axios');

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
      expect(result).toEqual(Promise.resolve(response));
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
      expect(result).toEqual(Promise.resolve(response));
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
      expect(result).toEqual(Promise.resolve(response));
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
      expect(result).toEqual(Promise.resolve(response));
    });
  });
});
