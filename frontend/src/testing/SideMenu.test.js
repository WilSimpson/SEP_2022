import React from 'react';
import { configure, mount, shallow } from 'enzyme';
import '../setupTests';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import { SideMenu } from '../components/SideMenu';



describe("<SideMenu />", () => {
    
    it ("should render the SideMenu component", () => {
        const shallowWrapper = shallow(<SideMenu />);
        expect (shallowWrapper);
    });
    describe("Dashboard Button", () => {
        it("should have clickable dashboard button", () => {
            const { getByTestId } = render(<SideMenu />);
            let dashboardLink =  getByTestId('dashboard-item');
            expect(dashboardLink).toBeInTheDocument();
            expect(dashboardLink).not.toBeDisabled();
        });
    });

    describe("Game Management Button", () => {
        it("should have clickable game management button", () => {
            const { getByTestId } = render(<SideMenu />);
            let gameManageLink =  getByTestId('game-manage-item');
            expect(gameManageLink).toBeInTheDocument();
            expect(gameManageLink).not.toBeDisabled();
        });

        it ("should reveal 3 new buttons when clicked", () => {
            const { getByTestId } = render(<SideMenu />);
            let gameManageLink =  getByTestId('game-manage-item');
            try {
                let createGame = getByTestId('game-develop-item');
                let editGame = getByTestId('game-edit-item');
                let viewGame = getByTestId('game-view-item');
            } catch (error) {
                expect(error);                 
            }
            fireEvent.click(gameManageLink);
            let createGame = getByTestId('game-develop-item');
            let editGame = getByTestId('game-edit-item');
            let viewGame = getByTestId('game-view-item');
            expect(createGame).toBeInTheDocument();
            expect(createGame).not.toBeDisabled();
            expect(editGame).toBeInTheDocument();
            expect(editGame).not.toBeDisabled();
            expect(viewGame).toBeInTheDocument();
            expect(viewGame).not.toBeDisabled();
        });
    });

    describe("User Management Button", () => {
        it("should have clickable user management button", () => {
            const { getByTestId } = render(<SideMenu />);
            let userManageLink =  getByTestId('user-manage-item');
            expect(userManageLink).toBeInTheDocument();
            expect(userManageLink).not.toBeDisabled();
        });

        it ("should reveal 3 new buttons when clicked", () => {
            const { getByTestId } = render(<SideMenu />);
            let userManageLink =  getByTestId('user-manage-item');
            try {
                let createUser = getByTestId('user-create-item');
                let editUser = getByTestId('user-edit-item');
                let viewUser = getByTestId('user-view-item');
            } catch (error) {
                expect(error);                 
            }
            fireEvent.click(userManageLink);
            let createUser = getByTestId('user-create-item');
            let editUser = getByTestId('user-edit-item');
            let viewUser = getByTestId('user-view-item');
            expect(createUser).toBeInTheDocument();
            expect(createUser).not.toBeDisabled();
            expect(editUser).toBeInTheDocument();
            expect(editUser).not.toBeDisabled();
            expect(viewUser).toBeInTheDocument();
            expect(viewUser).not.toBeDisabled();
        });
    });
    
    describe("Reports Button", () => {
        it("should have clickable reports button", () => {
            const { getByTestId } = render(<SideMenu />);
            let reportsLink =  getByTestId('reports-item');
            expect(reportsLink).toBeInTheDocument();
            expect(reportsLink).not.toBeDisabled();
        });
    });
    

    describe("Logout Button", () => {
        it("should have clickable logout button", () => {
            const { getByTestId } = render(<SideMenu />);
            let logoutLink =  getByTestId('logout-item');
            expect(logoutLink).toBeInTheDocument();
            expect(logoutLink).not.toBeDisabled();
        });
    });
    

    describe("Help Button", () => {
        it("should have clickable help button", () => {
            const { getByTestId } = render(<SideMenu />);
            let helpLink =  getByTestId('help-item');
            expect(helpLink).toBeInTheDocument();
            expect(helpLink).not.toBeDisabled();
        });

        it ("should reveal 2 new buttons when clicked", () => {
            const { getByTestId } = render(<SideMenu />);
            let helpLink =  getByTestId('help-item');
            try {
                let gettingStarted = getByTestId('getting-started-item');
                let about = getByTestId('about-item');
            } catch (error) {
                expect(error);                 
            }
            fireEvent.click(helpLink);
            let gettingStarted = getByTestId('getting-started-item');
            let about = getByTestId('about-item');
            expect(gettingStarted).toBeInTheDocument();
            expect(gettingStarted).not.toBeDisabled();
            expect(about).toBeInTheDocument();
            expect(about).not.toBeDisabled();
        });
    });
});
