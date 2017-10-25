import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import tidningen from './tidningen';

export const reducer = combineReducers({ tidningen });

export const initStore = (state = {}) =>
  createStore(reducer, state, composeWithDevTools(applyMiddleware(thunk)));
