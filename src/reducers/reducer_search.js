import { UPDATE_SEARCH_PARAMS, REQUEST_SEARCH, STOP_SEARCH_REQUEST } from '../actions/types';

export default function(state={
  requestSearch:false
}, action) {

  switch (action.type) {
    case REQUEST_SEARCH:
      return Object.assign({...state}, {requestSearch:true})
    case UPDATE_SEARCH_PARAMS:
      let newState = Object.assign({...state}, action.newParams,)
      return newState
    case STOP_SEARCH_REQUEST:
      return Object.assign({...state}, {requestSearch:false})
    default:
      return state;
  }

}
