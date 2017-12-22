import { UPDATE_REVIEW_SUCCESS, UPDATE_REVIEW_ERROR, UPDATE_REVIEW_LOADING } from './types';
import axios from 'axios';
import { ENDPOINT_URI } from '../Globals'


var baseUri = 'http://api.recomendado-dev.samir.cl';
export default function updateReview(review_id,data) {
  return dispatch => {
    dispatch(updateReviewlLoadingAsync());
    axios.patch(ENDPOINT_URI+'/reviews/' + review_id + '/', data)
      .then(res => {
        dispatch(updateReviewSuccessAsync(res));
      })
      .catch(function (error) {
        dispatch(updateReviewErrorAsync(error.response));
      });
  }
}

function updateReviewSuccessAsync(response){
  return {
    type: UPDATE_REVIEW_SUCCESS,
    payload: response
  };
}

function updateReviewlLoadingAsync(){
  return {
    type: UPDATE_REVIEW_LOADING,
    payload: null
  }
}

function updateReviewErrorAsync(error){
  return {
    type: UPDATE_REVIEW_ERROR,
    payload: error
  }
}
