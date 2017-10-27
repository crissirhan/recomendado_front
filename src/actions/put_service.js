import { PUT_SERVICE_SUCCESS, PUT_SERVICE_LOADING, PUT_SERVICE_ERROR } from './types';
import axios from 'axios';
import { ENDPOINT_URI } from '../Globals'

var baseUri = 'http://api.recomendado-dev.samir.cl';
export default function putService(data) {
  return dispatch => {
    dispatch(putServiceLoadingAsync());
    axios.post(ENDPOINT_URI+'/post-services/', data)
      .then(res => {
        console.log(res.data);
        dispatch(putServiceAsync(res.data));
      }).catch(function (error) {
        dispatch(putServiceErrorAsync(error));
      });
  }
}

function putServiceLoadingAsync(){
    return {
      type:PUT_SERVICE_LOADING,
      payload:null
    }
}

function putServiceAsync(service){
  return {
    type: PUT_SERVICE_SUCCESS,
    payload: service
  };
}

function putServiceErrorAsync(error){
  return {
    type: PUT_SERVICE_ERROR,
    payload: error
  }
}
