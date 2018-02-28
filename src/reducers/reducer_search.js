import { UPDATE_SEARCH_PARAMS, REQUEST_SEARCH, STOP_SEARCH_REQUEST } from '../actions/types';

export default function(state={
  requestSearch:false,
  searchParams:{
    search:'',
    min_publish_date:null,
    max_publish_date:null,
    tags:[],
    min_price:'',
    max_price:'',
    min_rating:0,
    visible:true
  },
  results:{}
}, action) {

  switch (action.type) {
    case REQUEST_SEARCH:
      //this.props.getAnnouncements(state.searchParams)
      return Object.assign({...state}, {requestSearch:true})
    case UPDATE_SEARCH_PARAMS:
      let newState = Object.assign({...state}, {searchParams: action.newParams})
      return newState
    case STOP_SEARCH_REQUEST:
      return Object.assign({...state}, {requestSearch:false})
    default:
      return state;
  }

}
