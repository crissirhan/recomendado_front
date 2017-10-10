import { SIGNUP_CLIENT } from './types';
import axios from 'axios';


var baseUri = 'http://api.recomendado-dev.samir.cl';
export default function signUpClient(data) {
  return dispatch => {
    axios.post(baseUri+'/clients/',data).then(response => {
        dispatch(signUpClientAsync(response));
      });
  }
}

function signUpClientAsync(response){
  console.log(response);
  return {
    type: SIGNUP_CLIENT,
    payload: response
  };
}
