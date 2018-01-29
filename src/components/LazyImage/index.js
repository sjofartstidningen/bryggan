import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

class LazyImage extends Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
    className: PropTypes.string,
  };

  static defaultProps = {
    alt: '',
    className: '',
  };

  state = {
    loaded: false,
    url: null,
  };

  componentDidMount() {
    this.fetchImage();
  }

  fetchImage = async () => {
    const res = await axios({
      method: 'get',
      url: this.props.src,
      responseType: 'blob'
    });

    const url = URL.createObjectURL(res.data);

    this.setState(() => ({ url, loaded: true }));
  };

  render() {
    const { alt, className } = this.props;
    const { url, loaded } = this.state;

    return (
      <div>
        {loaded && <img className={className} src={url} alt={alt} />}
      </div>
    );
  }
}

export default LazyImage;
