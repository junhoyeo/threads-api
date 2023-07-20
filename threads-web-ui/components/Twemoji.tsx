'use client';

import React, { useEffect, useRef } from 'react';
import twemoji from 'twemoji';

type TwemojiProps = {
  content: string;
};

const _Twemoji: React.FC<TwemojiProps> = ({ content }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) {
      return;
    }
    if (contentRef.current.childElementCount > 0) {
      // already rendered
      return;
    }
    const element = document.createElement('p');
    element.innerHTML = content;

    const out = twemoji.parse(element, {
      className: 'twemoji',
    });
    contentRef.current?.appendChild(out);
  }, []);

  return <div ref={contentRef} />;
};

export const Twemoji = React.memo(_Twemoji);

export const TwemojiCleanup: React.FC = () => {
  useEffect(() => {
    const elements = document.querySelectorAll('.twemoji-server');
    for (const element of elements) {
      element.remove();
    }
  }, []);
  return null;
};
