import { GET_REVIEWS_ERROR, GET_REVIEWS_SUCCESS, GET_REVIEWS_LOADING } from '../actions/types';

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
    case GET_REVIEWS_SUCCESS:
      loading = {loading:false}
      error = {error: false}
      let success = {success:true}
      console.log(action.payload)
      let result = {'result':action.payload.results }
      let lastPage = action.payload.next ? action.payload.lastPage : 1
      console.log(action.payload)
      let pagination = {pagination:
          action.payload
        }
      return Object.assign({...state}, result, pagination, success, error, loading, {params:action.params})
    case GET_REVIEWS_ERROR:
      loading = {loading:false}
      error = {error: true, error_type: 'Ocurrió un error'}
      return Object.assign({...state}, action.payload, error, loading)
    case GET_REVIEWS_LOADING:
      loading = {loading:true}
      return Object.assign({...state}, loading)

    default:
      return state;
  }

}
