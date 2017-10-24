import { GET_JOB_CATEGORIES, GET_JOB_CATEGORIES_LOADING } from '../actions/types';

export default function(state=[], action) {
  let loading = {}
  let data = {'job_categories':[]}
  switch (action.type) {
    case GET_JOB_CATEGORIES:
      loading = {'loading': false}
      data = {'job_categories': action.payload}
      return Object.assign({}, data, loading);
    case GET_JOB_CATEGORIES_LOADING:
      loading = {'loading': true}
      return Object.assign({}, data, loading);
    default:
      return state;
  }

}
