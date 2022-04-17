import React from 'react';
import '../../setupTests';
import {shallow, mount} from 'enzyme';
import Register from './register';
import '@testing-library/jest-dom/extend-expect';
import {render, fireEvent, act} from '@testing-library/react';
import AuthService from '../../services/auth';
import { BrowserRouter } from 'react-router-dom';
import { Alert } from '@mui/material';

const mockedNavigate = jest.fn();

jest.mock('../../services/auth');
jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom")), 
  useNavigate: () => mockedNavigate,
}));

describe('<Register />', () => {
  let emailField;
  let passwordField;
  let firstField;
  let lastField;
  let roleSelect;
  let submitButton;

  it('should render the Register component', () => {
    const shallowWrapper = shallow(<Register />);
    expect(shallowWrapper);
  });

  describe('Email Field', () => {
    beforeEach(() => {
      const {getByTestId} = render(<Register />);
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
      const {getByTestId} = render(<Register />);
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

  describe('First Name Field', () => {
    beforeEach(() => {
      const {getByTestId} = render(<Register />);
      firstField = getByTestId('first-input');
    });

    it('should exist', () => {
      expect(firstField).toBeInTheDocument();
    });

    it('should accept input', () => {
      fireEvent.change(firstField, {target: {value: 'John'}});
      expect(firstField.value).toBe('John');
    });
  });

  describe('Last Name Field', () => {
    beforeEach(() => {
      const {getByTestId} = render(<Register />);
      lastField = getByTestId('last-input');
    });

    it('should exist', () => {
      expect(lastField).toBeInTheDocument();
    });

    it('should accept input', () => {
      fireEvent.change(lastField, {target: {value: 'Smith'}});
      expect(lastField.value).toBe('Smith');
    });
  });

  describe('Select Role Drop-down', () => {
    beforeEach(() => {
      const {getByTestId} = render(<Register />);
      roleSelect = getByTestId('role-select');
    });

    it('should exist', () => {
      expect(roleSelect).toBeInTheDocument();
    });

    // add more tests for drop down
  });

  // haven't changed submit button test to account for other fields not being
  // selected, functionality for this needs to be done in Register.js as well
  describe('Submit Button', () => {
    beforeEach(() => {
      const {getByTestId} = render(<Register />);
      submitButton = getByTestId('submit-button');
      passwordField = getByTestId('pass-input');
      emailField = getByTestId('email-input');
      firstField = getByTestId('first-input');
      lastField = getByTestId('last-input');
      roleSelect = getByTestId('role-select');
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

    describe('AuthService.register', () => {
      let wrapper;
      beforeEach(async () => {
        await act(async () => {
          wrapper = mount(
            <BrowserRouter>
              <Register />
            </BrowserRouter>
          );
        });
        wrapper.find('#first').hostNodes().simulate('change', {target:{value:'Hello'}});
        wrapper.find('#last').hostNodes().simulate('change', {target:{value:'Hello'}});
        wrapper.find('#email').hostNodes().simulate('change', {target:{value:'example@email.com'}});
        wrapper.find('#password').hostNodes().simulate('change', {target:{value:'HelloW'}});
        wrapper.find('#role').last().simulate('change', {target:{value:'Faculty'}});
      });
      it('should call register when submit button clicked', async () => {
        AuthService.register.mockResolvedValue({});
        wrapper.update();
        const promise = Promise.resolve();
        wrapper.find({'data-testid': 'submit-button'}).hostNodes().simulate('click', {target:{value:'hi'}});
        await act(() => promise);
        expect(AuthService.register).toHaveBeenCalled();
      });
      describe('register on success', () => {
        it('should navigate to admin-dashboard when status 201', async () => {
          AuthService.register.mockResolvedValue({status: 201});
          wrapper.update();
          const promise = Promise.resolve();
          wrapper.find({'data-testid': 'submit-button'}).hostNodes().simulate('click', {target:{value:'hi'}});
          await act(() => promise);
          expect(mockedNavigate).toHaveBeenCalledWith('/admin-dashboard');
        }); 
        it ('should display error message when other status', async () => {
          AuthService.register.mockResolvedValue({status: 700});
          wrapper.update();
          const promise = Promise.resolve();
          wrapper.find({'data-testid': 'submit-button'}).hostNodes().simulate('click', {target:{value:'hi'}});
          await act(() => promise);
          wrapper.update();
          expect(wrapper.find(Alert).prop('children')).toEqual(
            `There was an issue handling your account registration. ` + 
                `Please try again later.`
          );
        });       
      });
      describe('register on fail', () => {
        it('should display error message when status 401', async () => {
          AuthService.register.mockRejectedValue({response: {data: {detail: 'error'},status: 401}});
          wrapper.update();
          const promise = Promise.resolve();
          wrapper.find({'data-testid': 'submit-button'}).hostNodes().simulate('click', {target:{value:'hi'}});
          await act(() => promise);
          wrapper.update();
          expect(wrapper.find(Alert).prop('children')).toEqual('error');
        });
        it('should display error message when other status', async () => {
          AuthService.register.mockRejectedValue({response: {data: {detail: 'error'},status: 700}});
          wrapper.update();
          const promise = Promise.resolve();
          wrapper.find({'data-testid': 'submit-button'}).hostNodes().simulate('click', {target:{value:'hi'}});
          await act(() => promise);
          wrapper.update();
          expect(wrapper.find(Alert).prop('children')).toEqual(
            'There was an unexpected error. Please try again later.'
          );
        });
      });
    });
  });
});
