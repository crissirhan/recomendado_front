import { REQUEST_SEARCH, UPDATE_SEARCH_PARAMS, STOP_SEARCH_REQUEST } from './types';

export function requestSearch() {
  return dispatch => {
    return {
      type: REQUEST_SEARCH,
      payload: null
    }
  }
}

export function updateSearchParams(new_params){
  return dispatch => {
    dispatch({
      type: UPDATE_SEARCH_PARAMS,
      newParams: new_params
    })
  }
}

export function stopRequestSearch() {
  return dispatch => {
    return {
      type: STOP_SEARCH_REQUEST,
      payload: null
    }
  }
}
