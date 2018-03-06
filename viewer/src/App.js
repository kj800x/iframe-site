import React, { Component } from 'react';

import {HOST, PORT, ROOM} from "./connection/constants/ConnectionConstants";
import WebsocketConnection from './connection/WebsocketConnection';
import LoadingOverlay from "./loadingOverlay/LoadingOverlay";
import IFrames from "./iframes/IFrames";
import AlertStore from "./alerts/AlertStore";
import AlertRoot from "./alerts/view/AlertRoot";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      config: {},
      loadedInitialConfig: false,
    };
    this.syncConfigFromServer = this.syncConfigFromServer.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    AlertStore.createAlert(`The websocket connection has been lost!`);
    setTimeout(this.ws.connect.bind(this.ws, HOST, PORT, ROOM), 7500);
  }
  syncConfigFromServer(config) {
    this.setState({
      config,
      loadedInitialConfig: true,
    });
  }

  componentDidMount() {
    this.ws = new WebsocketConnection();
    this.ws.onConfigChange(this.syncConfigFromServer);
    this.ws.connect(HOST, PORT, ROOM);
    this.ws.onClose(this.handleClose);
  }

  render() {
    if (!this.state.loadedInitialConfig) {
      return <LoadingOverlay/>
    }

    return (
      <div>
        <AlertRoot/>
        <IFrames config={this.state.config} />
      </div>
    );
  }
}

export default App;
