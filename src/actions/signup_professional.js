import { SIGNUP_PROFESSIONAL_SUCCESS, SIGNUP_PROFESSIONAL_ERROR, SIGNUP_PROFESSIONAL_LOADING } from './types';
import axios from 'axios';
import { ENDPOINT_URI } from '../Globals'

var baseUri = 'http://api.recomendado-dev.samir.cl';
export default function signUpProfessional(datum) {
  return dispatch => {
    dispatch(signUpProfessionalLoadingAsync());
    let data = new FormData()
    for (var key in datum) {
      if (datum.hasOwnProperty(key)) {
        data.append(key,datum[key])
      }
    }
    axios.post(ENDPOINT_URI+'/professionals/',datum,{
      headers:{
        'Accept-Language':'es-cl'
      }
    }).then(response => {
        dispatch(signUpProfessionalAsync(response));
      })
      .catch(function (error) {
        dispatch(signUpProfessionalErrorAsync(error.response));
      });
  }
}

function signUpProfessionalAsync(response){
  return {
    type: SIGNUP_PROFESSIONAL_SUCCESS,
    payload: response
  };
}

function signUpProfessionalErrorAsync(error){
  return {
    type:  SIGNUP_PROFESSIONAL_ERROR,
    payload: error
  }
}

function signUpProfessionalLoadingAsync(){
  return {
    type: SIGNUP_PROFESSIONAL_LOADING,
    payload: null
  }
}
