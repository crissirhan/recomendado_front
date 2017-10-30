import { GET_CLIENT_SERVICES } from './types';
import axios from 'axios';
import { ENDPOINT_URI } from '../Globals'

var baseUri = 'http://api.recomendado-dev.samir.cl';
export default function getClientServices(client_id) {
  return dispatch => {
    axios.get(ENDPOINT_URI+'/client-services/'+client_id+'/')
      .then(res => {
        dispatch(getClientServicesAsync(res.data));
      });
  }
}

function getClientServicesAsync(services){
  return {
    type: GET_CLIENT_SERVICES,
    payload: services
  };
}
