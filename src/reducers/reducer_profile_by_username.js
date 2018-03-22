import { GET_PROFILE_BY_USERNAME } from '../actions/types';

export default function(state=[], action) {

  switch (action.type) {
    case GET_PROFILE_BY_USERNAME:
      return action.payload;
    default:
      return state;
  }

}
