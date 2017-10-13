import { GET_CLIENT_SERVICES } from '../actions/types';

export default function(state=[], action) {

  switch (action.type) {
    case GET_CLIENT_SERVICES:
      return action.payload;
    default:
      return state;
  }

}
