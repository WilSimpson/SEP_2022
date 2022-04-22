import React from 'react';
import '../../setupTests';
import {shallow, mount} from 'enzyme';
import ForgotPassword from './forgotPassword';

import {render, fireEvent, act} from '@testing-library/react';
import PasswordService from '../../services/password';
import {alertService} from '../../services/alert';
import { BrowserRouter } from 'react-router-dom';


jest.mock('../../services/password');

afterEach(() => {
  jest.clearAllMocks();
});

describe('<ForgotPassword />', () => {
  let emailField;
  let submitButton;

  it('should render Forgot password', () => {
    const shallowWrapper = shallow(
        <ForgotPassword/>,
    );
    expect(shallowWrapper);
  });

  describe('Email Field', () => {
    beforeEach(() => {
      const {getByTestId} = render(
        <ForgotPassword/>,
      );
      emailField = getByTestId('email-input');
    });

    it('should exist', () => {
      expect(emailField).toBeInTheDocument();
    });

    it('should accept input', () => {
      fireEvent.change(emailField, {target: {value: 'correct'}});
      expect(emailField.value).toBe('correct');
    });
  });

  describe('Submit Button', () => {
    beforeEach(() => {
      const {getByTestId} = render(
          <ForgotPassword/>,
      );
      submitButton = getByTestId('submit-button');
      emailField = getByTestId('email-input');
    });

    it('should exist', () => {
      expect(submitButton).toBeInTheDocument();
    });

    it('should call password service checkEmail', async () => {
        const promise = Promise.resolve();
        PasswordService.checkEmail.mockResolvedValue({
          response: jest.fn(() => promise),
        });
      
      fireEvent.change(emailField, {target: {value: 'correct'}});
      fireEvent.click(submitButton);
      expect(PasswordService.checkEmail).toHaveBeenCalled();
      await act(() => promise);
    });

    it('on status 200 it should call alert Service', async () => {
      const promise = Promise.resolve();
      let alertSpy = jest.spyOn(alertService, 'alert');
      PasswordService.checkEmail.mockResolvedValue({status: 200});
      fireEvent.change(emailField, {target: {value: 'correct'}});
      fireEvent.click(submitButton);
      await act(() => promise);
      expect(alertSpy).toHaveBeenCalled();
    });

    it('on status 401 it display error message', async () => {
      const promise = Promise.resolve();
      const event = { preventDefault: () => {} };
      let wrapper = mount(<BrowserRouter><ForgotPassword /></BrowserRouter>)
      PasswordService.checkEmail.mockRejectedValue({response: {status: 401, data: {detail: 'error'}}});
      wrapper.find('#submit-box').hostNodes().simulate('submit', event);
      await act(() => promise);
      wrapper.update();
      expect(wrapper.find({'data-testid': 'err-msg'}).exists()).toBe(true);
    });

    it('on status unknown it display error message', async () => {
      const promise = Promise.resolve();
      const event = { preventDefault: () => {} };
      let wrapper = mount(<BrowserRouter><ForgotPassword /></BrowserRouter>)
      PasswordService.checkEmail.mockRejectedValue({response: {status: 700, data: {detail: 'error'}}});
      wrapper.find('#submit-box').hostNodes().simulate('submit', event);
      await act(() => promise);
      wrapper.update();
      expect(wrapper.find({'data-testid': 'err-msg'}).exists()).toBe(true);
    });
  });
});