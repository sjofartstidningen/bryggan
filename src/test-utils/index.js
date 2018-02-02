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

export { shallowWithTheme, mountWithTheme, WithContexts };
