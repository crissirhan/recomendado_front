import { PUT_REVIEW } from '../actions/types';

export default function(state=[], action) {

  switch (action.type) {
    case PUT_REVIEW:
      return action.payload;
    default:
      return state;
  }

}
