import React, { Component } from 'react';
import PropTypes from 'prop-types';
import createObserver from '../../utils/createObserver';
import { TopSentinel, StickyEl } from './components';

export default class StickyEvent extends Component {
  state = {
    stuck: false,
  };

  static propTypes = {
    container: PropTypes.any, // eslint-disable-line
    render: PropTypes.func.isRequired,
  };

  static defaultProps = {
    container: undefined,
  };

  componentDidMount() {
    this.observer = createObserver(this.props.container);
    this.observer.observe(this.sentinel);

    document.addEventListener('sticky-change', e => {
      const { target, stuck } = e.detail;
      if (target === this.sentinel) this.setState(() => ({ stuck }));
    });
  }

  componentWillUnount() {
    // $FlowFixMe
    this.observer.unobserve(this.sentinel);
  }

  setRef = ref => {
    this.sentinel = ref;
  };

  render() {
    const { stuck } = this.state;
    return [
      <TopSentinel key="sentinel" innerRef={this.setRef} />,
      <StickyEl key="stick-el" {...this.props}>
        {this.props.render({ stuck })}
      </StickyEl>,
    ];
  }
}
