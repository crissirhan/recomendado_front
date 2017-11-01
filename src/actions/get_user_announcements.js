import { GET_USER_ANNOUNCEMENTS_SUCCESS, GET_USER_ANNOUNCEMENTS_ERROR, GET_USER_ANNOUNCEMENTS_LOADING } from './types';
import axios from 'axios';
import { ENDPOINT_URI } from '../Globals'

var baseUri = 'http://api.recomendado-dev.samir.cl';
export default function getUserAnnouncements(professional_id) {
  return dispatch => {
    dispatch(getUserAnnouncementsLoadingAsync());
    axios.get(ENDPOINT_URI+'/professional-announcements/'+professional_id+'/')
      .then(res => {
        dispatch(getUserAnnouncementsSuccessAsync(res.data));
      })
      .catch(function (error) {
        dispatch(getUserAnnouncementsErrorAsync(error.response));
      });
  }
}

function getUserAnnouncementsSuccessAsync(announcements){
  return {
    type: GET_USER_ANNOUNCEMENTS_SUCCESS,
    payload: announcements
  };
}
function getUserAnnouncementsErrorAsync(error){
  return {
    type: GET_USER_ANNOUNCEMENTS_ERROR,
    payload: error
  };
}
function getUserAnnouncementsLoadingAsync(announcements){
  return {
    type: GET_USER_ANNOUNCEMENTS_LOADING,
    payload: null
  };
}
