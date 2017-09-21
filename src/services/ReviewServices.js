import axios from 'axios';

//TODO: Add a configuration file with the URIs
var baseUrl = 'http://35.196.31.174';//'http://localhost:8000';

export function getReviews(){
  return axios.get(baseUrl+'/reviews/', {
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
}
