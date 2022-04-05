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
    // has the required row information (see faculty dashboard - must)
    // Include ID
    return axios.get(`${API_URL}/courses/`);
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
    return axios.post(API_URL + '/courses/', {
      name: name,
      department: department,
      number: parseInt(courseNumber),
      section: parseInt(sectionNumber),
      semester: semester,
      userId: userId,
    });
  }

  editCourse(id, name, department, courseNumber, sectionNumber,
      semester, userId) {
    // Sends a post request to api/courses/editCourse/
    // Content is keys: id, name, department, courseNumber,
    // sectionNumber, semester, and userId
    // The userID should be used to make sure that someone is not
    // Editing another person's course
    return axios.put(API_URL + `/courses/${id}/`, {
      name: name,
      department: department,
      number: courseNumber,
      section: sectionNumber,
      semester: semester,
      userId: userId,
    });
  }
}

export default new CourseService();
