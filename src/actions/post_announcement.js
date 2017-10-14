import { POST_ANNOUNCEMENT } from './types';
import axios from 'axios';
import { ENDPOINT_URI } from '../Globals'

var baseUri = 'http://api.recomendado-dev.samir.cl';
export default function postAnnouncement(data) {
  return dispatch => {
    axios.post(ENDPOINT_URI+'/post-announcements/', data)
      .then(res => {
        console.log(res.data);
        dispatch(postAnnouncementAsync(res.data));
      }).catch(function (error) {
        console.log(error);
      });
  }
}

function postAnnouncementAsync(announcement){
  return {
    type: POST_ANNOUNCEMENT,
    payload: announcement
  };
}
