import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

type PortalProps = {
  id?: string;
  children?: React.ReactNode;
};

export const Portal: React.FC<PortalProps> = ({ id = 'portal', children }) => {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setMounted(true);
    containerRef.current = document.getElementById(id);
    return () => setMounted(false);
  }, [id]);

  return mounted && !!containerRef.current ? createPortal(children, containerRef.current) : null;
};
