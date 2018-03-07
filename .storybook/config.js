import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import * as theme from '../src/theme';
import '../src/index.css';

addDecorator(story => (
  <Router>
    <ThemeProvider theme={theme}>{story()}</ThemeProvider>
  </Router>
));

const req = require.context('../src', true, /\.stories\.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
