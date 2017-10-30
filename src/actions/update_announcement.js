import { UPDATE_ANNOUNCEMENTS_SUCCESS, UPDATE_ANNOUNCEMENTS_ERROR, UPDATE_ANNOUNCEMENTS_LOADING } from './types';
import axios from 'axios';
import { ENDPOINT_URI } from '../Globals'


var baseUri = 'http://api.recomendado-dev.samir.cl';
export default function updateAnnouncement(announcement_id,data) {
  return dispatch => {
    dispatch(updateAnnouncementlLoadingAsync());
    axios.patch(ENDPOINT_URI+'/announcements/' + announcement_id + '/', data)
      .then(res => {
        dispatch(updateAnnouncementsSuccessAsync(res));
      })
      .catch(function (error) {
        dispatch(updateAnnouncementsErrorAsync(error.response));
      });
  }
}

function updateAnnouncementsSuccessAsync(response){
  console.log(response)
  return {
    type: UPDATE_ANNOUNCEMENTS_SUCCESS,
    payload: response
  };
}

function updateAnnouncementlLoadingAsync(){
  return {
    type: UPDATE_ANNOUNCEMENTS_LOADING,
    payload: null
  }
}

function updateAnnouncementsErrorAsync(error){
  return {
    type: UPDATE_ANNOUNCEMENTS_ERROR,
    payload: error
  }
}
