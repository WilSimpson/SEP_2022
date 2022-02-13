// import axios from 'axios'
import React from 'react';
import { shallow } from 'enzyme';
import Login from '../components/Login';
import '../setupTests';

describe("LoginComponent", () => {
    it ("should render my component", () => {
        const wrapper = shallow(<Login />);
    });
});
