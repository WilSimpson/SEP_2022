import '../setupTests';
import CourseService from './courses';
import axios from 'axios';
import {API_URL} from '../store/store';

jest.mock('axios');

describe('Course Service', () => {
  let courseEditJSON;
  let courseCreateJSON;
  beforeEach(() => {
    courseEditJSON = {
      name: 'Software Engineering Project', 
      department: 'CS', 
      number: '4500', 
      section: '1827',
      semester: 'Spring', 
      userId: 1, 
    };
    courseCreateJSON = {
      name: 'Software Engineering Project', 
      department: 'CS', 
      number: 4500, 
      section: 1827,
      semester: 'Spring', 
      userId: 1, 
    };
  });
  describe('getCourses()', () => {
    it('should make a GET request', () => {
      let spy = jest.spyOn(axios, 'get');
      CourseService.getCourses();
      expect(spy).toHaveBeenCalledWith(`${API_URL}/courses/`); 
    });
  });
  describe('getMyCourses()', () => {
    it('should make a GET request', () => {
      let spy = jest.spyOn(axios, 'get');
      CourseService.getMyCourses(1);
      expect(spy).toHaveBeenCalledWith(`${API_URL}/courses/`); 
    });
  });
  describe('createCourse()', () => {
    it('should make a POST request', () => {
      let spy = jest.spyOn(axios, 'post');
      CourseService.createCourse(
        'Software Engineering Project', 
        'CS', 
        '4500', 
        '1827',
        'Spring', 
        1, 
      );
      expect(spy).toHaveBeenCalledWith(`${API_URL}/courses/`, courseCreateJSON); 
    });
  });
  describe('editCourse()', () => {
    it('should make a PUT request', () => {
      let spy = jest.spyOn(axios, 'put');
      CourseService.editCourse(
        1,
        'Software Engineering Project', 
        'CS', 
        '4500', 
        '1827',
        'Spring', 
        1, 
      );
      expect(spy).toHaveBeenCalledWith(`${API_URL}/courses/1/`, courseEditJSON);
    });
  });
});
