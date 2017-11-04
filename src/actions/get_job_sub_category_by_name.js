import { GET_JOB_BY_NAME_SUCCESS, GET_JOB_BY_NAME_LOADING, GET_JOB_BY_NAME_ERROR } from './types';
import axios from 'axios';
import { ENDPOINT_URI } from '../Globals'

var baseUri = 'http://api.recomendado-dev.samir.cl';
export default function getJobByName(category_name) {
  return dispatch => {
    dispatch(getJobByNameLoadingAsync());
    axios.get(ENDPOINT_URI+'/job-sub-categories/name/' + category_name)
      .then(res => {
        dispatch(getJobByNameSuccessAsync(res.data));
      })
      .catch(function (error) {
        dispatch(getJobByNameErrorAsync(error.data))
      });
  }
}

function getJobByNameLoadingAsync(){
  return {
    type: GET_JOB_BY_NAME_LOADING,
    payload: null
  }
}

function getJobByNameSuccessAsync(category){
  return {
    type: GET_JOB_BY_NAME_SUCCESS,
    payload: category
  };
}

function getJobByNameErrorAsync(error){
  return {
    type: GET_JOB_BY_NAME_ERROR,
    payload: error
  }
}
