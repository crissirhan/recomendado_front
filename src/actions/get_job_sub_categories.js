import { GET_JOB_SUB_CATEGORIES } from './types';
import axios from 'axios';
import { ENDPOINT_URI } from '../Globals'

var baseUri = 'http://api.recomendado-dev.samir.cl';
export default function getJobSubCategories() {
  return dispatch => {
    axios.get(ENDPOINT_URI+'/job-sub-categories/')
      .then(res => {
        dispatch(getJobSubCategoriesAsync(res.data));
      });
  }
}

function getJobSubCategoriesAsync(sub_categories){
  return {
    type: GET_JOB_SUB_CATEGORIES,
    payload: sub_categories
  };
}
