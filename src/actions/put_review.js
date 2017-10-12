import { PUT_REVIEW } from './types';
import axios from 'axios';


var baseUri = 'http://api.recomendado-dev.samir.cl';
export default function putReview(data) {
  return dispatch => {
    axios.post(baseUri+'/reviews/', data)
      .then(res => {
        console.log(res.data);
        dispatch(putReviewAsync(res.data));
      });
  }
}

function putReviewAsync(review){
  return {
    type: PUT_REVIEW,
    payload: review
  };
}
