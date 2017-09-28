import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import { Provider } from 'react-redux';
import createAppStore from './createAppStore';


const store = createAppStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));

//registerServiceWorker(); //TODO: descomentar cuando tenga certificado SSL!
