import { GET_REVIEWS } from './types';
import axios from 'axios';


var baseUri = 'http://api.recomendado-dev.samir.cl';
export default function getReviews() {
  return dispatch => {
    axios.get(baseUri+'/reviews/')
      .then(res => {
        console.log(res.data);
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
