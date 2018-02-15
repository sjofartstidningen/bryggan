// @flow
import React, { Component } from 'react';
import type { Node, ElementType } from 'react';

type RenderProps = {
  isHovering: boolean,
};

type Props = {
  el?: ElementType,
  render: RenderProps => Node,
  className?: string,
};

type State = {
  isHovering: boolean,
};

class IsHovering extends Component<Props, State> {
  static defaultProps = {
    className: '',
  };

  state = {
    isHovering: false,
  };

  handleMouseEnter = () => {
    this.setState(() => ({ isHovering: true }));
  };

  handleMouseLeave = () => {
    this.setState(() => ({ isHovering: false }));
  };

  render() {
    const { el, render, className, ...props } = this.props;
    const { isHovering } = this.state;

    const Wrapper = el || 'div';

    return (
      <Wrapper
        {...props}
        className={className}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        {render({ isHovering })}
      </Wrapper>
    );
  }
}

export default IsHovering;
