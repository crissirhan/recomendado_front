import { USER_LOGIN_SUCCESS, USER_SIGNUP_PROFESSIONAL } from './types';
import axios from 'axios';


var baseUri = 'http://api.recomendado-dev.samir.cl';
export default function login(username,password){
  return dispatch => {
      axios.post(baseUri+'/rest-auth/login/', {
      username: username,
      password: password
    })
    .then(function (response) {
      dispatch(loginSuccessAsync(response));
    })
    .catch(function (error) {
      dispatch(loginFailureAsync(error));
    });
  }
}

function loginSuccessAsync(login){
  const key = login.data.key;
  return {
    type: USER_LOGIN_SUCCESS,
    payload: key
  };
}

function loginFailureAsync(login){
  return {
    type: USER_LOGIN_ERROR,
    payload: null
  };
}


export function signUp(username,password1, password2, email){
  return axios.post(baseUri+'/rest-auth/registration/', {
    username: username,
    password1: password1,
    password2: password2,
    email: email
  })
  .then(function (response) {
  })
  .catch(function (error) {
  });
}
