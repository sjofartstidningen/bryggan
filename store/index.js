import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import tidningen from './tidningen';
import auth from './auth';

export const reducer = combineReducers({ tidningen, auth });

export const initStore = (state = {}) =>
  createStore(reducer, state, composeWithDevTools(applyMiddleware(thunk)));
