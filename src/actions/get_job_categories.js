import { GET_JOB_CATEGORIES } from './types';
import axios from 'axios';


var baseUri = 'http://api.recomendado-dev.samir.cl';
export default function getJobCategories() {
  return dispatch => {
    axios.get(baseUri+'/job-categories/')
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
