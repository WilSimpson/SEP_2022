import React from 'react';
import '../../setupTests';
import {shallow} from 'enzyme';
import EditPassword from './editPassword';
import '@testing-library/jest-dom/extend-expect';
import {render, fireEvent, act} from '@testing-library/react';
import PasswordService from '../../services/password';


jest.mock('../../services/password');

describe('<EditPassword />', () => {
  let passwordField;
  let submitButton;

  it('should render Edit password', () => {
    const shallowWrapper = shallow(
        <EditPassword/>,
    );
    expect(shallowWrapper);
  });

  describe('Password Field', () => {
    beforeEach(() => {
      const {getByTestId} = render(
        <EditPassword/>,
      );
      passwordField = getByTestId('password-input');
    });

    it('should exist', () => {
      expect(passwordField).toBeInTheDocument();
    });

    it('should accept input', () => {
      fireEvent.change(passwordField, {target: {value: 'correct'}});
      expect(passwordField.value).toBe('correct');
    });
  });

  describe('Submit Button', () => {
    beforeEach(() => {
      const {getByTestId} = render(
          <EditPassword/>,
      );
      submitButton = getByTestId('submit-button');
      passwordField = getByTestId('password-input');
    });

    it('should exist', () => {
      expect(submitButton).toBeInTheDocument();
    });

    it('should call password service changePassword', async () => {
        const promise = Promise.resolve();
        PasswordService.changePassword.mockResolvedValue({
          response: jest.fn(() => promise),
        });
      
        fireEvent.change(passwordField, {target: {value: 'correct'}});
      fireEvent.click(submitButton)
      expect(PasswordService.changePassword).toHaveBeenCalled();
      await act(() => promise);
    });
  });
});