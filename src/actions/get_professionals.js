import { GET_PROFESSIONALS } from './types';
import axios from 'axios';
import { ENDPOINT_URI } from '../Globals'

var baseUri = 'http://api.recomendado-dev.samir.cl';
export default function getProfessionals() {
  return dispatch => {
    axios.get(ENDPOINT_URI+'/professionals/')
      .then(res => {
        dispatch(getProfessionalsAsync(res.data));
      });
  }
}

function getProfessionalsAsync(professional){
  return {
    type: GET_PROFESSIONALS,
    payload: professional
  };
}
