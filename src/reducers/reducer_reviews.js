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
      let errors = []
      for (var key in action.payload.data) {
          if (action.payload.data.hasOwnProperty(key)) {
            action.payload.data[key].map(error => {
              if(key === 'non_field_errors'){
                errors.push(error)
              }
              else{
                for (var err_key in error) {
                  if (error.hasOwnProperty(err_key)) {
                    error[err_key].map(err => errors.push(err))
                  }
                }
              }
            })
          }
      }
      let error_types = {'error_types':errors}
      console.log(error_types)
      return Object.assign({...state}, action.payload, error, loading, error_types)
    case GET_REVIEWS_LOADING:
      loading = {loading:true}
      return Object.assign({...state}, loading)

    default:
      return state;
  }

}
