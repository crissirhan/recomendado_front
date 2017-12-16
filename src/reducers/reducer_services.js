import { GET_SERVICES_LOADING, GET_SERVICES_ERROR, GET_SERVICES_SUCCESS } from '../actions/types';

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
    case GET_SERVICES_SUCCESS:
      loading = {loading:false}
      error = {error: false}
      let success = {success:true}
      state.params = action.params
      let result = {'result':action.payload.results }
      let lastPage = action.payload.next ? action.payload.lastPage : 1
      let pagination = {pagination:
          action.payload
        }
      return Object.assign({...state}, result, pagination, success, error, loading, {params:action.params})
    case GET_SERVICES_ERROR:
      loading = {loading:false}
      error = {error: true, error_type: 'Ocurrió un error'}
      return Object.assign({...state}, action.payload, error, loading)
    case GET_SERVICES_LOADING:
      loading = {loading:true}
      return Object.assign({...state}, loading)
    default:
      return state;
  }

}
