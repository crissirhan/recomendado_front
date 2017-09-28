import { LOGIN_USER } from '../actions/types';

export default function(state=[], action) {

  switch (action.type) {
    case LOGIN_USER:
      let token={'token': action.payload.data.key}
      return state + token;
    default:
      return state;
  }

}
