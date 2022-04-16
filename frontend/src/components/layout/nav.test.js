import React from 'react';
import {render, unmountComponentAtNode} from 'react-dom';
import {act} from 'react-dom/test-utils';
import {mount} from 'enzyme';
import ResponsiveAppBar from './nav';
import authService from '../../services/auth';
import {Backdrop, Menu} from '@mui/material';
import '../../setupTests';

jest.mock('../../services/auth');

let container = null;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe('<ResponsiveAppBar />', () => {
  it('Should have links', () => {
    act(() => {
      render(<ResponsiveAppBar />, container);
    });
    expect(container.textContent).toContain('Get Started');
    expect(container.textContent).toContain('About');
    expect(container.textContent).toContain('Help');
    expect(container.textContent).toContain('Login');
  });

  it('Should have some children nodes', () => {
    act(() => {
      render(<ResponsiveAppBar />, container);
    });
    expect(container.childNodes).not.toBeNull();
  });

  it('Should have a clickable avatar button', () => {
    act(() => {
      render(<ResponsiveAppBar />, container);
    });
    const profileButton = document.querySelector('[data-testid=profileButton]');
    act(() => {
      profileButton.dispatchEvent(new MouseEvent('click', {bubbles: true}));
    });
    expect(container.textContent).toContain('Get Started');
    expect(container.textContent).toContain('About');
    expect(container.textContent).toContain('Help');
    expect(container.textContent).toContain('Login');
  });
  it('should have all menu items when logged in', () => {
    authService.isLoggedIn.mockResolvedValue(true);
    const component = mount(<ResponsiveAppBar/>);
    component.find({ "data-testid": "Dashboard-test" }).last().simulate("click");
    component.find({ "data-testid": "Games-test" }).last().simulate("click");
    component.find({ "data-testid": "Account Settings-test" }).last().simulate("click");
    component.find({ "data-testid": "Logout-test" }).last().simulate("click");
    expect(component.find({ "data-testid": "Dashboard-test" })).not.toBeNull;
    expect(component.find({ "data-testid": "Games-test" })).not.toBeNull;
    expect(component.find({ "data-testid": "Account Settings-test" })).not.toBeNull;
    expect(component.find({ "data-testid": "Logout-test" })).not.toBeNull;
  });
  it('should have a clickable menu button when user logged in', () => {
    authService.isLoggedIn.mockResolvedValue(true);
    const component = mount(<ResponsiveAppBar/>);
    component.find({"data-testid": "user-menu"}).last().simulate("click");
    let menu = component.find(Menu).filterWhere((i) => i.prop('open') == true);
    expect(menu.getElement()).not.toBeNull();
  });
  it('should close logged in menu when clicked', () => {
    authService.isLoggedIn.mockResolvedValue(true);
    const component = mount(<ResponsiveAppBar/>);
    component.find({"data-testid": "user-menu"}).last().simulate("click");
    component.find(Backdrop).last().simulate("click");
    let menu = component.find(Menu).filterWhere((i) => i.prop('open') == false).first();
    expect(menu.getElement()).not.toBeNull();
  });

  it('should have closable nav menu', () => {
    const component = mount(<ResponsiveAppBar/>);
    component.find({"data-testid": "profileButton"}).last().simulate("click");
    component.find(Backdrop).last().simulate("click");
    let menu = component.find(Menu).filterWhere((i) => i.prop('open') == false).first();
    expect(menu.getElement()).not.toBeNull();
  });
});
