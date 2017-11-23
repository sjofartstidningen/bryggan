import React from 'react';
import { Route } from 'react-router-dom';
import routes from './routes';
import { Wrapper, Container } from './components/Layout';
import Auth from './containers/Auth';
import Header from './containers/Header';

function App() {
  return (
    <Wrapper>
      <Auth />
      <Header />
      <Container>
        {routes.map(route => <Route key={route.path} {...route} />)}
      </Container>
    </Wrapper>
  );
}

export { App as default };
