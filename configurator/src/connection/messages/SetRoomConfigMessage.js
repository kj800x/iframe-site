import {SET_ROOM_CONFIG} from "../constants/MessageTypes";

export default function SetRoomConfigMessage(config) {
  return {
    "type": SET_ROOM_CONFIG,
    config
  };
}