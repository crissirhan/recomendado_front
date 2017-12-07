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
      let errors = []
      for (var key in action.payload.data) {
          if (action.payload.data.hasOwnProperty(key)) {
            action.payload.data[key].map(error => {
              if(key === 'non_field_errors'){
                errors.push(error)
              }
              else{
                for (var err_key in error) {
                  if (error.hasOwnProperty(err_key)) {
                    error[err_key].map(err => errors.push(err))
                  }
                }
              }
            })
          }
      }
      let error_types = {'error_types':errors}
      console.log(error_types)
      return Object.assign({}, action.payload, error, loading, error_type, error_types);
    case GET_JOB_BY_NAME_LOADING:
      loading = {'loading': true}
      return Object.assign({}, loading);
    default:
      return state;
  }

}
