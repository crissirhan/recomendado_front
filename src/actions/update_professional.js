import { UPDATE_PROFESSIONAL_SUCCESS, UPDATE_PROFESSIONAL_ERROR, UPDATE_PROFESSIONAL_LOADING } from './types';
import axios from 'axios';
import { ENDPOINT_URI } from '../Globals'

export default function updateProfessional(professional_id,datum) {
  return dispatch => {
    dispatch(updateProfessionalLoadingAsync());
    const config = {headers: { 'content-type': 'multipart/form-data' }}
    let data = new FormData()
    for (var key in datum) {
      if (datum.hasOwnProperty(key)) {
        data.append(key,datum[key])
      }
    }
    axios.patch(ENDPOINT_URI+'/professionals/'+professional_id+'/', datum)
      .then(res => {
        dispatch(updateProfessionalSuccessAsync(res.data));
      })
      .catch(function (error) {
        console.log(error)
        if(error.response) {
          dispatch(updateProfessionalErrorAsync(error.response))
        } else {
          dispatch(updateProfessionalErrorAsync(error))
        }
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
