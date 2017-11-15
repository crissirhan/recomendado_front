import { GET_ANNOUNCEMENT_REVIEWS_SUCCESS, GET_ANNOUNCEMENT_REVIEWS_ERROR, GET_ANNOUNCEMENT_REVIEWS_LOADING} from './types';
import axios from 'axios';
import { ENDPOINT_URI } from '../Globals'

var baseUri = 'http://api.recomendado-dev.samir.cl';
export default function getAnnouncementReviews(announcement_id) {
  return dispatch => {
    dispatch(getAnnouncementReviewsLoadingAsync());
    axios.get(ENDPOINT_URI+'/announcement-reviews/'+announcement_id+'/')
      .then(res => {
        dispatch(getAnnouncementReviewsSuccessAsync(res.data));
      })
      .catch(function (error) {
        dispatch(getAnnouncementReviewsErrorAsync(error.data))
      });
  }
}

function getAnnouncementReviewsSuccessAsync(reviews){
  return {
    type: GET_ANNOUNCEMENT_REVIEWS_SUCCESS,
    payload: reviews
  };
}

function getAnnouncementReviewsErrorAsync(error){
  return {
    type: GET_ANNOUNCEMENT_REVIEWS_ERROR,
    payload: error
  }
}

function getAnnouncementReviewsLoadingAsync(){
  return {
    type: GET_ANNOUNCEMENT_REVIEWS_LOADING,
    payload: null
  }
}
