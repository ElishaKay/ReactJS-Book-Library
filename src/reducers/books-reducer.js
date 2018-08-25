import _ from "lodash";
import { FETCH_BOOKS, SAVE_BOOK, DELETE_BOOK } from "../actions/types";

export default function(state = {}, action) {
  switch (action.type) {
    case DELETE_BOOK:
      return _.omit(state, action.payload);
    case SAVE_BOOK:
      return { ...state, [action.payload.id]: action.payload };
    case FETCH_BOOKS:
      return action.payload;
    default:
      return state;
  }
}
