import { GET_ANNOUNCEMENTS } from './types';
import axios from 'axios';

var baseUrl = 'http://35.196.31.174';

export default function getAnnouncements() {
  return dispatch => {
    axios.get(baseUrl+'/announcements/')
      .then(res => {
        console.log('Announcements ::', res.data);
        const announcements = res.data.map(announcement => {
          console.log(announcement);
          return announcement;
        });
        dispatch(getAnnouncementsAsync(announcements));
      });
  }
}

function getAnnouncementsAsync(announcements){
  return {
    type: GET_ANNOUNCEMENTS,
    payload: announcements
  };
}
