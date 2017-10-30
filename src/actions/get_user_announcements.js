import { GET_USER_ANNOUNCEMENTS } from './types';
import axios from 'axios';
import { ENDPOINT_URI } from '../Globals'

var baseUri = 'http://api.recomendado-dev.samir.cl';
export default function getUserAnnouncements(professional_id) {
  return dispatch => {
    axios.get(ENDPOINT_URI+'/professional-announcements/'+professional_id+'/')
      .then(res => {
        dispatch(getUserAnnouncementsAsync(res.data));
      });
  }
}

function getUserAnnouncementsAsync(announcements){
  return {
    type: GET_USER_ANNOUNCEMENTS,
    payload: announcements
  };
}
