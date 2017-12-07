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
      return Object.assign({}, action.payload, error, loading, error_types)
    case PUT_SERVICE_LOADING:
      loading = {loading:true}
      return Object.assign({}, loading)
    default:
      return state;
  }

}
