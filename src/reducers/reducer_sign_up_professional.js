import { SIGNUP_PROFESSIONAL } from '../actions/types';

export default function(state=[], action) {

  switch (action.type) {
    case SIGNUP_PROFESSIONAL:
      return action.payload;
    default:
      return state;
  }

}
