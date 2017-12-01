import { UPDATE_SERVICE_SUCCESS, UPDATE_SERVICE_ERROR, UPDATE_SERVICE_LOADING } from './types';
import axios from 'axios';
import { ENDPOINT_URI } from '../Globals'


export default function updateService(service_id,data) {
  return dispatch => {
    dispatch(updateServicelLoadingAsync());
    axios.patch(ENDPOINT_URI+'/services/' + service_id + '/', data)
      .then(res => {
        dispatch(updateServiceSuccessAsync(res));
      })
      .catch(function (error) {
        dispatch(updateServiceErrorAsync(error.response));
      });
  }
}

function updateServiceSuccessAsync(response){
  return {
    type: UPDATE_SERVICE_SUCCESS,
    payload: response
  };
}

function updateServicelLoadingAsync(){
  return {
    type: UPDATE_SERVICE_LOADING,
    payload: null
  }
}

function updateServiceErrorAsync(error){
  return {
    type: UPDATE_SERVICE_ERROR,
    payload: error
  }
}
