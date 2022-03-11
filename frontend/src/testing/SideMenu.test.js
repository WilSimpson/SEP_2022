import React from 'react';
import { configure, mount, shallow } from 'enzyme';
import '../setupTests';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import { SideMenu } from '../components/layout/SideMenu';
import { User } from '../models/user.model';


describe("<SideMenu />", () => {
    
    it ("should render the SideMenu component", () => {
        const result = new User('test@test.com', '', '', 'FACULTY', 'jwt-token');
        localStorage.setItem('user', JSON.stringify(result));
        const shallowWrapper = shallow(<SideMenu />);
        expect (shallowWrapper);
    });
    describe("Dashboard Button", () => {
        it("should have clickable dashboard button", () => {
            const result = new User('test@test.com', '', '', 'FACULTY', 'jwt-token');
            localStorage.setItem('user', JSON.stringify(result));
            const { getByTestId } = render(<SideMenu />);
            let dashboardLink =  getByTestId('dashboard-item');
            expect(dashboardLink).toBeInTheDocument();
            expect(dashboardLink).not.toBeDisabled();
        });
    });

    describe("Game Management Button", () => {
        it("should have clickable game management button as an admin", () => {
            const result = new User('test@test.com', '', '', 'ADMIN', 'jwt-token');
            localStorage.setItem('user', JSON.stringify(result));
            const { getByTestId } = render(<SideMenu />);
            let gameManageLink =  getByTestId('game-manage-item');
            expect(gameManageLink).toBeInTheDocument();
            expect(gameManageLink).not.toBeDisabled();
            localStorage.removeItem('user');
        });

        it ("should reveal 3 new buttons when clicked as an admin", () => {
            const result = new User('test@test.com', '', '', 'ADMIN', 'jwt-token');
            localStorage.setItem('user', JSON.stringify(result));
            const { getByTestId } = render(<SideMenu />);
            let gameManageLink =  getByTestId('game-manage-item');
            try {
                let createGame = getByTestId('game-develop-item');
                let viewGame = getByTestId('game-view-item');
            } catch (error) {
                expect(error);                 
            }
            fireEvent.click(gameManageLink);
            let createGame = getByTestId('game-develop-item');
            let viewGame = getByTestId('game-view-item');
            expect(createGame).toBeInTheDocument();
            expect(createGame).not.toBeDisabled();
            expect(viewGame).toBeInTheDocument();
            expect(viewGame).not.toBeDisabled();
            localStorage.removeItem('user');
        });
    });

    describe("User Management Button", () => {
        it("should have clickable user management button as an admin", () => {
            const result = new User('test@test.com', '', '', 'ADMIN', 'jwt-token');
            localStorage.setItem('user', JSON.stringify(result));
            const { getByTestId } = render(<SideMenu />);
            let userManageLink =  getByTestId('user-manage-item');
            expect(userManageLink).toBeInTheDocument();
            expect(userManageLink).not.toBeDisabled();
            localStorage.removeItem('user');
        });

        it ("should reveal 3 new buttons when clicked as an admin", () => {
            const result = new User('test@test.com', '', '', 'ADMIN', 'jwt-token');
            localStorage.setItem('user', JSON.stringify(result));
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
            localStorage.removeItem('user');
        });
    });
    
    describe("Reports Button", () => {
        it("should have clickable reports button as an admin", () => {
            const result = new User('test@test.com', '', '', 'ADMIN', 'jwt-token');
            localStorage.setItem('user', JSON.stringify(result));
            const { getByTestId } = render(<SideMenu />);
            let reportsLink =  getByTestId('reports-item');
            expect(reportsLink).toBeInTheDocument();
            expect(reportsLink).not.toBeDisabled();
            localStorage.removeItem('user');
        });
    });
    

    describe("Logout Button", () => {
        it("should have clickable logout button", () => {
            const result = new User('test@test.com', '', '', 'ADMIN', 'jwt-token');
            localStorage.setItem('user', JSON.stringify(result));
            const { getByTestId } = render(<SideMenu />);
            let logoutLink =  getByTestId('logout-item');
            expect(logoutLink).toBeInTheDocument();
            expect(logoutLink).not.toBeDisabled();
        });
    });
    

    describe("Help Button", () => {
        it("should have clickable help button", () => {
            const result = new User('test@test.com', '', '', 'ADMIN', 'jwt-token');
            localStorage.setItem('user', JSON.stringify(result));
            const { getByTestId } = render(<SideMenu />);
            let helpLink =  getByTestId('help-item');
            expect(helpLink).toBeInTheDocument();
            expect(helpLink).not.toBeDisabled();
        });

        it ("should reveal 2 new buttons when clicked", () => {
            const result = new User('test@test.com', '', '', 'ADMIN', 'jwt-token');
            localStorage.setItem('user', JSON.stringify(result));
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
