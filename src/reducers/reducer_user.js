import { USER_LOGOUT, GET_USER_NAME, GET_USER_LASTNAME, GET_USER_FULLNAME, GET_USER_ID, GET_USER_URL, GET_USER_TYPE, SET_USER_DATA, LOAD_USER_FROM_COOKIES } from '../actions/types';
import cookie from 'react-cookies';

export default function(state={
  name:'',
  lastname:'',
  id:'',
  type:'',
  url:'/denegado/'
}, action) {
  let user = null
  let tipo = null
  let mutex = false
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
      if(!state || state.id === ''){
        return state
      }
      tipo = state.type === 'professional' ? 'profesionales' : 'clientes'
      let url = '/' + tipo + '/' + state.id
      return Object.assign({...state}, {url:url})
    case SET_USER_DATA:
      user = action.data
      let newUser = {}
      newUser.name = user.name
      newUser.lastname = user.lastname
      newUser.id = user.id
      newUser.type = user.type
      tipo = newUser.type === 'professional' ? 'profesionales' : 'clientes'
      newUser.url = '/' + tipo + '/' + newUser.id
      console.log(newUser)
      return Object.assign({...state}, newUser)
    case LOAD_USER_FROM_COOKIES:
      user = cookie.load('user')
      let newData = {}
      if(user && user !== "undefined" && !mutex){
        mutex = true
        newData.name = user.user.first_name
        newData.lastname = user.user.last_name
        newData.id = user.id
        if(cookie.load('isProfessional') === "true" && cookie.load('user').user){
          newData.type = 'professional'
        }
        if(cookie.load('isClient') === "true" && cookie.load('user').user){
          newData.type = 'client'
        }
        tipo = newData.type === 'professional' ? 'profesionales' : 'clientes'
        newData.url = '/' + tipo + '/' + newData.id
      } else{
        return state;
      }
      mutex = false
      return Object.assign({...state}, newData)
    case USER_LOGOUT:
      mutex = true
      cookie.remove('token');
      cookie.remove('user');
      cookie.remove('isProfessional');
      cookie.remove('isClient');
      console.log("logout")
      mutex = false
      return Object.assign({...state}, {
        name:'',
        lastname:'',
        id:'',
        type:'',
        url:'/denegado/'
      })
    default:
      return state;
  }

}
