import { PUT_SERVICE } from '../actions/types';

export default function(state=[], action) {

  switch (action.type) {
    case PUT_SERVICE:
      return action.payload;
    default:
      return state;
  }

}
