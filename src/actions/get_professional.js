import { GET_PROFESSIONAL } from './types';
import axios from 'axios';
import { ENDPOINT_URI } from '../Globals'

var baseUri = 'http://api.recomendado-dev.samir.cl';
export default function getProfessional(professional_id) {
  return dispatch => {
    axios.get(ENDPOINT_URI+'/professionals/'+professional_id+'/')
      .then(res => {
        dispatch(getProfessionalAsync(res.data));
      });
  }
}

function getProfessionalAsync(professional){
  return {
    type: GET_PROFESSIONAL,
    payload: professional
  };
}
