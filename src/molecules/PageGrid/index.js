// @flow
import React from 'react';
import type { MagazineEntry } from '../../types/magazine';
import LazyImage from '../../atoms/LazyImage';
import { Eye } from '../../atoms/Icon';

type Props = {
  pages: Array<MagazineEntry>,
};

function PageGrid({ pages }: Props) {
  return (
    <div>
      {pages.map(page => (
        <div key={page.id}>
          <a href={page.url}>
            <LazyImage src={page.preview['32']} alt="" />
            <span>
              {page.name} <Eye />
            </span>
          </a>
        </div>
      ))}
    </div>
  );
}

export { PageGrid as default };
