import React from 'react';
import {shallow} from 'enzyme';
import {expect, jest} from '@jest/globals';
import {Subject, Observable} from 'rxjs';
import {alertService, alertSeverity} from './alert';

jest.mock('rxjs');

describe('Alert Service', () => {
  describe('alert', () => {
    it ('should create a subject with the alert', () => {
      let alert = {options: null, severity: alertSeverity.success, message: 'message'};
      alertService.alert(alert);
      let spy = jest.spyOn(Subject.prototype, 'next');
      expect(spy).toHaveBeenCalledWith(alert);
      spy.mockRestore();
    });
  });
  describe('clear', () => {
    it ('should clear subject with the id', () => {
      let id = {id: 'default-alert'};
      alertService.clear(alert);
      let spy = jest.spyOn(Subject.prototype, 'next');
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });
  });
  describe('severity functions', () => {
    it('success should call alert with severity success', () => {
      let spy = jest.spyOn(alertService, 'alert');
      alertService.success('message');
      let alert = {id: 'default-alert', severity: alertSeverity.success, message: 'message'};
      expect(spy).toHaveBeenCalledWith(alert);
      spy.mockRestore();
    });

    it('error should call alert with severity error', () => {
      let spy = jest.spyOn(alertService, 'alert');
      alertService.error('message');
      let alert = {id: 'default-alert', severity: alertSeverity.error, message: 'message'};
      expect(spy).toHaveBeenCalledWith(alert);
      spy.mockRestore();
    });

    it('warning should call alert with severity warning', () => {
      let spy = jest.spyOn(alertService, 'alert');
      alertService.warning('message');
      let alert = {id: 'default-alert', severity: alertSeverity.warning, message: 'message'};
      expect(spy).toHaveBeenCalledWith(alert);
      spy.mockRestore();
    });

    it('info should call alert with severity info', () => {
      let spy = jest.spyOn(alertService, 'alert');
      alertService.info('message');
      let alert = {id: 'default-alert', severity: alertSeverity.info, message: 'message'};
      expect(spy).toHaveBeenCalledWith(alert);
      spy.mockRestore();
    });
  });
});