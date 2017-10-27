import { GET_CLIENT_REVIEWS } from './types';
import axios from 'axios';
import { ENDPOINT_URI } from '../Globals'

var baseUri = 'http://api.recomendado-dev.samir.cl';
export default function getClientReviews(client_id) {
  return dispatch => {
    axios.get(ENDPOINT_URI+'/client-reviews/'+client_id+'/')
      .then(res => {
        dispatch(getClientRewiewsAsync(res.data));
      });
  }
}

function getClientRewiewsAsync(reviews){
  return {
    type: GET_CLIENT_REVIEWS,
    payload: reviews
  };
}
