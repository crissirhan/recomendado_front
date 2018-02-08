import { USER_LOGIN_SUCCESS, USER_LOGIN_ERROR, USER_LOGIN_LOADING } from '../actions/types';

export default function(state=[], action) {
  let loggedIn = {}
  let loading = {}
  let data = {}
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
      loggedIn = {'loggedIn':true}
      loading = {'loading':false}
      data = {'token': action.payload.token, 'username':action.payload.username}
      let success = {success:'success'}
      return Object.assign({}, data, loggedIn, loading, success);
    case USER_LOGIN_ERROR:
      loading = {'loading':false}
      loggedIn = {'loggedIn':false}
      data = {'error':true}
      return Object.assign({}, data, loggedIn, loading);
    case USER_LOGIN_LOADING:
      loading = {'loading':true}
      loggedIn = {'loggedIn':false}
      return Object.assign({}, data, loggedIn, loading)
    default:
      return state;
  }

}
