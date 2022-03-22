import axios from 'axios';
import {API_URL} from '../store/store';

class CourseService {
  getCourses() {
    // Returns all courses
    return axios.get(API_URL + '/courses/');
  }

  getMyCourses(facultyId) {
    // Expects the id of the current user
    // - returns all courses associated with them
    return axios.get(`${API_URL}/courses/${facultyId}/`);
  }
}

export default new CourseService();
