import { SIGNUP_PROFESSIONAL } from './types';
import axios from 'axios';
import { ENDPOINT_URI } from '../Globals'

var baseUri = 'http://api.recomendado-dev.samir.cl';
export default function signUpProfessional(data) {
  return dispatch => {
    axios.post(ENDPOINT_URI+'/professionals/',data).then(response => {
        dispatch(signUpProfessionalAsync(response));
      });
  }
}

function signUpProfessionalAsync(response){
  console.log(response);
  return {
    type: SIGNUP_PROFESSIONAL,
    payload: response
  };
}
