import { USER_LOGIN } from './types';
import axios from 'axios';

var baseUrl = 'http://35.196.31.174';

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
