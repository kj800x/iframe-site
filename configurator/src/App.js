import React, {Component} from 'react';
import WebsocketConnection from './connection/WebsocketConnection';
import {HOST, PORT, ROOM} from "./connection/constants/ConnectionConstants";
import ConfigEditor from "./view/configEditor/ConfigEditor";
import LoadingOverlay from "./view/loadingOverlay/LoadingOverlay";
import AlertRoot from "./alerts/view/AlertRoot";
import AlertStore from "./alerts/AlertStore";

import * as GoogleAuth from "./googleAuth/googleAuth";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      config: {},
      loadedInitialConfig: false,
    };
    this.handleAuthChange = this.handleAuthChange.bind(this);
    this.syncConfigFromServer = this.syncConfigFromServer.bind(this);
    this.syncConfigToServer = this.syncConfigToServer.bind(this);
  }

  componentDidMount() {
    this.ws = new WebsocketConnection();
    this.ws.onConfigChange(this.syncConfigFromServer);
    this.ws.onAuthChange(this.handleAuthChange);
    this.ws.connect(HOST, PORT, ROOM);
    GoogleAuth.init();
    GoogleAuth.onGetAuthToken(this.ws.auth)
  }

  handleAuthChange(message) {
    this.setState({
      authStatus: message.authStatus,
      authDisplayName: message.displayName
    });
    if (!message.authStatus) {
      AlertStore.createAlert(`You signed in as ${message.displayName}, but that user does not have permission to configure this website!`);
    }
  }

  syncConfigFromServer(config, whoChanged, isOwnFeedback) {
    this.setState({
      config,
      loadedInitialConfig: true,
    });
    if (!isOwnFeedback) {
      AlertStore.createAlert(`The configuration was just updated by ${whoChanged}. Your changes have been lost!`);
    }
  }

  syncConfigToServer(config) {
    this.ws.setConfig(config);
  }

  renderConfigEditor() {
    if (!this.state.authStatus) {
      return null;
    }
    return (
      <ConfigEditor
        config={this.state.config}
        displayName={this.state.authDisplayName}
        onConfigChange={this.syncConfigToServer}
        host={HOST}
        port={PORT}
        room={ROOM}
      />
    )
  }

  renderLogInButton() {
    const text = this.state.authStatus ? "Log in as someone else" : "Log In";
    return (
      <div>
        {!this.state.authStatus && <div>Please Sign In</div>}
        <button onClick={GoogleAuth.signIn}>{text}</button>
      </div>
    )
  }

  render() {
    if (!this.state.loadedInitialConfig) {
      return <LoadingOverlay/>
    }

    return (
      <div>
        <AlertRoot/>
        <h1> IFrame Site Configurator </h1>
        {this.renderConfigEditor()}
        {this.renderLogInButton()}
      </div>
    );
  }
}

export default App;
