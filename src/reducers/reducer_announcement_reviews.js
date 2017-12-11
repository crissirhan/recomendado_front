import { GET_ANNOUNCEMENT_REVIEWS_ERROR, GET_ANNOUNCEMENT_REVIEWS_LOADING, GET_ANNOUNCEMENT_REVIEWS_SUCCESS } from '../actions/types';

export default function(state=[], action) {
  let loading = {};
  switch (action.type) {
    case GET_ANNOUNCEMENT_REVIEWS_SUCCESS:
      loading = {'loading':false}
      let success = {'success': true}
      return Object.assign({}, {'result':action.payload}, success, loading);
    case GET_ANNOUNCEMENT_REVIEWS_ERROR:
      loading = {'loading':false}
      let error = {'error': true}
      let error_type = {'error_type': "Se ha producido un error"}
      return Object.assign({}, error, error_type, action.payload, loading);
    case GET_ANNOUNCEMENT_REVIEWS_LOADING:
      loading = {'loading':true}
      return Object.assign({}, loading);
    default:
      return state;
  }

}
