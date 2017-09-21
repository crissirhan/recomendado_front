import axios from 'axios';

//TODO: Add a configuration file with the URIs
var baseUrl = 'http://35.196.31.174';//'http://localhost:8000';

export function login(username,password){
  return axios.post(baseUrl+'/rest-auth/login/', {
    username: username,
    password: password
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
}

export function signUp(username,password1, password2, email){
  console.log(username + ' ' + password1);
  return axios.post(baseUrl+'/rest-auth/registration/', {
    username: username,
    password1: password1, 
    password2: password2,
    email: email
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
}
