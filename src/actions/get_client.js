import { GET_CLIENT } from './types';
import axios from 'axios';

var baseUrl = 'http://35.196.31.174';

export default function getClient(client_id) {
  return dispatch => {
    axios.get(baseUrl+'/clients/'+client_id+'/')
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
