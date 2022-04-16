import React from 'react';
import {shallow} from 'enzyme';
import '@testing-library/jest-dom/extend-expect';
import {render, fireEvent} from '@testing-library/react';
import {SideMenu} from './sideMenu';
import {User} from '../../models/user';
import {afterEach, beforeEach} from '@jest/globals';
import '../../setupTests';

const user = new User('test@test.com', '', '', 'ADMIN', 'jwt-token');
const fuser = new User('test@test.com', '', '', 'FACULTY', 'jwt-token');

describe('<SideMenu />', () => {
  beforeEach(() => {
    localStorage.setItem('user', JSON.stringify(user));
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should render the SideMenu component', () => {
    expect(shallow(<SideMenu />));
  });

  describe('Dashboard Button', () => {
    it('should have clickable dashboard button', () => {
      const {getByTestId} = render(<SideMenu />);
      const dashboardLink = getByTestId('dashboard-item');
      expect(dashboardLink).toBeInTheDocument();
      expect(dashboardLink).not.toBeDisabled();
    });
  });

  describe('Game Management Button', () => {
    it('should have clickable game management button as an admin', () => {
      const {getByTestId} = render(<SideMenu />);
      const gameManageLink = getByTestId('game-manage-item');
      expect(gameManageLink).toBeInTheDocument();
      expect(gameManageLink).not.toBeDisabled();
      localStorage.removeItem('user');
    });

    it('should reveal 3 new buttons when clicked as an admin', () => {
      const {getByTestId} = render(<SideMenu />);
      const gameManageLink = getByTestId('game-manage-item');
      try {
        getByTestId('game-develop-item');
        getByTestId('game-view-item');
      } catch (error) {
        expect(error);
      }
      fireEvent.click(gameManageLink);
      const createGame = getByTestId('game-develop-item');
      const viewGame = getByTestId('game-view-item');
      expect(createGame).toBeInTheDocument();
      expect(createGame).not.toBeDisabled();
      expect(viewGame).toBeInTheDocument();
      expect(viewGame).not.toBeDisabled();
      localStorage.removeItem('user');
    });
  });

  describe('User Management Button', () => {
    it('should have clickable user management button as an admin', () => {
      const {getByTestId} = render(<SideMenu />);
      const userManageLink = getByTestId('user-manage-item');
      expect(userManageLink).toBeInTheDocument();
      expect(userManageLink).not.toBeDisabled();
      localStorage.removeItem('user');
    });

    it('should reveal 3 new buttons when clicked as an admin', () => {
      const {getByTestId} = render(<SideMenu />);
      const userManageLink = getByTestId('user-manage-item');
      try {
        getByTestId('user-create-item');
        getByTestId('user-edit-item');
        getByTestId('user-view-item');
      } catch (error) {
        expect(error);
      }
      fireEvent.click(userManageLink);
      const createUser = getByTestId('user-create-item');
      const editUser = getByTestId('user-edit-item');
      const viewUser = getByTestId('user-view-item');
      expect(createUser).toBeInTheDocument();
      expect(createUser).not.toBeDisabled();
      expect(editUser).toBeInTheDocument();
      expect(editUser).not.toBeDisabled();
      expect(viewUser).toBeInTheDocument();
      expect(viewUser).not.toBeDisabled();
      localStorage.removeItem('user');
    });
  });

  describe('Reports Button', () => {
    it('should have clickable reports button as an admin', () => {
      const {getByTestId} = render(<SideMenu />);
      const reportsLink = getByTestId('reports-item');
      expect(reportsLink).toBeInTheDocument();
      expect(reportsLink).not.toBeDisabled();
      localStorage.removeItem('user');
    });
  });

  describe('Logout Button', () => {
    it('should have clickable logout button', () => {
      const {getByTestId} = render(<SideMenu />);
      const logoutLink = getByTestId('logout-item');
      expect(logoutLink).toBeInTheDocument();
      expect(logoutLink).not.toBeDisabled();
    });
  });

  describe('Help Button', () => {
    it('should have clickable help button', () => {
      const {getByTestId} = render(<SideMenu />);
      const helpLink = getByTestId('help-item');
      expect(helpLink).toBeInTheDocument();
      expect(helpLink).not.toBeDisabled();
    });

    it('should reveal 2 new buttons when clicked', () => {
      const {getByTestId} = render(<SideMenu />);
      const helpLink = getByTestId('help-item');
      try {
        getByTestId('getting-started-item');
        getByTestId('about-item');
      } catch (error) {
        expect(error);
      }
      fireEvent.click(helpLink);
      const gettingStarted = getByTestId('getting-started-item');
      const about = getByTestId('about-item');
      expect(gettingStarted).toBeInTheDocument();
      expect(gettingStarted).not.toBeDisabled();
      expect(about).toBeInTheDocument();
      expect(about).not.toBeDisabled();
    });
  });
});

describe('<SideMenu />', () => {
  beforeEach(() => {
    localStorage.setItem('user', JSON.stringify(fuser));
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should render the SideMenu component', () => {
    expect(shallow(<SideMenu />));
  });

  describe('Game Management Button', () => {
    it('should have clickable game session management button as a faculty', () => {
      const {getByTestId} = render(<SideMenu />);
      const gameManageLink = getByTestId('game-session-manage-item');
      expect(gameManageLink).toBeInTheDocument();
      expect(gameManageLink).not.toBeDisabled();
      localStorage.removeItem('user');
    });

    it('should reveal 1 new button when clicked as a faculty', () => {
      const {getByTestId} = render(<SideMenu />);
      const gameManageLink = getByTestId('game-session-manage-item');
      try {
        getByTestId('session-start-item');
      } catch (error) {
        expect(error);
      }
      fireEvent.click(gameManageLink);
      const startSession = getByTestId('session-start-item');
      expect(startSession).toBeInTheDocument();
      expect(startSession).not.toBeDisabled();
      localStorage.removeItem('user');
    });
  });
});