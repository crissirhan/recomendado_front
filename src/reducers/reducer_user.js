import { USER_LOGIN } from '../actions/types';

export default function(state=[], action) {

  switch (action.type) {
    case USER_LOGIN:
      return action.payload;
/*
    case ADD_PERSON:
      return [action.payload, ...state];

    case UPDATE_PERSON:
      return state.map(person => {
        if(person.name === action.payload.name) {
          return action.payload;
        }
        return person;
      });

    case DELETE_PERSON:
      return state.filter(person => person.name !== action.payload.name);
*/
    default:
      return state;
  }

}
