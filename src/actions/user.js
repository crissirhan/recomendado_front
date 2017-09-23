import { USER_LOGIN, USER_SIGNUP_PROFESSIONAL } from './types';
import axios from 'axios';

//TODO: Add a configuration file with the URIs
var baseUrl = 'http://35.196.31.174';//'http://localhost:8000';

export default function login(username,password){
  return dispatch => {
      axios.post(baseUrl+'/rest-auth/login/', {
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
  console.log("Success, key:: " + login.data.key);
  const key = login.data.key;
  console.log(key);
  return {
    type: USER_LOGIN,
    payload: key
  };
}

function loginFailureAsync(login){
  console.log("Login error!");
  return {
    type: USER_LOGIN,
    payload: null
  };
}


export function signUp(username,password1, password2, email){
  console.log(username + ' ' + password1);
  return axios.post(baseUrl+'/rest-auth/registration/', {
    username: username,
    password1: password1,
    password2: password2,
    email: email
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
}
