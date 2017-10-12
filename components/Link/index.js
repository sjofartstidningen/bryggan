// @flow
import React from 'react';
import Link from 'next/link';

type Props = {
  href: string,
  as?: string, // eslint-disable-line
  className?: string, // eslint-disable-line
  children: string,
};

export default ({ href, as, className, children }: Props) => (
  <Link href={href} as={as}>
    <a className={className}>{children}</a>
  </Link>
);
