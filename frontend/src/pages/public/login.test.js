import React from 'react';
import '../../setupTests';
import {shallow} from 'enzyme';
import Login from './login';
import '@testing-library/jest-dom/extend-expect';
import {render, fireEvent, act} from '@testing-library/react';
import AuthService from '../../services/auth';
import ForgotPassword from '../faculty/forgotPassword';

jest.mock('../../services/auth');

describe('<Login />', () => {
  let emailField;
  let passwordField;
  let submitButton;
  let forgot;

  it('should render the Login component', () => {
    const shallowWrapper = shallow(<Login />);
    expect(shallowWrapper);
  });

  describe('Email Field', () => {
    beforeEach(() => {
      const {getByTestId} = render(<Login />);
      emailField = getByTestId('email-input');
    });

    it('should exist', () => {
      expect(emailField).toBeInTheDocument();
    });

    it('should accept input', () => {
      fireEvent.change(emailField, {target: {value: 'email@email.com'}});
      expect(emailField.value).toBe('email@email.com');
    });
  });

  describe('Password Field', () => {
    beforeEach(() => {
      const {getByTestId} = render(<Login />);
      passwordField = getByTestId('pass-input');
    });

    it('should exist', () => {
      expect(passwordField).toBeInTheDocument();
    });

    it('should accept input', () => {
      fireEvent.change(passwordField, {target: {value: 'password123'}});
      expect(passwordField.value).toBe('password123');
    });
  });

  describe('Submit Button', () => {
    beforeEach(() => {
      const {getByTestId} = render(<Login />);
      submitButton = getByTestId('submit-button');
      passwordField = getByTestId('pass-input');
      emailField = getByTestId('email-input');
    });

    it('should exist', () => {
      expect(submitButton).toBeInTheDocument();
    });

    it('should be disabled when fields are empty', () => {
      expect(passwordField.value).toBe('');
      expect(emailField.value).toBe('');
      expect(submitButton).toBeDisabled();
    });

    it('should be disabled when email is valid and password is invalid', () => {
      fireEvent.change(emailField, {target: {value: 'valid@email.com'}});
      fireEvent.change(passwordField, {target: {value: 'bad'}});

      expect(submitButton).toBeDisabled();
    });

    it('should be disabled when email is invalid and password is valid', () => {
      fireEvent.change(emailField, {target: {value: 'invalid-email'}});
      fireEvent.change(passwordField, {target: {value: 'morethan6'}});
      expect(submitButton).toBeDisabled();
    });

    it('should not be disabled when email is valid and password is valid', () => {
      fireEvent.change(emailField, {target: {value: 'valid@email.com'}});
      fireEvent.change(passwordField, {target: {value: 'morethan6'}});
      expect(submitButton).not.toBeDisabled();
    });

    it('should call AuthService login when clicked', async () => {
      const promise = Promise.resolve();
      AuthService.login.mockResolvedValue({
        response: jest.fn(() => promise),
      });

      fireEvent.change(emailField, {target: {value: 'valid@email.com'}});
      fireEvent.change(passwordField, {target: {value: 'morethan6'}});
      fireEvent.click(submitButton);

      expect(AuthService.login).toHaveBeenCalled();
      await act(() => promise);
    });
  });
  describe('Forgot password', () => {
    beforeEach(() => {
      const {getByTestId} = render(<Login />);
      forgot = getByTestId('forgot-link');
    });

    it('should exist', () => {
      expect(forgot).toBeInTheDocument();
    });

    it('go to forgot password page', () => {
      fireEvent.click(forgot);
      const shallowWrapper = shallow(<ForgotPassword />);
      expect(shallowWrapper);
    });
  });
});
