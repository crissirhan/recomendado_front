import { UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_LOADING, UPDATE_PROFILE_ERROR } from '../actions/types';

export default function(state={
  loading:false,
  success:false,
  error:false
}, action) {

  let loading = {};
  switch (action.type) {
    case UPDATE_PROFILE_SUCCESS:
      state = Object.assign({}, state, {'loading':false, 'success':true})
      console.log(state)
      return Object.assign({}, state, action.payload);
    case UPDATE_PROFILE_ERROR:
      state = Object.assign({}, state, {'loading':false, 'error':true})
      console.log(state)
      return Object.assign({}, state, action.payload);
    case UPDATE_PROFILE_LOADING:
      state = Object.assign({}, state, {'loading':true, 'error':false, 'success':false})
      console.log(state)
      return Object.assign({}, state);
    default:
      return state;
  }

}
