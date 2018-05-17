import { USER_LOGOUT, GET_USER_NAME, GET_USER_LASTNAME, GET_USER_FULLNAME, GET_USER_ID, GET_USER_URL, GET_USER_TYPE, SET_USER_DATA, LOAD_USER_FROM_COOKIES } from '../actions/types';
import cookie from 'react-cookies';

let initialState = {
      name: null,
      id:null,
      type:null,
      profile: null,
      token: null
    }
export default function(state=initialState, action) {
  let user = null
  let tipo = null
  let mutex = false
  let token = null
  switch (action.type) {
    case GET_USER_NAME:
      return state
    case GET_USER_LASTNAME:
      return state
    case GET_USER_ID:
      return state
    case GET_USER_TYPE:
      return state
    case GET_USER_FULLNAME:
      return state
    case GET_USER_URL:
      tipo = state.profile.is_professional === true? 'profesionales' : 'clientes'
      let url = '/' + tipo + '/' + state.id
      return Object.assign({...state}, {url:url})
    case SET_USER_DATA:
      user = action.data
      return Object.assign({...state}, action.data)
    case LOAD_USER_FROM_COOKIES:
      user = cookie.load('user')
      if(!user || user === "undefined"){
        return state
      }
      return Object.assign({...state}, user)
    case USER_LOGOUT:
      cookie.remove('user')
      return initialState
    default:
      return state;
  }

}
