import { GET_PROFESSIONALS } from './types';
import axios from 'axios';


var baseUri = 'http://api.recomendado-dev.samir.cl';
export default function getProfessionals() {
  return dispatch => {
    axios.get(baseUri+'/professionals/')
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
