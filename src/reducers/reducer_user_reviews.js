import { GET_USER_REVIEWS } from '../actions/types';

export default function(state=[], action) {

  switch (action.type) {
    case GET_USER_REVIEWS:
      return action.payload;
    default:
      return state;
  }

}
