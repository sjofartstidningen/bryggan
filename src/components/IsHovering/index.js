import React, { Component } from 'react';
import PropTypes from 'prop-types';

class IsHovering extends Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
  };

  static defaultProps = {
    onMouseEnter: null,
    onMouseLeave: null,
  };

  state = {
    hovering: false,
  };

  handleMouseEnter = e => {
    this.setState(() => ({ hovering: true }));
    if (typeof this.props.onMouseEnter === 'function') {
      this.props.onMouseEnter(e);
    }
  };

  handleMouseLeave = e => {
    this.setState(() => ({ hovering: false }));
    if (typeof this.props.onMouseLeave === 'function') {
      this.props.onMouseLeave(e);
    }
  };

  render() {
    const { hovering } = this.state;
    const { children, ...props } = this.props;

    return (
      <div
        {...props}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        {children({ hovering })}
      </div>
    );
  }
}

export { IsHovering as default };
