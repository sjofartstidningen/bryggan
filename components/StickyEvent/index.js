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
    componentHeight: 0,
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
    this.observer.unobserve(this.sentinel);
  }

  handleSentinelRef = ref => {
    this.sentinel = ref;
  };

  handleRef = ref => {
    if (ref != null) {
      const { height } = ref.getBoundingClientRect();
      this.setState(() => ({ componentHeight: height }));
    }
  };

  render() {
    const { stuck, componentHeight } = this.state;
    return [
      <TopSentinel
        key="sentinel"
        innerRef={this.handleSentinelRef}
        height={componentHeight}
      />,
      <StickyEl key="stick-el" {...this.props} innerRef={this.handleRef}>
        {this.props.render({ stuck })}
      </StickyEl>,
    ];
  }
}
