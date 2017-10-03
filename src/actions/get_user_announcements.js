import { GET_USER_ANNOUNCEMENTS } from './types';
import axios from 'axios';


var baseUri = 'http://api.recomendado-dev.samir.cl';
export default function getUserAnnouncements(professional_id) {
  return dispatch => {
    axios.get(baseUri+'/professional-announcements/'+professional_id+'/')
      .then(res => {
        dispatch(getUserAnnouncementsAsync(res.data));
      });
  }
}

function getUserAnnouncementsAsync(announcements){
  console.log(announcements);
  return {
    type: GET_USER_ANNOUNCEMENTS,
    payload: announcements
  };
}
