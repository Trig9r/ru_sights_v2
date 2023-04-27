import React from 'react';
import ContentLoader from 'react-content-loader';

export const ImgSkeleton = () => (
  <ContentLoader
    speed={2}
    width={264}
    height={264}
    viewBox="0 0 264 264"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb">
    <rect x="0" y="0" rx="0" ry="0" width="264" height="264" />
  </ContentLoader>
);
