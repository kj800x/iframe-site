import JoinRoomMessage from "./messages/JoinRoomMessage"
import SetRoomConfigMessage from "./messages/SetRoomConfigMessage"
import AuthenticateMessage from "./messages/AuthenticateMessage";
import {CONFIG_CHANGE, AUTH_CHANGE} from "./constants/MessageTypes";

export default class WebsocketConnection {
  constructor() {
    this.configChangeListeners = [];
    this.authChangeListeners = [];
    this.auth = this.auth.bind(this);
  }

  connect(host, port, room) {
    const address = `ws://${host}:${port}/`;
    this.room = room;

    this.setConfig = this.setConfig.bind(this);
    this.onConfigChange = this.onConfigChange.bind(this);
    this.onMessage = this.onMessage.bind(this);
    this.onOpen = this.onOpen.bind(this);

    this.ws = new WebSocket(address);
    this.ws.onopen = this.onOpen;
    this.ws.onmessage = this.onMessage;
  }

  onOpen() {
    this.ws.send(JSON.stringify(JoinRoomMessage(this.room)));
  }

  onMessage(rawMessage) {
    const message = JSON.parse(rawMessage.data);
    if (message.type === CONFIG_CHANGE) {
      for (let i = 0; i < this.configChangeListeners.length; i++) {
        this.configChangeListeners[i](message.config, message.who, message.ownFeedback);
      }
    }
    if (message.type === AUTH_CHANGE) {
      for (let i = 0; i < this.authChangeListeners.length; i++) {
        this.authChangeListeners[i](message);
      }
    }
  }

  setConfig(config) {
    this.ws.send(JSON.stringify(SetRoomConfigMessage(config)));
  }

  auth(token) {
    this.ws.send(JSON.stringify(AuthenticateMessage(token)))
  }

  onAuthChange(handler) {
    this.authChangeListeners.push(handler);
  }

  onConfigChange(handler) {
    this.configChangeListeners.push(handler);
  }
}