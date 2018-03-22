import { GET_PROFILE_BY_USERNAME } from './types';
import axios from 'axios';
import { ENDPOINT_URI } from '../Globals'

export default function getProfileByUsername(username) {
  return dispatch => {
    axios.get(ENDPOINT_URI+'/profiles-username/'+username+'/')
      .then(res => {
        dispatch(getProfileByUsernameAsync(res.data));
      });
  }
}

function getProfileByUsernameAsync(profile){
  return {
    type: GET_PROFILE_BY_USERNAME,
    payload: profile
  };
}
