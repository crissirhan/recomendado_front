import { GET_PROFESSIONAL } from './types';
import axios from 'axios';


var baseUri = 'http://api.recomendado-dev.samir.cl';
export default function getProfessional(professional_id) {
  return dispatch => {
    axios.get(baseUri+'/professionals/'+professional_id+'/')
      .then(res => {
        console.log(res.data);
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
