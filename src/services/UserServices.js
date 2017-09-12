import axios from 'axios';

var baseUrl = 'http://35.196.31.174/';//'http://localhost:8000';

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
