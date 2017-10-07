import { UPDATE_PROFESSIONAL } from './types';
import axios from 'axios';


var baseUri = 'http://api.recomendado-dev.samir.cl';
export default function updateProfessional(professional_id,data) {
  return dispatch => {
    axios.patch(baseUri+'/professionals/'+professional_id+'/', data)
      .then(res => {
        console.log(res.data);
        dispatch(updateProfessionalAsync(res.data));
      });
  }
}

function updateProfessionalAsync(professional){
  return {
    type: UPDATE_PROFESSIONAL,
    payload: professional
  };
}
