import { GET_PROFESSIONAL } from './types';
import axios from 'axios';

var baseUrl = 'http://35.196.31.174';

export default function getProfessional(professional_id) {
  return dispatch => {
    axios.get(baseUrl+'/professionals/'+professional_id+'/')
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
