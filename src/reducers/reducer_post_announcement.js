import { POST_ANNOUNCEMENT_ERROR, POST_ANNOUNCEMENT_LOADING, POST_ANNOUNCEMENT_SUCCESS } from '../actions/types';

export default function(state=[], action) {
  let loading = {};
  let error = {}
  switch (action.type) {
    case POST_ANNOUNCEMENT_SUCCESS:
      loading = {'loading': false}
      error = {'error': false}
      let success = {'success': true}
      return Object.assign({}, action.payload, success, error, loading);
    case POST_ANNOUNCEMENT_ERROR:
      error = {'error': true}
      loading = {'loading': false}
      let error_type = {'error_type': 'Ha ocurrido un error'}
      return Object.assign({}, action.payload, error, loading, error_type);
    case POST_ANNOUNCEMENT_LOADING:
      loading = {'loading': true}
      return Object.assign({}, loading);
    default:
      return state;
  }

}
