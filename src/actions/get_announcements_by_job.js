import { GET_ANNOUNCEMENTS_BY_JOB } from './types';
import axios from 'axios';
import { ENDPOINT_URI } from '../Globals'

export default function getAnnouncementsByJob(job_name,search_params) {
  let query = search_params ? "?search=" + search_params : '';
  return dispatch => {
    axios.get(ENDPOINT_URI+'/announcements/job-subtype/'+job_name+'/'+query)
      .then(res => {
        const announcements = res.data.map(announcement => {
          return announcement;
        });
        dispatch(getAnnouncementsAsyncByJob(announcements));
      });
  }
}

function getAnnouncementsAsyncByJob(announcements){
  function get(id){
    var result = this.filter(function( obj ) {
      return obj.id === id;
    });
    return result[0];
  }
  announcements.get = get;
  return {
    type: GET_ANNOUNCEMENTS_BY_JOB,
    payload: announcements
  };
}
