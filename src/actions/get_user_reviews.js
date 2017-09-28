import { GET_USER_REVIEWS } from './types';
import axios from 'axios';


var baseUri = 'http://api.recomendado-dev.samir.cl';
export default function getUserReviews(professional_id) {
  return dispatch => {
    axios.get(baseUri+'/professional-reviews/'+professional_id+'/')
      .then(res => {
        dispatch(getUserReviewsAsync(res.data));
      });
  }
}

function getUserReviewsAsync(reviews){
  console.log(reviews);
  return {
    type: GET_USER_REVIEWS,
    payload: reviews
  };
}
