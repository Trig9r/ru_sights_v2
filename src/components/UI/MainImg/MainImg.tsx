import React from 'react';

export const MainImg = () => {
  const [isLoaded, setLoaded] = React.useState(false);
  const [isLoadStarted, setLoadStarted] = React.useState(false);

  const handleLoad = () => {
    setLoaded(true);
  };

  const handleLoadStarted = () => {
    console.log('Started: ');
    setLoadStarted(true);
  };

  return <div>MainImg</div>;
};
