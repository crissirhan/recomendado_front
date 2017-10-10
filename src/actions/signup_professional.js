import { SIGNUP_PROFESSIONAL } from './types';
import axios from 'axios';


var baseUri = 'http://api.recomendado-dev.samir.cl';
export default function signUpProfessional(data) {
  return dispatch => {
    axios.post(baseUri+'/professionals/',data).then(response => {
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
