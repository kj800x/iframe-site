import {JOIN_ROOM} from "../constants/MessageTypes";

export default function JoinRoomMessage(room) {
  return {
    "type": JOIN_ROOM,
    room
  }
}