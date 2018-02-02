/* eslint-disable import/no-extraneous-dependencies, react/prop-types */
import React from 'react';
import { shallow, mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import { theme } from '../styles';

const shallowWithTheme = tree => {
  const context = shallow(<ThemeProvider theme={theme} />)
    .instance()
    .getChildContext();

  return shallow(tree, { context });
};

const mountWithTheme = (children, options) => {
  const wrapper = mount(
    <ThemeProvider theme={theme}>{children}</ThemeProvider>,
    options,
  );
  const instance = wrapper.root.instance();
  return wrapper.mount({ context: instance.getChildContext() });
};

const WithContexts = ({ children }) => (
  <BrowserRouter>
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  </BrowserRouter>
);

function setupIntersectionObserver() {
  const original = window.IntersectionObserver;

  class IntersectionObserver {
    constructor(callback) {
      this.callback = callback;
    }

    entries = [];

    observe = el => {
      this.entries.push(el);
    };

    unobserve = el => {
      this.entries = this.entries.filter(x => x !== el);
    };

    simulateIntersectionEvent = (data = {}) => {
      const els = this.entries.map(entry => ({
        target: entry,
        ...data,
      }));

      this.callback(els);
    };
  }

  window.IntersectionObserver = IntersectionObserver;

  return () => {
    window.IntersectionObserver = original;
  };
}

const sleep = (ms = 0) =>
  new Promise(resolve => {
    window.setTimeout(resolve, ms);
  });

export {
  shallowWithTheme,
  mountWithTheme,
  WithContexts,
  setupIntersectionObserver,
  sleep,
};
