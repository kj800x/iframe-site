import JoinRoomMessage from "./messages/JoinRoomMessage"
import SetRoomConfigMessage from "./messages/SetRoomConfigMessage"
import {CONFIG_CHANGE} from "./constants/MessageTypes";

export default class WebsocketConnection {
  constructor() {
    this.configChangeListeners = [];
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
    console.log(message);
    if (message.type === CONFIG_CHANGE) {
      for (let i = 0; i < this.configChangeListeners.length; i++) {
        this.configChangeListeners[i](message.config);
      }
    }
  }

  setConfig(config) {
    this.ws.send(JSON.stringify(SetRoomConfigMessage(config)));
  }

  onConfigChange(handler) {
    this.configChangeListeners.push(handler);
  }
}