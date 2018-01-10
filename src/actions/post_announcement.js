import { POST_ANNOUNCEMENT_SUCCESS, POST_ANNOUNCEMENT_ERROR, POST_ANNOUNCEMENT_LOADING } from './types';
import axios from 'axios';
import { ENDPOINT_URI } from '../Globals'

var baseUri = 'http://api.recomendado-dev.samir.cl';
export default function postAnnouncement(datum) {
  return dispatch => {
    dispatch(postAnnouncementLoadingAsync());
    let data = new FormData()
    for (var key in datum) {
      if (datum.hasOwnProperty(key)) {
        data.append(key,datum[key])
      }
    }
    console.log(datum)
    axios.post(ENDPOINT_URI+'/post-announcements/', data)
      .then(res => {
        dispatch(postAnnouncementAsync(res.data));
      }).catch(function (error) {
        dispatch(postAnnouncementErrorAsync(error.response));
      });
  }
}

function postAnnouncementAsync(announcement){
  return {
    type: POST_ANNOUNCEMENT_SUCCESS,
    payload: announcement
  };
}

function postAnnouncementErrorAsync(error){
  return {
    type: POST_ANNOUNCEMENT_ERROR,
    payload: error
  }
}

function postAnnouncementLoadingAsync(){
  return {
    type: POST_ANNOUNCEMENT_LOADING,
    payload: null
  }
}
