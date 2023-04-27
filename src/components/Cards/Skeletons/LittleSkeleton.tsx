import React from 'react';
import ContentLoader from 'react-content-loader';

export const LittleSkeleton = () => (
  <ContentLoader
    speed={2}
    width={270}
    height={408}
    viewBox="0 0 270 408"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb">
    <rect x="0" y="0" rx="10" ry="10" width="270" height="408" />
  </ContentLoader>
);
