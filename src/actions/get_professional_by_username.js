import { GET_PROFESSIONAL_BY_USERNAME } from './types';
import axios from 'axios';
import { ENDPOINT_URI } from '../Globals'

var baseUri = 'http://api.recomendado-dev.samir.cl';
export default function getProfessionalByUsername(professional_username) {
  return dispatch => {
    axios.get(ENDPOINT_URI+'/professionals-username/'+professional_username+'/')
      .then(res => {
        dispatch(getProfessionalByUsernameAsync(res.data));
      });
  }
}

function getProfessionalByUsernameAsync(professional){
  return {
    type: GET_PROFESSIONAL_BY_USERNAME,
    payload: professional
  };
}
