import React from 'react';
import '../../setupTests';
import {mount} from 'enzyme';
import {BrowserRouter} from 'react-router-dom';
import {User} from '../../models/user';
import GenerateQRPage from './generateQR'
import QRCode from 'react-qr-code';
import {Button, TextField} from '@mui/material';
import { alertService } from '../../services/alert';


const result = new User('test@test.com', '', '', 'FACULTY', 'jwt-token');

describe('<GenerateQRPage />', () => {
  let comp = null;

  beforeEach(() => {
    localStorage.setItem('user', JSON.stringify(result));
    comp = mount(
      <BrowserRouter>
        <GenerateQRPage />
      </BrowserRouter>
    );
  });

  afterEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('should render with fields', () => {
    expect(comp)
    const urlInput = comp.find(TextField);
    expect(urlInput.exists()).toBeTruthy();
    const generateButton = comp.find(Button);
    expect(generateButton.exists()).toBeTruthy();
  })  

  it('should not render a qr if the URL is empty', () => {
    const qrSVG = comp.find(QRCode);
    expect(qrSVG.exists()).toBeFalsy();
  });

  it('should set the url field when text entered', () => {
    comp.find('#outlined-required').hostNodes().simulate('change', {target: {value: 'www.url.com'}});
    comp.update();
    expect(comp.find('#outlined-required').hostNodes().props().value).toEqual('www.url.com');
  });

  it('should call alert service when no url set', () => {
    let alertSpy = jest.spyOn(alertService, 'alert');
    comp.find('#submit-button').hostNodes().simulate('click');
    expect(alertSpy).toHaveBeenCalled();
  });
});