import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import socket from './connectors/Socket'

import { socketCoin } from './redux/actions/accountAction'

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// Request for notification permission
if (!('Notification' in window)) {
  console.log('This browser does not support notifications!');
} else {
  Notification.requestPermission(status => {
    console.log('Notification permission status:', status);
  });
}

const userId = localStorage.getItem('userId');
if (userId) {
  socket.emit('join socket', { socketName: `COIN-${userId}` })
  socket.on('new coin update', (data) => {
    store.dispatch(socketCoin(data))
  })
}