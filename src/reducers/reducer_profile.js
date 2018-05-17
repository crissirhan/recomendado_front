import { GET_PROFILE } from '../actions/types';

export default function(state=null, action) {

  switch (action.type) {
    case GET_PROFILE:
      return action.payload;
    default:
      return state;
  }

}
