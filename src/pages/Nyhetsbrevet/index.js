import React, { Component } from 'react';
import ErrorMessage from '../../atoms/ErrorMessage';

class Nyhetsbrevet extends Component {
  render() {
    return (
      <ErrorMessage message="Funktionaliteten för /nyhetsbrevet är inte klar ännu. Men snart förhoppningsvis 😬" />
    );
  }
}

export { Nyhetsbrevet as default };
