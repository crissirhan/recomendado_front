import { UPDATE_SERVICE_ERROR, UPDATE_SERVICE_LOADING, UPDATE_SERVICE_SUCCESS } from '../actions/types';

export default function(state=[], action) {
  let loading = {};
  switch (action.type) {
    case UPDATE_SERVICE_SUCCESS:
      loading = {'loading':false}
      let success = {'success': true}
      return Object.assign({}, {'result':action.payload}, success, loading);
    case UPDATE_SERVICE_ERROR:
      loading = {'loading':false}
      let error = {'error': true}
      let error_type = {'error_type': "Se ha producido un error"}
      return Object.assign({}, error, error_type, action.payload, loading);
    case UPDATE_SERVICE_LOADING:
      loading = {'loading':true}
      return Object.assign({}, loading);
    default:
      return state;
  }

}
