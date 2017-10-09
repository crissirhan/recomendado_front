import { UPDATE_CLIENT } from './types';
import axios from 'axios';


var baseUri = 'http://api.recomendado-dev.samir.cl';
export default function updateClient(client_id,data) {
  return dispatch => {
    axios.patch(baseUri+'/clients/'+client_id+'/', data)
      .then(res => {
        console.log(res.data);
        dispatch(updateClientlAsync(res.data));
      });
  }
}

function updateClientlAsync(professional){
  return {
    type: UPDATE_CLIENT,
    payload: professional
  };
}
