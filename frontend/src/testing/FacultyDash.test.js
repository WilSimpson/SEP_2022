import React from 'react';
import { configure, mount, shallow } from 'enzyme';
import '../setupTests';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import FacultyDash from '../components/FacultyDash';
import { User } from '../models/user.model';

describe("<FacultyDash />", () => {
    it ("should render the FacultyDash component", () => {
        const result = new User('test@test.com', '', '', 'FACULTY', 'jwt-token');
        localStorage.setItem('user', JSON.stringify(result));
        const shallowWrapper = shallow(<FacultyDash />);
        expect (shallowWrapper);
    });

    it ("should have an All Games table", () => {
        const result = new User('test@test.com', '', '', 'FACULTY', 'jwt-token');
        localStorage.setItem('user', JSON.stringify(result));
        const { getByTestId } = render(<FacultyDash />);
        let gamesTable =  getByTestId('all-games');
        expect(gamesTable).toBeInTheDocument();
    });

    it("should have an indicator to Total Games", () => {
        const result = new User('test@test.com', '', '', 'FACULTY', 'jwt-token');
        localStorage.setItem('user', JSON.stringify(result));
        const { getByTestId } = render(<FacultyDash />);
        let totalGamesCard =  getByTestId('total-games');
        expect(totalGamesCard).toBeInTheDocument();
    });

    it ("should have a table to show Active Game Sessions", () => {
        const result = new User('test@test.com', '', '', 'FACULTY', 'jwt-token');
        localStorage.setItem('user', JSON.stringify(result));
        const { getByTestId } = render(<FacultyDash />);
        let gameSessionsTable =  getByTestId('active-game-sessions');
        expect(gameSessionsTable).toBeInTheDocument();
    });
});
