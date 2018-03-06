import React, {Component} from 'react';
import AlertStore from "../AlertStore";

import './AlertRoot.css';

export default class AlertRoot extends Component {

  constructor(props) {
    super(props);
    this.state = {
      alerts: []
    };
    this.handleAlertChange = this.handleAlertChange.bind(this);
  }

  componentDidMount() {
    AlertStore.onAlertChange(this.handleAlertChange);
  }

  handleAlertChange(alerts) {
    this.setState({
      alerts
    })
  }

  renderAlertElement(alert) {
    return (
      <div className={`alert alert-${alert.type}`}>
        {alert.message}
      </div>
    )
  }

  render() {
    const alertElements = this.state.alerts.map(this.renderAlertElement);
    return (
      <div className="alertContainer">
        {alertElements}
      </div>
    )
  }
}