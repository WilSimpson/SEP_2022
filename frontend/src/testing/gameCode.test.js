import React from 'react';
import { mount, shallow } from 'enzyme';
import GameCode from '../components/gameCode';
import '../setupTests';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';

describe("<GameCode />", () => {
    let wrapper;
    it ("should render the GameCode component", () => {
        wrapper = shallow(<GameCode />);
    });


    it ('should accept a valid gamecode', () => {
        const { getByTestId } = render(<GameCode />);
        const codeBox =  getByTestId('codeBox');

        expect(codeBox).toBeInTheDocument();
        expect(codeBox.value).toBe('');
        fireEvent.change(codeBox, { target: { value: "123456" } });
        expect(codeBox.value).toBe('123456');
    });

    it ('should have a disabled button', () => {
        const { getByTestId } = render(<GameCode />);
        const submit = document.querySelector("[data-testid=submit]");

        expect(submit).toBeInTheDocument();
        expect(submit.disabled).toBe(true);
    });

    it ('should enable button with valid code', () => {
        const { getByTestId } = render(<GameCode />);
        const codeBox =  getByTestId('codeBox');
        const submit = document.querySelector("[data-testid=submit]");

        expect(submit).toBeInTheDocument();
        expect(submit.disabled).toBe(true);

        fireEvent.change(codeBox, { target: { value: "123456" } });
        expect(submit.disabled).toBe(false);
    });

    it ('should not enable with no input', () => {
        const { getByTestId } = render(<GameCode />);
        const codeBox =  getByTestId('codeBox');
        const submit = document.querySelector("[data-testid=submit]");

        expect(submit).toBeInTheDocument();
        expect(submit.disabled).toBe(true);

        fireEvent.change(codeBox, { target: { value: "" } });
        expect(submit.disabled).toBe(true);
    });

    it ('should not enable non-numerical input', () => {
        const { getByTestId } = render(<GameCode />);
        const codeBox =  getByTestId('codeBox');
        const submit = document.querySelector("[data-testid=submit]");

        expect(submit).toBeInTheDocument();
        expect(submit.disabled).toBe(true);

        fireEvent.change(codeBox, { target: { value: "Hello" } });
        expect(submit.disabled).toBe(true);
    });

    it ('should not enable with input shorter than 6', () => {
        const { getByTestId } = render(<GameCode />);
        const codeBox =  getByTestId('codeBox');
        const submit = document.querySelector("[data-testid=submit]");

        expect(submit).toBeInTheDocument();
        expect(submit.disabled).toBe(true);

        fireEvent.change(codeBox, { target: { value: "12345" } });
        expect(submit.disabled).toBe(true);
    });
});