import { PUT_SERVICE } from './types';
import axios from 'axios';
import { ENDPOINT_URI } from '../Globals'

var baseUri = 'http://api.recomendado-dev.samir.cl';
export default function putService(data) {
  return dispatch => {
    axios.post(ENDPOINT_URI+'/post-services/', data)
      .then(res => {
        console.log(res.data);
        dispatch(putServiceAsync(res.data));
      }).catch(function (error) {
        console.log(error);
      });
  }
}

function putServiceAsync(service){
  return {
    type: PUT_SERVICE,
    payload: service
  };
}