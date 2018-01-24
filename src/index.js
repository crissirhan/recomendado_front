import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import { Provider } from 'react-redux';
import createAppStore from './createAppStore';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.css';
import $ from 'jquery';
import './components/css/font-awesome/css/font-awesome.css';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'bootstrap-select'
import 'fancybox'
import 'popper.js'
window.jQuery = window.$ = $;
require('js-cookie')
require('bootstrap/dist/js/bootstrap.bundle');
require('owl.carousel')
require('./custom/js/front.js')

const store = createAppStore();

axios.interceptors.response.use((response) => {
  if (!response.data.ok) {
    store.dispatch({ type: "RESPONSE_NOT_OK", response })
  }

  return response
}, (error) => {
  console.log(error)
  if(error.response){
    for (var key in error.response.data) {
      if (error.response.data.hasOwnProperty(key)) {
        error.response.data[key].forEach(e => toast.error(key + ': ' + e))
      }
    }
  }
  store.dispatch({ type: "RESPONSE_HAD_ERROR", error })

  return Promise.reject(error)
})
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <ToastContainer/> {/* Toast notifications app-wide */}
        <App />
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'));

//registerServiceWorker(); //TODO: descomentar cuando tenga certificado SSL!
