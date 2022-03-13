import React from 'react';
import {alertService, alertSeverity} from '../../services/alert';
import authService from '../../services/auth';

export default function Logout(props) {
  alertService.alert({
    severity: alertSeverity.info,
    message: 'You have been logged out',
  });
  authService.logout();
  window.location.href = '/';
  return <></>;
}
