import { GET_ANNOUNCEMENTS } from './types';
import axios from 'axios';

var baseUrl = 'http://35.196.31.174';

export default function getAnnouncements() {
  return dispatch => {
    axios.get(baseUrl+'/announcements/')
      .then(res => {
        const announcements = res.data.map(announcement => {
          return announcement;
        });
        dispatch(getAnnouncementsAsync(announcements));
      });
  }
}

function getAnnouncementsAsync(announcements){
  function get(id){
    var result = this.filter(function( obj ) {
      return obj.id === id;
    });
    return result[0];
  }
  announcements.get = get;
  return {
    type: GET_ANNOUNCEMENTS,
    payload: announcements
  };
}
