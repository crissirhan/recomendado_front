import { PUT_SERVICE_SUCCESS , PUT_SERVICE_ERROR, PUT_SERVICE_LOADING } from '../actions/types';

export default function(state=[], action) {
  let loading = {}
  let error = {}
  switch (action.type) {
    case PUT_SERVICE_SUCCESS:
      loading = {loading:false}
      error = {error: false}
      let success = {success:true}
      return Object.assign({}, action.payload, success, error, loading)
    case PUT_SERVICE_ERROR:
      loading = {loading:false}
      error = {error: false, error_type: 'Ocurrió un error'}
      return Object.assign({}, action.payload, error, loading)
    case PUT_SERVICE_LOADING:
      loading = {loading:true}
      return Object.assign({}, loading)
    default:
      return state;
  }

}
