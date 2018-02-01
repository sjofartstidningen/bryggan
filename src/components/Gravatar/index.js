import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import md5 from 'md5';

class Gravatar extends Component {
  static propTypes = {
    email: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    className: PropTypes.string,
  }

  static defaultProps = {
    className: '',
  }

  state = {
    src: null,
  }

  componentDidMount() {
    this.getGravatar();
  }

  componentDidUpdate(prevProps) {
    if (this.props.email !== prevProps.email) {
      this.getGravatar();
    }
  }

  getGravatar = async () => {
    const baseURL = 'https://www.gravatar.com/avatar';
    const hash = md5(this.props.email);

    const { data: blob } = await axios({
      url: hash,
      method: 'get',
      baseURL,
      responseType: 'blob',
    });

    const src = URL.createObjectURL(blob);
    this.setState(() => ({ src }));
  };

  render() {
    const { alt, className, ...rest } = this.props;
    const { src } = this.state;

    return src ? (
      <img {...rest} src={src} alt={alt} className={className} />
    ) : null;
  }
}

export default Gravatar;
