import { SIGNUP_CLIENT } from '../actions/types';

export default function(state=[], action) {

  switch (action.type) {
    case SIGNUP_CLIENT:
      return action.payload;
    default:
      return state;
  }

}
