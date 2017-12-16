import axios from 'axios';

//TODO: Add a configuration file with the URIs
var baseUrl = 'http://35.196.31.174';//'http://localhost:8000';

export function getAnnouncements(){
  return axios.get(baseUrl+'/announcements/', {
  })
  .then(function (response) {
  })
  .catch(function (error) {
  });
}
