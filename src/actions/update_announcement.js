import { UPDATE_ANNOUNCEMENTS } from './types';
import axios from 'axios';


var baseUri = 'http://api.recomendado-dev.samir.cl';
export default function updateAnnouncement(announcement_id,data) {
  return dispatch => {
    axios.patch(baseUri+'/announcements/' + announcement_id + '/', data)
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
