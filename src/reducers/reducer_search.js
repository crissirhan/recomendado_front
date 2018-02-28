import { UPDATE_SEARCH_PARAMS, REQUEST_SEARCH, STOP_SEARCH_REQUEST, RESET_SEARCH_PARAMS } from '../actions/types';


const initialParams = {
  search:'',
  min_publish_date:null,
  max_publish_date:null,
  job:null,
  min_price:'',
  max_price:'',
  min_rating:0,
  visible:true
}
export default function(state={
  requestSearch:false,
  searchParams: initialParams,
  results:{}
}, action) {

  switch (action.type) {
    case REQUEST_SEARCH:
      //this.props.getAnnouncements(state.searchParams)
      return Object.assign({...state}, {requestSearch:true})
    case UPDATE_SEARCH_PARAMS:
      let newState = Object.assign({...state}, {searchParams: action.newParams})
      return newState
    case RESET_SEARCH_PARAMS:
      console.log("chaos")
      state.searchParams = initialParams
      return state
    case STOP_SEARCH_REQUEST:
      return Object.assign({...state}, {requestSearch:false})
    default:
      return state;
  }

}
