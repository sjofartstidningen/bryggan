import React, { useState } from 'react';
import styled from 'styled-components';
import { ThumbnailSize } from '../types/graphql';
import { Intersect } from './Intersect';
import { color } from '../styles/theme';
import { PAGE_ASPECT_RATIO } from '../constants';

interface DropboxPreviewProps
  extends React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  src: string;
  size: ThumbnailSize;
  parentRef?: React.RefObject<HTMLElement>;
}

export const DropboxPreview: React.FC<DropboxPreviewProps> = ({
  src,
  size,
  parentRef,
  ...imageProps
}) => {
  const [load, setLoad] = useState(false);
  const [width, height] = getExpectedDimensions(size, PAGE_ASPECT_RATIO);

  const handleLoad = (
    entry: IntersectionObserverEntry,
    observer: IntersectionObserver,
  ) => {
    setLoad(true);
    observer.unobserve(entry.target);
  };

  if ('loading' in HTMLImageElement.prototype) {
    return (
      <div>
        <img
          {...imageProps}
          src={src}
          alt={imageProps.alt}
          width={width}
          height={height}
          style={{ display: 'block' }}
          // @ts-ignore
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <StyledIntersect
      parentRef={parentRef}
      onEnter={handleLoad}
      fallback={() => setLoad(true)}
    >
      {load && (
        <img
          {...imageProps}
          src={src}
          alt={imageProps.alt}
          width={width}
          height={height}
          style={{ display: 'block' }}
        />
      )}
    </StyledIntersect>
  );
};

const StyledIntersect = styled(Intersect)`
  background-color: ${color('shade')};
  border: 1px solid ${color('white')};
`;

const dimensions: Record<ThumbnailSize, [number, number]> = {
  [ThumbnailSize.w32h32]: [32, 32],
  [ThumbnailSize.w64h64]: [64, 64],
  [ThumbnailSize.w128h128]: [128, 128],
  [ThumbnailSize.w256h256]: [256, 256],
  [ThumbnailSize.w480h320]: [480, 320],
  [ThumbnailSize.w640h480]: [640, 480],
  [ThumbnailSize.w960h640]: [960, 640],
  [ThumbnailSize.w1024h768]: [1024, 768],
  [ThumbnailSize.w2048h1536]: [2048, 1536],
};

const getExpectedDimensions = (size: ThumbnailSize, aspectRatio: number) => {
  const [w, h] = dimensions[size];
  if (aspectRatio === 0) return [w, h];
  return [Math.round(h * aspectRatio), h];
};
