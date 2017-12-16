import { POST_REVIEW_ERROR, POST_REVIEW_LOADING, POST_REVIEW_SUCCESS } from './types';
import axios from 'axios';
import { ENDPOINT_URI } from '../Globals'

var baseUri = 'http://api.recomendado-dev.samir.cl';
export default function postReview(data) {
  return dispatch => {
    dispatch(postReviewLoadingAsync());
    axios.post(ENDPOINT_URI+'/post-reviews/', data)
      .then(res => {
        dispatch(postReviewSuccessAsync(res.data));
      }).catch(function (error) {
        dispatch(postReviewErrorAsync(error));
      });
  }
}

function postReviewSuccessAsync(review){
  return {
    type: POST_REVIEW_SUCCESS,
    payload: review
  };
}
function postReviewLoadingAsync(){
    return {
      type:POST_REVIEW_LOADING,
      payload:null
    }
}
function postReviewErrorAsync(error){
  return {
    type: POST_REVIEW_ERROR,
    payload: error
  }
}
