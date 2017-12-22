import { UPDATE_REVIEW_ERROR, UPDATE_REVIEW_SUCCESS, UPDATE_REVIEW_LOADING } from '../actions/types';

export default function(state=[], action) {
  let loading = {};
  let error = {}
  switch (action.type) {
    case UPDATE_REVIEW_SUCCESS:
      loading = {'loading': false}
      error = {'error': false}
      let success = {'success': true}
      return Object.assign({}, {'result':action.payload}, success, error, loading);
    case UPDATE_REVIEW_ERROR:
      error = {'error': true}
      loading = {'loading': false}
      let error_type = {'error_type': 'Ha ocurrido un error'}
      return Object.assign({}, action.payload, error, loading, error_type);
    case UPDATE_REVIEW_LOADING:
      loading = {'loading': true}
      return Object.assign({}, loading);
    default:
      return state;
  }

}
