import { GET_JOB_SUB_CATEGORIES } from '../actions/types';

export default function(state=[], action) {

  switch (action.type) {
    case GET_JOB_SUB_CATEGORIES:
      return action.payload;
    default:
      return state;
  }

}
