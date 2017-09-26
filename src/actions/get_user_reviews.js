import { GET_USER_REVIEWS } from './types';
import axios from 'axios';

var baseUrl = 'http://35.196.31.174';

export default function getUserReviews(professional_id) {
  return dispatch => {
    axios.get(baseUrl+'/professional-reviews/'+professional_id+'/')
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
