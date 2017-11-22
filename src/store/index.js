import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import tidningen from './tidningen';
import auth from './auth';

const reducer = combineReducers({ tidningen, auth });

const initStore = (state = {}) =>
  createStore(reducer, state, composeWithDevTools(applyMiddleware(thunk)));

export { reducer, initStore };
