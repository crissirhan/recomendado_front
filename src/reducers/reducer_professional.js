import { GET_PROFESSIONAL } from '../actions/types';

export default function(state=[], action) {

  switch (action.type) {
    case GET_PROFESSIONAL:
      return action.payload;
    default:
      return state;
  }

}
