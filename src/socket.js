import io from 'socket.io-client/dist/socket.io';
import { server } from './api';
import { USER } from './actions';
import { alert } from './components/Alerts';

const socket = io(server, { jsonp: false });

socket.on('connected', function (data) {
  console.log(data);
  console.log('socket id ', socket.id);
  const store = require('./store');
  USER(store.default.dispatch).checkUserSession();
});


// Event: 'connect_timeout'
// Fired upon a connection timeout.

socket.on('connect_timeout', (timeout) => {
  console.log('socket connection timeout');
});


// #Event: 'error'
// error(Object) error object
// Fired when an error occurs.

socket.on('error', (error) => {
  console.log('socket connection error');
});


// #Event: 'connect error'
// error(Object) error object
// Fired when an error occurs.

socket.on('connect_error', function (error) {
  console.log('Connection Failed ', error.message);

  const store = require('./store');
  const state = store.default.getState();


  if (state.user) {
    store.default.dispatch({
      type: 'ON_UPDATE_USER',
      user: null
    });
  }

  if (state.loading) {
    setTimeout(() => {
      store.default.dispatch({
        type: 'ON_END_LOADING',
      });
    }, 1800);
  }


  alert.show()('Could not stablish connection with the server', 'error');
});


// #Event: 'disconnect'
// reason(String) either 'io server disconnect' or 'io client disconnect'
// Fired upon a disconnection.

socket.on('disconnect', (reason) => {
  console.log('socket connection disconnected', reason);
  alert.show()('Disconnected from the server please check your internet connection', 'info');
});


// #Event: 'reconnect'
// attempt(Number) reconnection attempt number
// Fired upon a successful reconnection.

socket.on('reconnect', (attemptNumber) => {
  console.log('socket connection reconnected');
  const store = require('./store');
  USER(store.default.dispatch).checkUserSession();

  alert.show()('Server connection restablished', 'success');
});


socket.on('session registered', function (data) {
  console.log(data);
});

socket.on('ON_KICK_OUT', function () {
  const store = require('./store');
  USER(store.default.dispatch).onUserLogOut();
});

export default socket;
