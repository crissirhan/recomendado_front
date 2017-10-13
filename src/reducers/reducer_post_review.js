import { POST_REVIEW } from '../actions/types';

export default function(state=[], action) {

  switch (action.type) {
    case POST_REVIEW:
      return action.payload;
    default:
      return state;
  }

}
