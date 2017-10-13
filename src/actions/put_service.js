import { PUT_SERVICE } from './types';
import axios from 'axios';


var baseUri = 'http://api.recomendado-dev.samir.cl';
export default function putService(data) {
  return dispatch => {
    axios.post(baseUri+'/post-services/', data)
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
