import React from 'react';
import PropTypes from 'prop-types';
import OriginalLink from 'next/link';

function Link({ href, as, className, children }) {
  return (
    <OriginalLink href={href} as={as}>
      <a className={className}>{children}</a>
    </OriginalLink>
  );
}

Link.propTypes = {
  href: PropTypes.string.isRequired,
  as: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Link.defaultProps = {
  as: null,
  className: null,
};

export default Link;
