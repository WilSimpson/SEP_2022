import React from 'react';
import '../../setupTests';
import authService from '../../services/auth';
import Logout from './logout';
import {render} from 'enzyme';
import {expect} from '@jest/globals';

jest.mock('../../services/auth')

describe('<Logout />', () => {
  it ('should call auth service logout function', () => {
    let spy = jest.spyOn(authService, 'logout');
    render(<Logout />);
    expect(spy).toHaveBeenCalled();
  });
});