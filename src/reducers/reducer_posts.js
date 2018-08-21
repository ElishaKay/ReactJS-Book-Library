import _ from "lodash";
import { FETCH_POSTS, FETCH_POST, DELETE_POST } from "../actions/types";

export default function(state = {}, action) {
  switch (action.type) {
    case DELETE_POST:
      return _.omit(state, action.payload);
    case FETCH_POST:
      return { ...state, [action.payload.id]: action.payload };
    case FETCH_POSTS:
      return action.payload;
    default:
      return state;
  }
}
