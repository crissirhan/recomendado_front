import { UPDATE_SEARCH_PARAMS, REQUEST_SEARCH } from '../actions/types';

export default function(state={}, action) {

  switch (action.type) {
    case UPDATE_SEARCH_PARAMS:
      let newState = Object.assign({...state}, action.newParams)
      console.log(newState)
      return newState
    default:
      return state;
  }

}
