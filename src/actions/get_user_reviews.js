import { GET_USER_REVIEWS } from './types';
import axios from 'axios';

var baseUrl = 'http://35.196.31.174';

export default function getUserReviews(professional_id) {
  return dispatch => {
    axios.get(baseUrl+'/professional-reviews/'+professional_id+'/')
      .then(res => {
        console.log(res);
        const reviews = res.data.reviews.map(review => {return review;});
        console.log(res.data);
        dispatch(getUserReviewsAsync(res.data));
      });
  }
}

function getUserReviewsAsync(reviews){
  return {
    type: GET_USER_REVIEWS,
    payload: reviews
  };
}
