import { UPDATE_PROFESSIONAL } from './types';
import axios from 'axios';
import { ENDPOINT_URI } from '../Globals'

var baseUri = 'http://api.recomendado-dev.samir.cl';
export default function updateProfessional(professional_id,data) {
  return dispatch => {
    axios.patch(ENDPOINT_URI+'/professionals/'+professional_id+'/', data)
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
