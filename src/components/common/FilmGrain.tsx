import React from 'react';

export const FilmGrain: React.FC = () => {
  return (
    <div 
      className="pointer-events-none fixed inset-0 z-40 opacity-[0.038] mix-blend-screen select-none"
      aria-hidden="true"
    >
      <svg className="h-full w-full">
        <filter id="grain-filter">
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency="0.75" 
            numOctaves="3" 
            stitchTiles="stitch" 
          />
          <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-filter)" />
      </svg>
    </div>
  );
};
