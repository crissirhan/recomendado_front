import { UPDATE_ANNOUNCEMENTS } from '../actions/types';

export default function(state=[], action) {

  switch (action.type) {
    case UPDATE_ANNOUNCEMENTS:
      return action.payload;
    default:
      return state;
  }

}
