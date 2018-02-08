import { GET_USER_NAME, USER_LOGOUT, GET_USER_LASTNAME, GET_USER_FULLNAME, GET_USER_ID, GET_USER_URL, GET_USER_TYPE, SET_USER_DATA, LOAD_USER_FROM_COOKIES } from './types';

export function getUserName() {
  return {
    type: GET_USER_NAME
  }
}
export function getUserLastname() {
  return {
    type: GET_USER_LASTNAME
  }
}
export function getUserFullname() {
  return {
    type: GET_USER_FULLNAME
  }
}
export function getUserId() {
  return {
    type: GET_USER_ID
  }
}
export function getUserUrl() {
  return {
    type: GET_USER_URL
  }
}
export function getUserType() {
  return {
    type: GET_USER_TYPE
  }
}
export function setUserData(data) {
  return {
    type: SET_USER_DATA,
    data: data
  }
}
export function loadUserFromCookies() {
  return {
    type: LOAD_USER_FROM_COOKIES
  }
}
export function userLogout(){
  return {
    type: USER_LOGOUT
  }
}
