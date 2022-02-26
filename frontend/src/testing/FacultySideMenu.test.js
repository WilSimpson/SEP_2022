import React from 'react';
import { configure, mount, shallow } from 'enzyme';
import '../setupTests';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import { FacultySideMenu } from '../components/FacultySideMenu';



describe("<FacultySideMenu />", () => {

    it ("should render the FacultySideMenu component", () => {
        const shallowWrapper = shallow(<FacultySideMenu />);
        expect (shallowWrapper);
    });
    describe("Dashboard Button", () => {
        it("should have clickable dashboard button", () => {
            const { getByTestId } = render(<FacultySideMenu />);
            let dashboardLink =  getByTestId('dashboard-item');
            expect(dashboardLink).toBeInTheDocument();
            expect(dashboardLink).not.toBeDisabled();
        });
    });

    describe("Reports Button", () => {
        it("should have clickable reports button", () => {
            const { getByTestId } = render(<FacultySideMenu />);
            let reportsLink =  getByTestId('reports-item');
            expect(reportsLink).toBeInTheDocument();
            expect(reportsLink).not.toBeDisabled();
        });
    });


    describe("Logout Button", () => {
        it("should have clickable logout button", () => {
            const { getByTestId } = render(<FacultySideMenu />);
            let logoutLink =  getByTestId('logout-item');
            expect(logoutLink).toBeInTheDocument();
            expect(logoutLink).not.toBeDisabled();
        });
    });


    describe("Help Button", () => {
        it("should have clickable help button", () => {
            const { getByTestId } = render(<FacultySideMenu />);
            let helpLink =  getByTestId('help-item');
            expect(helpLink).toBeInTheDocument();
            expect(helpLink).not.toBeDisabled();
        });

        it ("should reveal 2 new buttons when clicked", () => {
            const { getByTestId } = render(<FacultySideMenu />);
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
