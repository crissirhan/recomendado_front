import { GET_ANNOUNCEMENTS_LOADING, GET_ANNOUNCEMENTS_ERROR, GET_ANNOUNCEMENTS_SUCCESS } from './types';
import axios from 'axios';
import { ENDPOINT_URI } from '../Globals'

var baseUri = 'http://api.recomendado-dev.samir.cl';
export default function getAnnouncements(params) {
  /*
  let query = '';
  if(announcement_id){
    query = announcement_id;
  } else{
    query = search_params ? "?search=" + search_params : '';
  }
  */
  return dispatch => {
    dispatch(getAnnouncementsLoadingAsync());
    console.log(params)
    axios.get(ENDPOINT_URI+'/announcements/', {params: params} )
      .then(res => {
        console.log(res.data)
        dispatch(getAnnouncementsSuccessAsync(res.data, params));
      })
      .catch(function (error) {
        console.log(error)
        dispatch(getAnnouncementsErrorAsync(error.response));
      });
  }
}

function getAnnouncementsSuccessAsync(announcements, params){
  return {
    type: GET_ANNOUNCEMENTS_SUCCESS,
    payload: announcements,
    params: params
  };
}
function getAnnouncementsErrorAsync(error){
  return {
    type: GET_ANNOUNCEMENTS_ERROR,
    payload: error
  };
}
function getAnnouncementsLoadingAsync(announcements){
  return {
    type: GET_ANNOUNCEMENTS_LOADING,
    payload: null
  };
}
