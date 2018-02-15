// @flow
import React from 'react';
import md5 from 'md5';

type Props = {
  email: string,
  alt: string,
  className?: string,
  onLoad?: (event: SyntheticEvent<HTMLImageElement>) => void,
  onError?: (event: SyntheticEvent<HTMLImageElement>) => void,
};

function Gravatar({ email, alt, className, onLoad, onError }: Props) {
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

Gravatar.defaultProps = {
  className: undefined,
  onLoad: undefined,
  onError: undefined,
};

export default Gravatar;
