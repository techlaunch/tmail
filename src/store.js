import { createStore, applyMiddleware, combineReducers } from 'redux';
import reducers from './reducers';
import socket from './socket';
import createSocketIoMiddleware from 'redux-socket.io';

const middleware = createSocketIoMiddleware(socket, "server/");

const store = createStore(
  combineReducers({
    ...reducers
  }),
  applyMiddleware(middleware)
)

export default store;