import React, { Component } from 'react';
import PropTypes from 'prop-types';

class IsHovering extends Component {
  static propTypes = {
    el: PropTypes.any, // eslint-disable-line react/forbid-prop-types
    render: PropTypes.func.isRequired,
    className: PropTypes.string,
  };

  static defaultProps = {
    el: 'div',
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
    const { el: El, render, className, ...props } = this.props;
    const { isHovering } = this.state;

    return (
      <El
        {...props}
        className={className}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        {render({ isHovering })}
      </El>
    );
  }
}

export default IsHovering;
