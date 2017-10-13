import { UPDATE_ANNOUNCEMENTS } from './types';
import axios from 'axios';
import { ENDPOINT_URI } from '../Globals'


var baseUri = 'http://api.recomendado-dev.samir.cl';
export default function updateAnnouncement(announcement_id,data) {
  return dispatch => {
    axios.patch(ENDPOINT_URI+'/announcements/' + announcement_id + '/', data)
      .then(res => {
        dispatch(updateAnnouncementsAsync(res));
      });
  }
}

function updateAnnouncementsAsync(res){
  return {
    type: UPDATE_ANNOUNCEMENTS,
    payload: res
  };
}
