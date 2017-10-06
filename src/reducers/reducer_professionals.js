import { GET_PROFESSIONALS } from '../actions/types';

export default function(state=[], action) {

  switch (action.type) {
    case GET_PROFESSIONALS:
      return action.payload;
    default:
      return state;
  }

}
