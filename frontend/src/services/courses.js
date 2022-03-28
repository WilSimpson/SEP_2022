import axios from 'axios';
import {API_URL} from '../store/store';
// import {Courses} from '../helpers/dummyData';

class CourseService {
  getCourses() {
    // Returns all courses
    return axios.get(API_URL + '/courses/');
  }

  getMyCourses(facultyId) {
    // Expects the id of the current user
    // - returns all courses associated with them
    // Expects a response of an array of objects where each object
    // has the required row information
    return axios.get(`${API_URL}/courses/${facultyId}/`);
    // const courses = {
    //   data: Courses,
    // };
    // return Promise.resolve(courses);
  }

  createCourse(name, department, courseNumber, sectionNumber,
      semester, userId) {
    // Sends a post request to api/courses/createCourse/
    // Content is keys: name, department, courseNumber,
    // sectionNumber, semester, and userId
    return axios.post(API_URL + '/courses/createCourse', {
      name: name,
      department: department,
      courseNumber: courseNumber,
      sectionNumber: sectionNumber,
      semester: semester,
      userId: userId,
    });
  }
}

export default new CourseService();
