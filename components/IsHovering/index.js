import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class IsHovering extends Component {
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

  handleMouseEnter = () => {
    this.setState(() => ({ hovering: true }));
    if (typeof this.props.onMouseEnter === 'function') {
      this.props.onMouseEnter();
    }
  };

  handleMouseLeave = () => {
    this.setState(() => ({ hovering: false }));
    if (typeof this.props.onMouseLeave === 'function') {
      this.props.onMouseLeave();
    }
  };

  render() {
    const { hovering } = this.state;
    return (
      <div
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        {this.props.children({ hovering })}
      </div>
    );
  }
}
