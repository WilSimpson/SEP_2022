import React from 'react';
import { configure, mount, shallow } from 'enzyme';
import Passcode from '../components/passcode';
import '../setupTests';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import GameService from '../services/gameServices';

jest.mock('../services/gameServices');

describe("<Passcode />", () => {
    let passwordField;
    let submitButton;


    it ("should render the Passcode component", () => {
        const shallowWrapper = shallow(<Passcode data={{question:"/#", location:"SC123"}} />);
        expect (shallowWrapper);
    });


    describe("Password Field", () => {
        beforeEach(() => {
            const { getByTestId } = render(<Passcode data={{question:"/#", location:"SC123"}} />);
            passwordField = getByTestId('pass-input');
        });

        it ('should exist', () => {
            expect(passwordField).toBeInTheDocument();
        });

        it ('should accept input', () => {
            fireEvent.change(passwordField, { target: { value: "correct" } });
            expect(passwordField.value).toBe("correct");
        });
    });

    describe("Submit Button", () => {
        beforeEach(() => {
            const { getByTestId } = render(<Passcode data={{question:"/#", location:"SC123"}} />);
            submitButton = getByTestId('submit-button');
            passwordField = getByTestId('pass-input');
        });

        it ('should exist', () => {
            expect(submitButton).toBeInTheDocument();
        });

        it ('should call gameServices GameService when clicked', () => {
            GameService.checkPasscode.mockResolvedValue({
              response: [{status: 200}]
            });

            fireEvent.change(passwordField, { target: { value: "correct" } });
            fireEvent.click(submitButton);
            expect(GameService.checkPasscode).toHaveBeenCalled();
        });

    });
});