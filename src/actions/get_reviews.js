import { GET_REVIEWS } from './types';
import axios from 'axios';
import { ENDPOINT_URI } from '../Globals'

var baseUri = 'http://api.recomendado-dev.samir.cl';
export default function getReviews() {
  return dispatch => {
    axios.get(ENDPOINT_URI+'/reviews/')
      .then(res => {
        dispatch(getReviewsAsync(res.data));
      });
  }
}

function getReviewsAsync(reviews){
  return {
    type: GET_REVIEWS,
    payload: reviews
  };
}
