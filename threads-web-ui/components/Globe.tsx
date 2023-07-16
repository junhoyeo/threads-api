'use client';

import clsx from 'clsx';
import createGlobe from 'cobe';
import { useEffect, useRef } from 'react';

type GlobeProps = React.HTMLAttributes<HTMLCanvasElement>;

export const Globe: React.FC<GlobeProps> = ({ className, ...props }) => {
  // let canvas = document.getElementById("cobe")
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    let phi = 0;
    const globeSize = 400;
    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: globeSize * 2,
      height: globeSize * 2,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 1.2,
      scale: 1.25,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [1, 1, 1],
      markerColor: [1, 1, 1],
      glowColor: [1, 1, 1],
      markers: [],
      onRender: (state) => {
        // Called on every animation frame.
        // `state` will be an empty object, return updated params.
        state.phi = phi;
        phi += 0.005;
      },
    });

    setTimeout(() => (canvasRef.current!.style.opacity = '1'));

    window.onbeforeunload = () => {
      if (canvasRef.current) {
        canvasRef.current.style.transition = 'opacity 0.2s ease';
        canvasRef.current.style.opacity = '0';
      }
    };

    return () => {
      globe.destroy();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      {...props}
      style={{
        opacity: 0,
        transition: 'opacity 1s ease',
        width: 400,
        height: 400,
        ...props.style,
      }}
      className={clsx('rounded-full', className)}
    />
  );
};
