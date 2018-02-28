import React, {Component} from 'react';
import WebsocketConnection from './connection/WebsocketConnection';
import {HOST, PORT, DEFAULT_ROOM} from "./connection/constants/ConnectionConstants";
import ConfigEditor from "./view/configEditor/ConfigEditor";
import LoadingOverlay from "./view/loadingOverlay/LoadingOverlay";
import AlertRoot from "./alerts/view/AlertRoot";
import AlertStore from "./alerts/AlertStore";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      config: {},
      loadedInitialConfig: false,
    };
    this.syncConfigFromServer = this.syncConfigFromServer.bind(this);
    this.syncConfigToServer = this.syncConfigToServer.bind(this);
  }

  componentDidMount() {
    this.ws = new WebsocketConnection();
    this.ws.onConfigChange(this.syncConfigFromServer);
    this.ws.connect(HOST, PORT, DEFAULT_ROOM);
    window.ws = this.ws; // TODO remove this (it's for debugging only)
  }

  syncConfigFromServer(config) {
    this.setState({
      config,
      loadedInitialConfig: true,
    });
    AlertStore.createAlert("The configuration was just updated by another user. Your changes have been lost. :(");
  }

  syncConfigToServer(config) {
    this.ws.setConfig(config);
  }

  render() {
    if (!this.state.loadedInitialConfig) {
      return <LoadingOverlay/>
    }

    return (
      <div>
        <AlertRoot/>
        <ConfigEditor
          config={this.state.config}
          onConfigChange={this.syncConfigToServer}
        />
      </div>
    );
  }
}

export default App;
