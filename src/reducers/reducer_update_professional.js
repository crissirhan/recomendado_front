import { UPDATE_PROFESSIONAL_SUCCESS, UPDATE_PROFESSIONAL_ERROR, UPDATE_PROFESSIONAL_LOADING } from '../actions/types';

export default function(state=[], action) {

  let loading = {};
  switch (action.type) {
    case UPDATE_PROFESSIONAL_SUCCESS:
      loading = {'loading':false}
      let success = {'success': true}
      return Object.assign({}, action.payload, success, loading);
    case UPDATE_PROFESSIONAL_ERROR:
      loading = {'loading':false}
      let error = {'error': true}
      let error_type = {'error_type': "Se ha producido un error"}
      console.log(action)
      return Object.assign({}, error, error_type, action.payload, loading);
    case UPDATE_PROFESSIONAL_LOADING:
      loading = {'loading':true}
      return Object.assign({}, loading);
    default:
      return state;
  }

}
