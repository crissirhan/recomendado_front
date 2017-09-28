import { SIGNUP_USER } from '../actions/types';

export default function(state=[], action) {

  switch (action.type) {
    case SIGNUP_USER:
      return action.payload;
    default:
      return state;
  }

}
