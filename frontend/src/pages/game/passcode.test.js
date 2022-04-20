import React from 'react';
import '../../setupTests';
import {shallow} from 'enzyme';
import Passcode from './passcode';

import {render, fireEvent} from '@testing-library/react';
import {Button} from '@mui/material';



jest.mock('../../services/gameplay');

describe('<Passcode />', () => {
  let passwordField;
  let submitButton;

  it('should render the Passcode component', () => {
    const shallowWrapper = shallow(
        <Passcode data={{question: '/#', location: 'SC123'}} />,
    );
    expect(shallowWrapper);
  });

  describe('Password Field', () => {
    beforeEach(() => {
      const {getByTestId} = render(
          <Passcode data={{question: '/#', location: 'SC123'}} />,
      );
      passwordField = getByTestId('pass-input');
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
          <Passcode data={{question: '/#', location: 'SC123'}} />,
      );
      submitButton = getByTestId('submit-button');
      passwordField = getByTestId('pass-input');
    });

    it('should exist', () => {
      expect(submitButton).toBeInTheDocument();
    });

    it('should call prop function when clicked', () => {
      const myFunc = jest.fn();
      let wrapper = shallow(<Passcode data={{question: '/#', location: 'SC123'}} submitPasscode={myFunc} />);
      const input = wrapper
      .find(Button)
      .filterWhere((i) => i.prop('children') == 'Continue');
      expect(input.getElement()).not.toBeNull();
      input.simulate('click', {
        preventDefault: () => {}
      });
      expect(myFunc).toHaveBeenCalled();
    });
  });
});
