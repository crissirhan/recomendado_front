import { GET_JOB_BY_NAME_ERROR, GET_JOB_BY_NAME_SUCCESS, GET_JOB_BY_NAME_LOADING } from '../actions/types';

export default function(state=[], action) {
  let loading = {};
  let error = {}
  switch (action.type) {
    case GET_JOB_BY_NAME_SUCCESS:
      loading = {'loading': false}
      error = {'error': false}
      let success = {'success': true}
      return Object.assign({}, {'result':action.payload[0]}, success, error, loading);
    case GET_JOB_BY_NAME_ERROR:
      error = {'error': true}
      loading = {'loading': false}
      let error_type = {'error_type': 'Ha ocurrido un error'}
      return Object.assign({}, action.payload, error, loading, error_type);
    case GET_JOB_BY_NAME_LOADING:
      loading = {'loading': true}
      return Object.assign({}, loading);
    default:
      return state;
  }

}
