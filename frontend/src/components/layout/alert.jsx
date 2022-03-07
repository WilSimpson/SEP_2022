import { Alert, AlertTitle, Stack } from "@mui/material";
import React from "react";
import PropTypes from 'prop-types';
import titlizeString from "../../helpers/StringFormatter";
import { alertService } from '../../services/alert.service';
import { createBrowserHistory } from 'history'
import { LaptopWindows } from "@material-ui/icons";

const history = createBrowserHistory();

class PageAlert extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      alerts: JSON.parse(window.localStorage.getItem('alerts')) || []
    }
  }

  setAlerts(alerts) {
    window.localStorage.setItem('alerts', JSON.stringify(alerts.alerts))
    this.setState({ alerts: alerts.alerts })
  }

  componentDidMount() {
    this.subscription = alertService.onAlert(this.props.id)
      .subscribe(alert => {
        if (!alert.message) {
          const alerts = this.state.alerts.filter(a => a.keepAfterRouteChange)
          alerts.forEach((a) => { delete a.keepAfterRouteChange })
          this.setAlerts({alerts})
          return
        }
        console.log('this.state.alerts.alerts', this.state.alerts.alerts)
        console.log('this.state.alerts', this.state.alerts)
        this.setAlerts({ alerts: [...this.state.alerts, alert] })
        if (alert.autoClose) {
          setTimeout(() => this.removeAlert(alert), 5000)
        }
      })

    this.historyUnlisten = history.listen(() => {
      alertService.clear(this.props.id)
    })
  }

  removeAlert(alert) {
    console.log('removed')
    this.setAlerts({ alerts: this.state.alerts.filter(a => a !== alert) })
  }

  componentWillUnmount() {
    console.log('unmounting')
    this.subscription.unsubscribe()
    this.historyUnlisten()
  }
  
  render() {
    if (!this.state.alerts.length) return null
    return (
      <div class="alerts">
        <Stack sx={{ width: '100%' }} spacing={2}>
          {this.state.alerts.map((alert) =>
            <Alert severity={alert.severity} onClose={() => { this.removeAlert(alert) }} sx={{ border: '1px solid' }}>
              <AlertTitle>{titlizeString(alert.severity)}</AlertTitle>
              {alert.message}
            </Alert>
          )}
        </Stack>
      </div>
    );
  }
}

PageAlert.propTypes = {
  id: PropTypes.string
}

PageAlert.defaultProps = {
  id: alertService.defaultID
}

export { PageAlert };