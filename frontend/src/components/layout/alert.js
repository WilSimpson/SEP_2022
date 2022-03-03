import { Alert, AlertTitle } from "@mui/material";
import React from "react";
import PropTypes from 'prop-types';
import titlizeString from "../../helpers/StringFormatter";
import alertSerivice from '../../services/alert.service';
import { createBrowserHistory } from 'history'

const history = createBrowserHistory();

class PageAlert extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      alerts: []
    }
  }

  componentDidMount() {
    this.subscription = alertSerivice.onAlert(this.props.id)
      .subscribe(alert => {
        if (!alert.message) {
          const alerts = this.state.alerts.filter(a => a.keepAfterRouteChange)
          alerts.forEach((a) => {delete a.keepAfterRouteChange})
          this.setState({alerts})
          return
        }

        this.setState({alerts: [...this.state.alerts, alert]})
        if (alert.autoClose) {
          setTimeout(() => this.removeAlert(alert), 5000)
        }
      })

    this.historyUnlisten = history.listen(() => {
      alertSerivice.clear(this.props.id)
    })
  }

  removeAlert(alert) {
    this.setState({alerts: this.state.alerts.filter(a => a != alert)})
  }

  componentWillUnmount() {
    this.subscription.unsubscribe()
    this.historyUnlisten()
  }

  render() {
    if (!this.state.alerts.length) return null
    return (
      <div class="alerts">
      {this.state.alerts.map((alert, index) => {
        <Alert serverity={alert.severity}>
          <AlertTitle>{titlizeString(alert.severity)}</AlertTitle>
          {alert.message}
        </Alert>
      })}
    </div>
    );
  }
}

PageAlert.propTypes = {
  id: PropTypes.string
}

PageAlert.defaultProps = {
  id: alertSerivice.defaultID
}

export { PageAlert };