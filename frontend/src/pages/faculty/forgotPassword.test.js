import React from 'react';
import {shallow} from 'enzyme';
import ForgotPassword from './forgotPassword';
import '../../setupTests';
import '@testing-library/jest-dom/extend-expect';
import {render, fireEvent, act} from '@testing-library/react';
import PasswordService from '../../services/password';


jest.mock('../../services/password');

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
      fireEvent.click(submitButton)
      expect(PasswordService.checkEmail).toHaveBeenCalled();
      await act(() => promise);
    });
  });
});