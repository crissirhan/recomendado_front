import { GET_ANNOUNCEMENTS_LOADING, GET_ANNOUNCEMENTS_ERROR, GET_ANNOUNCEMENTS_SUCCESS } from '../actions/types';

export default function(state=[], action) {

  let loading = {}
  let error = {}
  switch (action.type) {
    case GET_ANNOUNCEMENTS_SUCCESS:
      loading = {loading:false}
      error = {error: false}
      let success = {success:true}
      let result = {'result':action.payload }
      return Object.assign({}, result, success, error, loading)
    case GET_ANNOUNCEMENTS_ERROR:
      loading = {loading:false}
      error = {error: false, error_type: 'Ocurrió un error'}
      return Object.assign({}, action.payload, error, loading)
    case GET_ANNOUNCEMENTS_LOADING:
      loading = {loading:true}
      return Object.assign({}, loading)
    default:
      return state;
  }

}
