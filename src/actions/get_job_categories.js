import { GET_JOB_CATEGORIES, GET_JOB_CATEGORIES_LOADING } from './types';
import axios from 'axios';
import { ENDPOINT_URI } from '../Globals'

var baseUri = 'http://api.recomendado-dev.samir.cl';
export default function getJobCategories() {
  return dispatch => {
    dispatch(getJobCategoriesLoadingAsync());
    axios.get(ENDPOINT_URI+'/job-categories/')
      .then(res => {
        dispatch(getJobCategoriesAsync(res.data));
      });
  }
}

function getJobCategoriesAsync(categories){
  return {
    type: GET_JOB_CATEGORIES,
    payload: categories
  };
}

function getJobCategoriesLoadingAsync(){
  return {
    type: GET_JOB_CATEGORIES_LOADING,
    payload:null
  }
}
