import {FORCE_REFRESH} from "../constants/MessageTypes";

export default function ForceRefresh() {
  return {
    "type": FORCE_REFRESH,
  }
}