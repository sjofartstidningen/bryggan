import React, { Component } from 'react';
import Title from '../../components/Typography/Title';
import Providers from './sections/Providers';

class Settings extends Component {
  state = {
    translateTitle: 0,
  };

  handleRef = ref => {
    if (ref != null) {
      const { width } = ref.getBoundingClientRect();
      this.setState(() => ({ translateTitle: width }));
    }
  };

  render() {
    const { translateTitle } = this.state;

    return (
      <div>
        <Title to="/auth/settings">
          <span ref={this.handleRef}>Inställningar</span>
        </Title>

        <Providers translateTitle={translateTitle} />
      </div>
    );
  }
}

export { Settings as default };
