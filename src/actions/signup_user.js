import { SIGNUP_USER } from './types';
import axios from 'axios';
import { ENDPOINT_URI } from '../Globals'

var baseUri = 'http://api.recomendado-dev.samir.cl';
export default function signUp(username, password1, password2, email) {
  return dispatch => {
    axios.post(ENDPOINT_URI+'/rest-auth/registration/',{
      username: username,
      password1: password1,
      password2: password2,
      email: email
    },{
      headers:{
        'Accept-Language':'es-cl'
      }
    }).then(response => {
        dispatch(signUpAsync(response));
      });
  }
}

function signUpAsync(response){
  console.log(response);
  return {
    type: SIGNUP_USER,
    payload: response
  };
}
