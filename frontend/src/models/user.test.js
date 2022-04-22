import React from 'react';
import '../setupTests';
import { User } from "./user";


describe('User model', () => {
  let adminUser;
  let facultyUser;
  beforeEach(() => {
    adminUser = new User('email@email.com', 'Test', 'Test', 'ADMIN', null, 1);
    facultyUser = new User('email@email.com', 'Test', 'Test', 'FACULTY', null, 1);
  });

  describe('isAdmin()', () => {
    it ('should return true when user is an admin', () => {
      expect(adminUser.isAdmin()).toEqual(true);
    });
    
    it ('should return false when user is not an admin', () => {
      expect(facultyUser.isAdmin()).toEqual(false);
    });
  });

  describe('isFaculty()', () => {
    it ('should return true when user is a faculty', () => {
      expect(facultyUser.isFaculty()).toEqual(true);
    });
    
    it ('should return false when user is not a faculty', () => {
      expect(adminUser.isFaculty()).toEqual(false);
    });
  });
});