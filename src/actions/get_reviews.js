import { GET_REVIEWS_ERROR, GET_REVIEWS_LOADING, GET_REVIEWS_SUCCESS } from './types';
import axios from 'axios';
import { ENDPOINT_URI } from '../Globals'


export default function getReviews(params) {
  return dispatch => {
    dispatch(getReviewsLoadingAsync())
    axios.get(ENDPOINT_URI+'/reviews/', {params: params})
      .then(res => {
        dispatch(getReviewsSuccessAsync(res.data, params));
      })
      .catch(function (error) {
        dispatch(getReviewsErrorAsync(error.response));
      });
  }
}

function getReviewsSuccessAsync(reviews, params){
  return {
    type: GET_REVIEWS_SUCCESS,
    payload: reviews,
    params: params
  };
}

function getReviewsLoadingAsync(){
  return {
    type: GET_REVIEWS_LOADING,
    payload: null
  }
}

function getReviewsErrorAsync(error){
  return {
    type: GET_REVIEWS_ERROR,
    payload: error
  }
}
