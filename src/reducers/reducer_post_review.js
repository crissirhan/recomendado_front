import { POST_REVIEW_SUCCESS, POST_REVIEW_LOADING, POST_REVIEW_ERROR } from '../actions/types';

export default function(state={
  loading:false,
  error:false,
  success:false,
  result:[],
  pagination:{},
  params:{}
}, action) {

  let loading = {}
  let error = {}
  switch (action.type) {
    case POST_REVIEW_SUCCESS:
      loading = {loading:false}
      error = {error: false}
      let success = {success:true}
      state.params = action.params
      let result = {'result':action.payload.results }
      let lastPage = action.payload.next ? action.payload.lastPage : 1
      console.log(action.payload)
      let pagination = {pagination:
          action.payload
        }
      return Object.assign({...state}, result, pagination, success, error, loading, {params:action.params})
    case POST_REVIEW_ERROR:
      loading = {loading:false}
      error = {error: true, error_type: 'Ocurrió un error'}
      return Object.assign({...state}, action.payload, error, loading)
    case POST_REVIEW_LOADING:
      loading = {loading:true}
      return Object.assign({...state}, loading)
    default:
      return state;
  }

}
