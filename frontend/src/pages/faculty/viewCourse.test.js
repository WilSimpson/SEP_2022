import React from 'react';
import CoursesTable from '../../components/faculty/coursesTable';
import '../../setupTests';
import ViewCoursePage from './viewCourse';
import {shallow} from 'enzyme';

describe('<ViewCoursePage />', () => {
  it ('should render CoursesTable', () => {
    const wrapper = shallow(<ViewCoursePage />);
    expect (wrapper.find(CoursesTable)).toHaveLength(1);
  });
});