import { UPDATE_CLIENT_ERROR, UPDATE_CLIENT_LOADING, UPDATE_CLIENT_SUCCESS } from './types';
import axios from 'axios';
import { ENDPOINT_URI } from '../Globals'

export default function updateClient(client_id,data) {
  return dispatch => {
    dispatch(updateClientLoadingAsync());
    axios.patch(ENDPOINT_URI+'/clients/'+client_id+'/', data)
      .then(res => {
        dispatch(updateClientSuccessAsync(res.data));
      })
      .catch(function (error) {
        dispatch(updateClientErrorAsync(error.response));
      });
  }
}

function updateClientSuccessAsync(client){
  return {
    type: UPDATE_CLIENT_SUCCESS,
    payload: client
  };
}

function updateClientErrorAsync(error){
  return {
    type: UPDATE_CLIENT_ERROR,
    payload: error
  };
}

function updateClientLoadingAsync(){
  return {
    type: UPDATE_CLIENT_LOADING,
    payload: null
  };
}
