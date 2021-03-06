import { GET_USER_ANNOUNCEMENTS_SUCCESS, GET_USER_ANNOUNCEMENTS_LOADING, GET_USER_ANNOUNCEMENTS_ERROR } from '../actions/types';

export default function(state=[], action) {
  let loading = {};
  let error = {}
  switch (action.type) {
    case GET_USER_ANNOUNCEMENTS_SUCCESS:
      loading = {'loading': false}
      error = {'error': false}
      let success = {'success': true}
      return Object.assign({}, {'result':action.payload}, success, error, loading);
    case GET_USER_ANNOUNCEMENTS_ERROR:
      error = {'error': true}
      loading = {'loading': false}
      let error_type = {'error_type': 'Ha ocurrido un error'}
      return Object.assign({}, action.payload, error, loading, error_type);
    case GET_USER_ANNOUNCEMENTS_LOADING:
      loading = {'loading': true}
      return Object.assign({}, loading);
    default:
      return state;
  }

}
