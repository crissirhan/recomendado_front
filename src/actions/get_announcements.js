import { GET_ANNOUNCEMENTS_LOADING, GET_ANNOUNCEMENTS_ERROR, GET_ANNOUNCEMENTS_SUCCESS } from './types';
import axios from 'axios';
import { ENDPOINT_URI } from '../Globals'

var baseUri = 'http://api.recomendado-dev.samir.cl';
export default function getAnnouncements(announcement_id,search_params) {
  let query = '';
  if(announcement_id){
    query = announcement_id;
  } else{
    query = search_params ? "?search=" + search_params : '';
  }
  return dispatch => {
    dispatch(getAnnouncementsLoadingAsync());
    axios.get(ENDPOINT_URI+'/announcements/' + query)
      .then(res => {
        dispatch(getAnnouncementsSuccessAsync(res.data));
      })
      .catch(function (error) {
        console.log(error)
        dispatch(getAnnouncementsErrorAsync(error.response));
      });
  }
}

function getAnnouncementsSuccessAsync(announcements){
  return {
    type: GET_ANNOUNCEMENTS_SUCCESS,
    payload: announcements
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
