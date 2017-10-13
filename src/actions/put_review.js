import { PUT_REVIEW } from './types';
import axios from 'axios';
import { ENDPOINT_URI } from '../Globals'


var baseUri = 'http://api.recomendado-dev.samir.cl';
export default function putReview(data) {
  return dispatch => {
    axios.post(ENDPOINT_URI+'/reviews/', data)
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
