import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Grid } from './components/MainGrid';
import Header from './components/Header';
import Tidningen from './views/Tidningen';

class App extends Component {
  render() {
    return (
      <Router>
        <Grid>
          <Header user={{ name: 'Adam Bergman' }} />
          <Route exact path="/" render={props => <Tidningen {...props} />} />
        </Grid>
      </Router>
    );
  }
}

export default App;
