import {alertService, alertSeverity} from '../../services/alert.service';
import authService from '../../services/auth.service';

export default function Logout(props) {
  alertService.alert({
    severity: alertSeverity.info,
    message: 'You have been logged out',
  });
  authService.logout();
  window.location.href = '/';
  return <></>;
}
