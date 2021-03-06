import { GET_CLIENT_BY_USERNAME } from './types';
import axios from 'axios';
import { ENDPOINT_URI } from '../Globals'

var baseUri = 'http://api.recomendado-dev.samir.cl';
export default function getClientByUsername(client_username) {
  return dispatch => {
    axios.get(ENDPOINT_URI+'/clients-username/'+client_username+'/')
      .then(res => {
        dispatch(getClientByUsernameAsync(res.data));
      });
  }
}

function getClientByUsernameAsync(client){
  return {
    type: GET_CLIENT_BY_USERNAME,
    payload: client
  };
}
