import { GET_USER_ANNOUNCEMENTS } from '../actions/types';

export default function(state=[], action) {

  switch (action.type) {
    case GET_USER_ANNOUNCEMENTS:
      return action.payload;
    default:
      return state;
  }

}
