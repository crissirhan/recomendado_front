import { UPDATE_CLIENT_ERROR, UPDATE_CLIENT_LOADING, UPDATE_CLIENT_SUCCESS } from './types';
import axios from 'axios';
import { ENDPOINT_URI } from '../Globals'

var baseUri = 'http://api.recomendado-dev.samir.cl';
export default function updateClient(client_id,datum) {
  return dispatch => {
    dispatch(updateClientLoadingAsync());
    let image = datum.profile_picture
    const config = {headers: { 'content-type': 'multipart/form-data', 'Content-Disposition': 'attachment;filename='+image.name}}
    let data = new FormData()
    for (var key in datum) {
      if (datum.hasOwnProperty(key)) {
        data.append(key,datum[key])
      }
    }
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
