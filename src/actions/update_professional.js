import { UPDATE_PROFESSIONAL_SUCCESS, UPDATE_PROFESSIONAL_ERROR, UPDATE_PROFESSIONAL_LOADING } from './types';
import axios from 'axios';
import { ENDPOINT_URI } from '../Globals'

var baseUri = 'http://api.recomendado-dev.samir.cl';
export default function updateProfessional(professional_id,data) {
  return dispatch => {
    dispatch(updateProfessionalLoadingAsync());
    axios.patch(ENDPOINT_URI+'/professionals/'+professional_id+'/', data)
      .then(res => {
        dispatch(updateProfessionalSuccessAsync(res.data));
      })
      .catch(function (error) {
        dispatch(updateProfessionalErrorAsync(error.response));
      });
  }
}

function updateProfessionalSuccessAsync(professional){
  return {
    type: UPDATE_PROFESSIONAL_SUCCESS,
    payload: professional
  };
}

function updateProfessionalErrorAsync(error){
  return {
    type: UPDATE_PROFESSIONAL_ERROR,
    payload: error
  };
}

function updateProfessionalLoadingAsync(){
  return {
    type: UPDATE_PROFESSIONAL_LOADING,
    payload: null
  };
}
