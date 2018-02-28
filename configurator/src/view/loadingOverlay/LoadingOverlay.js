import React, {Component} from 'react';
//import PropTypes from 'prop-types';

import "./LoadingOverlay.css";

import LoadingIcon from "./loadingIcon/LoadingIcon";

function Status(props) {
  if (!props.showStatus) {
    return null;
  }
  return (
    <div>
      <span>
        {props.status.toFixed(2) * 100}%
      </span>
    </div>
  );
}

//Status.propTypes = {
//  showStatus: PropTypes.bool.isRequired,
//  status: PropTypes.number,
//};

export default class LoadingOverlay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "timeElapsed": false,
    };
  }

  componentDidMount() {
    this.timeout = setTimeout(() => {
      this.timeout = null;
      this.setState({"timeElapsed": true});
    }, this.props.waitTime * 1000);
  }

  componentWillUnmount() {
    this.timeout && clearTimeout(this.timeout);
  }

  render() {
    if (!this.state.timeElapsed) {
      return null;
    }

    return (
      <div className="loading-overlay">
        <div>
          {this.props.message}
          <br/>
          <LoadingIcon/>
          <Status
            showStatus={this.props.showStatus}
            status={this.props.status}
          />
        </div>
      </div>
    );
  }
}

LoadingOverlay.defaultProps = {
  showStatus: false,
  message: "Loading",
  waitTime: 0,
};

//LoadingOverlay.propTypes = {
//  message: PropTypes.string.isRequired,
//  showStatus: PropTypes.bool.isRequired,
//  waitTime: PropTypes.number.isRequired,
//  status: PropTypes.number,
//};