import { LOGIN_USER } from './types';
import axios from 'axios';

var baseUrl = 'http://35.196.31.174';

export default function login(username,password){
  return dispatch => {
    axios.post(baseUrl+'/rest-auth/login/', {
      username: username,
      password: password
    }).then(response => {
          dispatch(loginAsync(response));
        });
    }
}

function loginAsync(response){
  console.log(response);
  return {
    type: LOGIN_USER,
    payload: response
  };
}
