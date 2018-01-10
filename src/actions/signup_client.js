import { SIGNUP_CLIENT_LOADING, SIGNUP_CLIENT_SUCCESS, SIGNUP_CLIENT_ERROR } from './types';
import axios from 'axios';
import { ENDPOINT_URI } from '../Globals'

var baseUri = 'http://api.recomendado-dev.samir.cl';
export default function signUpClient(datum) {
  return dispatch => {
    dispatch(signUpClientLoadingAsync());
    let data = new FormData()
    for (var key in datum) {
      if (datum.hasOwnProperty(key)) {
        data.append(key,datum[key])
      }
    }
    axios.post(ENDPOINT_URI+'/clients/',data,{
      headers:{
        'Accept-Language':'es-cl'
      }
    }).then(response => {
        dispatch(signUpClientAsync(response));
      })
      .catch(function (error) {
        dispatch(signUpClientErrorAsync(error.response));
      });
  }
}

function signUpClientAsync(response){
  return {
    type: SIGNUP_CLIENT_SUCCESS,
    payload: response
  };
}

function signUpClientErrorAsync(error){
  return {
    type:  SIGNUP_CLIENT_ERROR,
    payload: error
  }
}

function signUpClientLoadingAsync(){
  return {
    type: SIGNUP_CLIENT_LOADING,
    payload: null
  }
}
