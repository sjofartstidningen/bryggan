import React, { Component } from 'react';
import PropTypes from 'prop-types';
import md5 from 'md5';
import { ProfileImage } from './components';

class ProfilePicture extends Component {
  static propTypes = {
    src: PropTypes.string,
    email: PropTypes.string,
  };

  static defaultProps = {
    src: null,
    email: null,
  };

  state = {
    gravatar: null,
  };

  componentDidMount() {
    if (this.props.src == null) {
      this.generateGravatarUrl();
    }
  }

  generateGravatarUrl = () => {
    const { email } = this.props;

    if (email != null) {
      const hash = md5(email);
      const gravatar = `https://www.gravatar.com/avatar/${hash}`;
      this.setState(() => ({ gravatar }));
    }
  };

  render() {
    const { src } = this.props;
    const { gravatar } = this.state;

    return (
      <ProfileImage loaded>
        <img src={src || gravatar} alt="" />
      </ProfileImage>
    );
  }
}

export { ProfilePicture as default };
