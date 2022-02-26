import React from 'react';
import { configure, mount, shallow } from 'enzyme';
import '../setupTests';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import FacultyDash from '../components/FacultyDash';

describe("<FacultyDash />", () => {
    it ("should render the FacultyDash component", () => {
        const shallowWrapper = shallow(<FacultyDash />);
        expect (shallowWrapper);
    });

    it ("should have an All Games table", () => {
        const { getByTestId } = render(<FacultyDash />);
        let gamesTable =  getByTestId('all-games');
        expect(gamesTable).toBeInTheDocument();
    });

    it("should have an indicator to Total Games", () => {
        const { getByTestId } = render(<FacultyDash />);
        let totalGamesCard =  getByTestId('total-games');
        expect(totalGamesCard).toBeInTheDocument();
    });

    it ("should have a table to show Active Game Sessions", () => {
        const { getByTestId } = render(<FacultyDash />);
        let gameSessionsTable =  getByTestId('active-game-sessions');
        expect(gameSessionsTable).toBeInTheDocument();
    });
});
