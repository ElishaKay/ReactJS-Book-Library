import _ from "lodash";
import { FETCH_BOOKS, UPDATE_BOOK, DELETE_BOOK } from "../actions/types";

export default function(state = {}, action) {
  switch (action.type) {
    case DELETE_BOOK:
      return _.omit(state, action.payload);
    case UPDATE_BOOK:
      return { ...state, [action.payload.id]: action.payload };
    case FETCH_BOOKS:
      console.log('action.payload: ',action.payload)
      console.log('_.map(action.payload): ',_.map(action.payload))
      return action.payload;
    default:
      return state;
  }
}
