import React, { Component } from 'react';

import {HOST, PORT, DEFAULT_ROOM} from "./connection/constants/ConnectionConstants";
import WebsocketConnection from './connection/WebsocketConnection';
import LoadingOverlay from "./loadingOverlay/LoadingOverlay";
import IFrames from "./iframes/IFrames";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      config: {},
      loadedInitialConfig: false,
    };
    this.syncConfigFromServer = this.syncConfigFromServer.bind(this);
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
    this.ws.connect(HOST, PORT, DEFAULT_ROOM);
  }

  render() {
    if (!this.state.loadedInitialConfig) {
      return <LoadingOverlay/>
    }

    return (
      <IFrames config={this.state.config} />
    );
  }
}

export default App;
