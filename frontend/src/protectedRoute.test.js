import React from 'react';
import './setupTests';
import ProtectedRoute from './protectedRoute';
import AdminDash from './pages/admin/dashboard';
import * as redux from 'react-redux';
import AuthService from './services/auth';
import { User } from './models/user';
import {shallow} from 'enzyme';
import {Navigate} from 'react-router-dom';


jest.mock('./services/auth');
jest.mock('./models/user');

describe('<ProtectedRoute />', () => {
  beforeEach(() => {
    User.mockClear();
  });
  it ('should render Login component when not logged in', () => {
    const user = new User('email@email.com', 'Test', 'Test', 'ADMIN', null, 1);
    let spy = jest.spyOn(user, 'isAdmin').mockImplementation(() => true);
    const spyRedux = jest.spyOn(redux, 'useSelector');
    // returns user is not logged in
    spyRedux.mockReturnValue(false);  
    AuthService.currentUser.mockImplementation(() => user);
 
    let wrapper = shallow(<ProtectedRoute children={<AdminDash />}/>);
    expect(wrapper.find(Navigate)).toHaveLength(1);

    const propLoginPath = wrapper
      .find(Navigate)
      .filterWhere((i) => i.prop('to') == '/login');
    expect(propLoginPath.getElement()).not.toBeNull();
    
    spy.mockRestore();
    spyRedux.mockRestore();
  });

  it ('should render child component when logged in', () => {
    const user = new User('email@email.com', 'Test', 'Test', 'ADMIN', null, 1);
    let spy = jest.spyOn(user, 'isAdmin').mockImplementation(() => true);
    const spyRedux = jest.spyOn(redux, 'useSelector');
    // returns user is logged in
    spyRedux.mockReturnValue(true);  
    AuthService.currentUser.mockImplementation(() => user);
 
    let wrapper = shallow(<ProtectedRoute children={<AdminDash />}/>);
    expect(wrapper.find(AdminDash)).toHaveLength(1);

    spy.mockRestore();
    spyRedux.mockRestore();
  });
});