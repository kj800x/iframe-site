import {AUTH} from "../constants/MessageTypes";

export default function AuthenticateMessage(token) {
  return {
    "type": AUTH,
    token
  }
}