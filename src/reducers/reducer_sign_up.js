import { SIGNUP_SUCCESS, SIGNUP_LOADING, SIGNUP_ERROR } from '../actions/types';

export default function(state={
  loading:false,
  success:false,
  error:false
}, action) {

  let loading = {};
  switch (action.type) {
    case SIGNUP_SUCCESS:
      state = Object.assign({}, state, {'loading':false, 'success':true})
      return Object.assign({}, state, action.payload);
    case SIGNUP_ERROR:
      state = Object.assign({}, state, {'loading':false, 'error':true})
      return Object.assign({}, state, action.payload);
    case SIGNUP_LOADING:
      state = Object.assign({}, state, {'loading':true, 'error':false, 'success':false})
      return Object.assign({}, state);
    default:
      return state;
  }

}
