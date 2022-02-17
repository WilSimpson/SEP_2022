// import axios from 'axios'
import 'jsdom-global/register';     
import React from 'react';
import { mount, shallow } from 'enzyme';
import Login from '../components/Login';
import '../setupTests';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';

describe("<Login />", () => {
    let wrapper;
    it ("should render my Login component", () => {
        wrapper = shallow(<Login />);
    });


    it ('should have an email input feild', () => {
        const { getByTestId } = render(<Login />);
        const emailFeild =  getByTestId('email-input');

        expect(emailFeild).toBeInTheDocument();
        expect(emailFeild.value).toBe('');
        fireEvent.change(emailFeild, { target: { value: "email" } });
        expect(emailFeild.value).toBe('email');
    });
});
