import { GET_CLIENT } from './types';
import axios from 'axios';
import { ENDPOINT_URI } from '../Globals'

var baseUri = 'http://api.recomendado-dev.samir.cl';
export default function getClient(client_id) {
  return dispatch => {
    axios.get(ENDPOINT_URI+'/clients/'+client_id+'/')
      .then(res => {
        console.log(res.data);
        dispatch(getClientAsync(res.data));
      });
  }
}

function getClientAsync(client){
  console.log(client);
  return {
    type: GET_CLIENT,
    payload: client
  };
}
