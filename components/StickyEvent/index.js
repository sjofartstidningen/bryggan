// @flow
import React, { Component } from 'react';
import type { Node } from 'react';
import createObserver from '../../utils/createObserver';
import { TopSentinel, StickyEl } from './components';

type Props = {
  container?: HTMLElement,
  render: ({ stuck: boolean }) => Node,
};

type State = { stuck: boolean };

export default class StickyEvent extends Component<Props, State> {
  sentinel: HTMLElement;
  observer: IntersectionObserver;

  state = {
    stuck: false,
  };

  componentDidMount() {
    let containerEl;

    if (this.props.container) containerEl = this.props.container;
    else containerEl = window.body;

    this.observer = createObserver(containerEl);
    this.observer.observe(this.sentinel);

    document.addEventListener('sticky-change', (e: mixed) => {
      if (e instanceof CustomEvent) {
        const { target, stuck } = e.detail;
        if (target === this.sentinel) this.setState(() => ({ stuck }));
      }
    });
  }

  componentWillUnount() {
    // $FlowFixMe
    this.observer.unobserve(this.sentinel);
  }

  setRef = (ref: HTMLElement) => {
    this.sentinel = ref;
  };

  render() {
    const { stuck } = this.state;
    return [
      <TopSentinel
        key="sentinel"
        innerRef={this.setRef}
        className="sticky-event-top-sentinel"
      />,
      <StickyEl key="stick-el" className="sticky-event-el">
        {this.props.render({ stuck })}
      </StickyEl>,
    ];
  }
}
