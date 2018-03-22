import { SIGNUP_LOADING, SIGNUP_SUCCESS, SIGNUP_ERROR } from './types';
import axios from 'axios';
import { ENDPOINT_URI } from '../Globals'

export default function signUp(datum) {
  return dispatch => {
    dispatch(signUpLoadingAsync());
    axios.post(ENDPOINT_URI+'/rest-auth/registration/',datum,{
      headers:{
        'Accept-Language':'es-cl'
      }
    }).then(response => {
        dispatch(signUpAsync(response));
      })
      .catch(function (error) {
        dispatch(signUpErrorAsync(error.response));
      });
  }
}

function signUpAsync(response){
  return {
    type: SIGNUP_SUCCESS,
    payload: response
  };
}

function signUpErrorAsync(error){
  return {
    type:  SIGNUP_ERROR,
    payload: error
  }
}

function signUpLoadingAsync(){
  return {
    type: SIGNUP_LOADING,
    payload: null
  }
}
