import React from 'react';
import PropTypes from 'prop-types';
import md5 from 'md5';

function Gravatar({ email, alt, className, onLoad, onError }) {
  const hash = md5(email);
  const src = `https://www.gravatar.com/avatar/${hash}`;

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onLoad={onLoad}
      onError={onError}
    />
  );
}

Gravatar.propTypes = {
  email: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  onLoad: PropTypes.func,
  onError: PropTypes.func,
};

Gravatar.defaultProps = {
  className: undefined,
  onLoad: undefined,
  onError: undefined,
};

export default Gravatar;
