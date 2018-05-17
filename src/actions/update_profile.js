import { UPDATE_PROFILE_ERROR, UPDATE_PROFILE_LOADING, UPDATE_PROFILE_SUCCESS } from './types';
import axios from 'axios';
import { ENDPOINT_URI } from '../Globals'

export default function updateProfile(profile_id,data) {
  return dispatch => {
    dispatch(updateProfileLoadingAsync());
    axios.patch(ENDPOINT_URI+'/profiles/'+profile_id+'/', data)
      .then(res => {
        dispatch(updateProfileSuccessAsync(res.data));
      })
      .catch(function (error) {
        dispatch(updateProfileErrorAsync(error.response));
      });
  }
}

function updateProfileSuccessAsync(profile){
  return {
    type: UPDATE_PROFILE_SUCCESS,
    payload: profile
  };
}

function updateProfileErrorAsync(error){
  return {
    type: UPDATE_PROFILE_ERROR,
    payload: error
  };
}

function updateProfileLoadingAsync(){
  return {
    type: UPDATE_PROFILE_LOADING,
    payload: null
  };
}
