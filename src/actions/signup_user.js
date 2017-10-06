import { SIGNUP_USER } from './types';
import axios from 'axios';


var baseUri = 'http://api.recomendado-dev.samir.cl';
export default function signUp(username, password1, password2, email) {
  return dispatch => {
    axios.post(baseUri+'/rest-auth/registration/',{
      username: username,
      password1: password1,
      password2: password2,
      email: email
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
