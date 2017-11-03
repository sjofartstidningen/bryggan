import React from 'react';
import PropTypes from 'prop-types';
import OriginalLink from 'next/link';

function Link({ href, as, rel, target, className, children }) {
  return (
    <OriginalLink href={href} as={as}>
      <a className={className} rel={rel} target={target}>
        {children}
      </a>
    </OriginalLink>
  );
}

Link.propTypes = {
  href: PropTypes.string.isRequired,
  as: PropTypes.string,
  rel: PropTypes.oneOf(['noopener']),
  target: PropTypes.oneOf(['_blank']),
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Link.defaultProps = {
  as: null,
  className: null,
  rel: null,
  target: null,
};

export default Link;
