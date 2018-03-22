import { USER_LOGIN_SUCCESS, USER_LOGIN_ERROR, USER_LOGIN_LOADING } from './types';
import axios from 'axios';
import { ENDPOINT_URI } from '../Globals'

export default function login(username,password){
  return dispatch => {
      console.log(username,password)
      dispatch(requestingLogin());
      axios.post(ENDPOINT_URI+'/rest-auth/login/', {
      username: username,
      password: password
    },{
      headers:{
        'Accept-Language':'es'
    }})
    .then(function (response) {
      dispatch(loginSuccessAsync(response,username));
    })
    .catch(function (error) {
      dispatch(loginFailureAsync(error));
    });
  }
}
function requestingLogin(){
  return {
    type: USER_LOGIN_LOADING,
    payload: null
  };
}

function loginSuccessAsync(login,username){
  const key = login.data.key;
  const data = {'token':key,'username':username};
  return {
    type: USER_LOGIN_SUCCESS,
    payload: data
  };
}

function loginFailureAsync(error){
  return {
    type: USER_LOGIN_ERROR,
    payload: error.response
  };
}
