import { GET_JOB_CATEGORIES } from './types';
import axios from 'axios';

var baseUrl = 'http://35.196.31.174';

export default function getJobCategories() {
  return dispatch => {
    axios.get(baseUrl+'/job-categories/')
      .then(res => {
        console.log(res);
        const categories = res.data.map(category => category.job_type);
        dispatch(getJobCategoriesAsync(categories));
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
