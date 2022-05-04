import React from 'react';
import '../../setupTests';
import {shallow, mount} from 'enzyme';
import EditPassword from './editPassword';

import {render, fireEvent, act} from '@testing-library/react';
import PasswordService from '../../services/password';
import { alertService } from '../../services/alert';
import { BrowserRouter } from 'react-router-dom';



jest.mock('../../services/password');

afterEach(() => {
  jest.clearAllMocks();
});

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
        <BrowserRouter><EditPassword/></BrowserRouter>,
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
        <BrowserRouter><EditPassword/></BrowserRouter>,
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

    it('on status 200 it should call alert Service', async () => {
      const promise = Promise.resolve();
      let alertSpy = jest.spyOn(alertService, 'alert');
      PasswordService.changePassword.mockResolvedValue({status: 200});
      fireEvent.change(passwordField, {target: {value: 'correct'}});
      fireEvent.click(submitButton)
      await act(() => promise);
      expect(alertSpy).toHaveBeenCalled();
    });

    it('on status 400 it should display error message', async () => {
      const promise = Promise.resolve();
      const event = { preventDefault: () => {} };
      PasswordService.changePassword.mockRejectedValue({response: {status: 400, data: {password: ['error']}}});
      let wrapper = mount(<BrowserRouter><EditPassword /></BrowserRouter>)
      wrapper.find('#submit-box').hostNodes().simulate('submit', event);
      await act(() => promise);
      wrapper.update();
      expect(wrapper.find({'data-testid': 'err-msg'}).exists()).toBe(true);
    });

    it('on status unknown status it should display error message', async () => {
      const promise = Promise.resolve();
      const event = { preventDefault: () => {} };
      PasswordService.changePassword.mockRejectedValue({response: {status: 700, data: {password: ['error']}}});
      let wrapper = mount(<BrowserRouter><EditPassword /></BrowserRouter>)
      wrapper.find('#submit-box').hostNodes().simulate('submit', event);
      await act(() => promise);
      wrapper.update();
      expect(wrapper.find({'data-testid': 'err-msg'}).exists()).toBe(true);
    });
  });
});