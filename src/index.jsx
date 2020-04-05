import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import makeStore from './store/store';
import App from './components/App';

import './style.scss';

const store = makeStore();


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app'),
);

export default store;
