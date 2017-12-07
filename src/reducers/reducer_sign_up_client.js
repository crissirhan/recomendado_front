import { SIGNUP_CLIENT_SUCCESS, SIGNUP_CLIENT_LOADING, SIGNUP_CLIENT_ERROR } from '../actions/types';

export default function(state=[], action) {

  let loading = {};
  switch (action.type) {
    case SIGNUP_CLIENT_SUCCESS:
      loading = {'loading':false}
      let success = {'success': true}
      return Object.assign({}, action.payload, success, loading);
    case SIGNUP_CLIENT_ERROR:
      loading = {'loading':false}
      let error = {'error': true}
      let error_type = {'error_type': "Se ha producido un error"}
      if(action.payload.data.user){
        if(action.payload.data.user.username){
            error_type = {'error_type': "¡Un usuario con ese correo ya se ha registrado!"}
        }
      }
      let errors = []
      console.log(action.payload)
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
    case SIGNUP_CLIENT_LOADING:
      loading = {'loading':true}
      return Object.assign({}, loading);
    default:
      return state;
  }

}
