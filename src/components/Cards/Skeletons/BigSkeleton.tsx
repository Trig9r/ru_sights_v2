import ContentLoader from 'react-content-loader';

export const BigSkeleton = () => (
  <ContentLoader
    speed={2}
    width={370}
    height={408}
    viewBox="0 0 370 408"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb">
    <rect x="0" y="0" rx="10" ry="10" width="370" height="408" />
  </ContentLoader>
);
