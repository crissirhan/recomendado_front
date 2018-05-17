import { GET_PROFILE } from './types';
import axios from 'axios';
import { ENDPOINT_URI } from '../Globals'

export default function getProfile(profile_id) {
  return dispatch => {
    axios.get(ENDPOINT_URI+'/profiles/'+profile_id+'/')
      .then(res => {
        dispatch(getProfileAsync(res.data));
      });
  }
}

function getProfileAsync(profile){
  return {
    type: GET_PROFILE,
    payload: profile
  };
}
