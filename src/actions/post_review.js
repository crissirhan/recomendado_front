import { POST_REVIEW } from './types';
import axios from 'axios';
import { ENDPOINT_URI } from '../Globals'

var baseUri = 'http://api.recomendado-dev.samir.cl';
export default function postReview(data) {
  return dispatch => {
    axios.post(ENDPOINT_URI+'/post-reviews/', data)
      .then(res => {
        console.log(res.data);
        dispatch(postReviewAsync(res.data));
      }).catch(function (error) {
        console.log(error);
      });
  }
}

function postReviewAsync(service){
  return {
    type: POST_REVIEW,
    payload: service
  };
}
