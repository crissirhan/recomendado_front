import { GET_ANNOUNCEMENTS } from './types';
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
    axios.get(ENDPOINT_URI+'/announcements/' + query)
      .then(res => {
        dispatch(getAnnouncementsAsync(res.data));
      });
  }
}

function getAnnouncementsAsync(announcements){
  return {
    type: GET_ANNOUNCEMENTS,
    payload: announcements
  };
}
