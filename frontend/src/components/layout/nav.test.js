import React from 'react';
import '../../setupTests';
import {render, unmountComponentAtNode} from 'react-dom';
import {act} from 'react-dom/test-utils';
import {mount} from 'enzyme';
import ResponsiveAppBar from './nav';
import { Backdrop, Menu } from '@mui/material';
import {BrowserRouter} from 'react-router-dom';
import {User} from '../../models/user';

const user = new User('email@email.com', 'Test', 'Test', 'ADMIN', null, 1);
let container = null;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  localStorage.clear();
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe('<ResponsiveAppBar />', () => {
  it('Should have links', () => {
    act(() => {
      render(<BrowserRouter><ResponsiveAppBar /></BrowserRouter>, container);
    });
    expect(container.textContent).toContain('Help');
    expect(container.textContent).toContain('Settings');
    expect(container.textContent).toContain('Login');
  });

  it('Should have some children nodes', () => {
    act(() => {
      render(<BrowserRouter><ResponsiveAppBar /></BrowserRouter>, container);
    });
    expect(container.childNodes).not.toBeNull();
  });

  it('Should have a clickable avatar button', () => {
    act(() => {
      render(<BrowserRouter><ResponsiveAppBar /></BrowserRouter>, container);
    });
    const profileButton = document.querySelector('[data-testid=profileButton]');
    act(() => {
      profileButton.dispatchEvent(new MouseEvent('click', {bubbles: true}));
    });
    expect(container.textContent).toContain('Help');
    expect(container.textContent).toContain('Settings');
    expect(container.textContent).toContain('Login');
  });
  describe('logged in functionality', () => {
    beforeEach(() => {
      localStorage.setItem('user', JSON.stringify(user));
    });
    it('should have all menu items when logged in', () => {
      const component = mount(<BrowserRouter><ResponsiveAppBar /></BrowserRouter>);
      component.find({ "data-testid": "Dashboard-test" }).last().simulate("click");
      component.find({ "data-testid": "Logout-test" }).last().simulate("click");
      expect(component.find({ "data-testid": "Dashboard-test" })).not.toBeNull;
      expect(component.find({ "data-testid": "Logout-test" })).not.toBeNull;
    });
    it('should have a clickable menu button when user logged in', () => {
      const component = mount(<BrowserRouter><ResponsiveAppBar /></BrowserRouter>);
      component.find({"data-testid": "user-menu"}).last().simulate("click");
      let menu = component.find(Menu).filterWhere((i) => i.prop('open') == true);
      expect(menu.getElement()).not.toBeNull();
    });
    it('should close logged in menu when clicked', () => {
      const component = mount(<BrowserRouter><ResponsiveAppBar /></BrowserRouter>);
      component.find({"data-testid": "user-menu"}).last().simulate("click");
      component.find(Backdrop).last().simulate("click");
      let menu = component.find(Menu).filterWhere((i) => i.prop('open') == false).first();
      expect(menu.getElement()).not.toBeNull();
    });
  
    it('should have closable nav menu', () => {
      const component = mount(<BrowserRouter><ResponsiveAppBar /></BrowserRouter>);
      component.find({"data-testid": "profileButton"}).last().simulate("click");
      component.find(Backdrop).last().simulate("click");
      let menu = component.find(Menu).filterWhere((i) => i.prop('open') == false).first();
      expect(menu.getElement()).not.toBeNull();
    });
  });
});
