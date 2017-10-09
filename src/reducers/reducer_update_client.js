import { UPDATE_CLIENT } from '../actions/types';

export default function(state=[], action) {

  switch (action.type) {
    case UPDATE_CLIENT:
      return action.payload;
    default:
      return state;
  }

}
