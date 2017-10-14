import { POST_ANNOUNCEMENT } from '../actions/types';

export default function(state=[], action) {

  switch (action.type) {
    case POST_ANNOUNCEMENT:
      return action.payload;
    default:
      return state;
  }

}
