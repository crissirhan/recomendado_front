import { GET_CLIENT } from '../actions/types';

export default function(state=[], action) {

  switch (action.type) {
    case GET_CLIENT:
      return action.payload;
    default:
      return state;
  }

}
