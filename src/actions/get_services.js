import { GET_SERVICES_LOADING, GET_SERVICES_ERROR, GET_SERVICES_SUCCESS } from './types';
import axios from 'axios';
import { ENDPOINT_URI } from '../Globals'


export default function getServices(params) {
  return dispatch => {
    dispatch(getServicesLoadingAsync());
    axios.get(ENDPOINT_URI+'/services/', {params: params} )
      .then(res => {
        dispatch(getServicesSuccessAsync(res.data, params));
      })
      .catch(function (error) {
        dispatch(getServicesErrorAsync(error.response));
      });
  }
}

function getServicesSuccessAsync(services, params){
  return {
    type: GET_SERVICES_SUCCESS,
    payload: services,
    params: params
  };
}
function getServicesErrorAsync(error){
  return {
    type: GET_SERVICES_ERROR,
    payload: error
  };
}
function getServicesLoadingAsync(){
  return {
    type: GET_SERVICES_LOADING,
    payload: null
  };
}
