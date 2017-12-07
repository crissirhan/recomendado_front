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
      return Object.assign({}, error, error_type, action.payload, loading, error_types);
    case UPDATE_SERVICE_LOADING:
      loading = {'loading':true}
      return Object.assign({}, loading);
    default:
      return state;
  }

}
