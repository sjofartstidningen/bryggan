import React, { useState } from 'react';
import qs from 'qs';
import { useDropboxApi } from 'hooks/useDropbox';
import { ThumbnailSize, ThumbnailMode, ThumbnailFormat } from 'types/dropbox';
import { Intersect } from './Intersect';
import styled from 'styled-components';
import { color } from 'styles/theme';

const StyledIntersect = styled(Intersect)`
  background-color: ${color('shade')};
  border: 1px solid ${color('white')};
`;

const dims: { [key: string]: [number, number] } = {
  w32h32: [32, 32],
  w64h64: [64, 64],
  w128h128: [128, 128],
  w256h256: [256, 256],
  w480h320: [480, 320],
  w640h480: [640, 480],
  w960h640: [960, 640],
  w1024h768: [1024, 768],
  w2048h1536: [2048, 1536],
};

const getExpectedDimensions = (size: ThumbnailSize, aspectRatio: number) => {
  const [w, h] = dims[size];
  if (aspectRatio === 0) return [w, h];
  return [h * aspectRatio, h];
};

interface DropboxPreviewProps
  extends React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  path: string;
  size: ThumbnailSize;
  mode?: ThumbnailMode;
  format?: ThumbnailFormat;
  aspectRatio?: number;
  parentRef?: React.RefObject<HTMLElement>;
}

export const DropboxPreview: React.FC<DropboxPreviewProps> = ({
  path,
  size,
  mode = 'strict',
  format = 'jpeg',
  aspectRatio = 1,
  parentRef,
  ...imageProps
}) => {
  const { content } = useDropboxApi();
  const [load, setLoad] = useState(false);

  const [width, height] = getExpectedDimensions(size, aspectRatio);
  const url = `${content.defaults.baseURL}files/get_thumbnail?${qs.stringify({
    authorization: content.defaults.headers.Authorization,
    arg: JSON.stringify({ path, format, size, mode }),
  })}`;

  const handleLoad = (
    entry: IntersectionObserverEntry,
    observer: IntersectionObserver,
  ) => {
    setLoad(true);
    observer.unobserve(entry.target);
  };

  if ('loading' in HTMLImageElement.prototype) {
    const loading = ({ loading: 'lazy' } as unknown) as any;
    return (
      <div style={{ width, height }}>
        <img
          {...imageProps}
          alt={imageProps.alt}
          src={url}
          width={width}
          height={height}
          {...loading}
        />
      </div>
    );
  }

  return (
    <StyledIntersect
      parentRef={parentRef}
      onEnter={handleLoad}
      fallback={() => setLoad(true)}
      style={{ width, height }}
    >
      {load && (
        <img
          {...imageProps}
          src={url}
          alt={imageProps.alt}
          width={width}
          height={height}
        />
      )}
    </StyledIntersect>
  );
};
