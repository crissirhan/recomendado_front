import { SIGNUP_PROFESSIONAL_SUCCESS, SIGNUP_PROFESSIONAL_ERROR, SIGNUP_PROFESSIONAL_LOADING } from '../actions/types';

export default function(state=[], action) {

  let loading = {};
  switch (action.type) {
    case SIGNUP_PROFESSIONAL_SUCCESS:
      loading = {'loading':false}
      let success = {'success': true}
      return Object.assign({}, action.payload, success, loading);
    case SIGNUP_PROFESSIONAL_ERROR:
      loading = {'loading':false}
      let error = {'error': true}
      let error_type = {'error_type': "Se ha producido un error"}
      if(action.payload.data.user){
        if(action.payload.data.user.username){
            error_type = {'error_type': "¡Un usuario con ese correo ya se ha registrado!"}
        }
      }
      return Object.assign({}, error, error_type, action.payload, loading);
    case SIGNUP_PROFESSIONAL_LOADING:
      loading = {'loading':true}
      return Object.assign({}, loading);
    default:
      return state;
  }

}
