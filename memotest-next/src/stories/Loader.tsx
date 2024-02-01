import React from 'react';

import './loader.css';

interface LoaderProps {
  withBackground?: boolean;
}

export const Loader: React.FC =({
  withBackground = false,
}: LoaderProps)=> {

  return (
    <div className={`w-96 h-96 m-auto animate-pulse ${withBackground ? 'glass' : ''} flex justify-center items-center`}>
      <div className="m-auto loader"></div>
    </div>
  );

};
