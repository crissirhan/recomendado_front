import { USER_LOGIN, USER_LOGIN_ERROR } from './types';
import axios from 'axios';


var baseUri = 'http://api.recomendado-dev.samir.cl';
export default function login(username,password){
  return dispatch => {
      axios.post(baseUri+'/rest-auth/login/', {
      username: username,
      password: password
    })
    .then(function (response) {
      dispatch(loginSuccessAsync(response,username));
    })
    .catch(function (error) {
      dispatch(loginFailureAsync(error));
    });
  }
}

function loginSuccessAsync(login,username){
  console.log("Success, key:: " + login.data.key);
  const key = login.data.key;
  const data = {'token_key':key,'username':username};
  return {
    type: USER_LOGIN,
    payload: data
  };
}

function loginFailureAsync(login){
  console.log("Login error!");
  return {
    type: USER_LOGIN_ERROR,
    payload: null
  };
}
