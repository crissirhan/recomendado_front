import { GET_JOB_CATEGORIES } from './types';
import axios from 'axios';
import { ENDPOINT_URI } from '../Globals'

var baseUri = 'http://api.recomendado-dev.samir.cl';
export default function getJobCategories() {
  return dispatch => {
    axios.get(ENDPOINT_URI+'/job-categories/')
      .then(res => {
        console.log(res);
        const categories = res.data.map(category => category.job_type);
        dispatch(getJobCategoriesAsync(res.data));
      });
  }
}

function getJobCategoriesAsync(categories){
  console.log(categories);
  return {
    type: GET_JOB_CATEGORIES,
    payload: categories
  };
}
