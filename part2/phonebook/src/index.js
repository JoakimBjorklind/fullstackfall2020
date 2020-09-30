import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

import axios from 'axios';
import * as serviceWorker from './serviceWorker';


const promise = axios.get('http://localhost:3001/persons')

promise.then(response => {
  console.log(response)
})
ReactDOM.render(
  
    <App />,
  
  document.getElementById('root')
);

serviceWorker.unregister();


