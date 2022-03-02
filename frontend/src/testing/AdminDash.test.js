import React from 'react';
import { configure, mount, shallow } from 'enzyme';
import '../setupTests';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import AdminDash from '../pages/admin/AdminDash';

describe("<AdminDash />", () => {
    it ("should render the AdminDash component", () => {
        const shallowWrapper = shallow(<AdminDash />);
        expect (shallowWrapper);
    });

    it ("should have an All Games table", () => {
        const { getByTestId } = render(<AdminDash />);
        let gamesTable =  getByTestId('all-games');
        expect(gamesTable).toBeInTheDocument();
    });

    it("should have an indicator to Total Games", () => {
        const { getByTestId } = render(<AdminDash />);
        let totalGamesCard =  getByTestId('total-games');
        expect(totalGamesCard).toBeInTheDocument();
    });

    it ("should have a table to show Active Game Sessions", () => {
        const { getByTestId } = render(<AdminDash />);
        let gameSessionsTable =  getByTestId('active-game-sessions');
        expect(gameSessionsTable).toBeInTheDocument();
    });
});
