import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import './index.css';
import App from './App';
import { initStore } from './store';
import theme from './styles/theme';
import registerServiceWorker from './registerServiceWorker';

const store = initStore();
const rootEl = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Router>
  </Provider>,
  rootEl,
);

registerServiceWorker();
