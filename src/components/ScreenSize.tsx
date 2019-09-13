import React, { PropsWithChildren } from 'react';
import { useWindowDimensions } from 'hooks/useWindowDimensions';

interface ScreenSizeProps {
  width: number;
}

export const ScreenMaxWidth = ({
  width,
  children,
}: PropsWithChildren<ScreenSizeProps>) => {
  const dimensions = useWindowDimensions();
  if (dimensions.width > width) return null;
  return <>{children}</>;
};

export const ScreenMinWidth = ({
  width,
  children,
}: PropsWithChildren<ScreenSizeProps>) => {
  const dimensions = useWindowDimensions();
  if (dimensions.width < width) return null;
  return <>{children}</>;
};
