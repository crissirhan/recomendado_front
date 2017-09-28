import { GET_ANNOUNCEMENTS } from './types';
import axios from 'axios';


var baseUri = 'http://api.recomendado-dev.samir.cl';
export default function getAnnouncements() {
  return dispatch => {
    axios.get(baseUri+'/announcements/')
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
