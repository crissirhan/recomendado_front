import { UPDATE_PROFESSIONAL } from '../actions/types';

export default function(state=[], action) {

  switch (action.type) {
    case UPDATE_PROFESSIONAL:
      return action.payload;
    default:
      return state;
  }

}
