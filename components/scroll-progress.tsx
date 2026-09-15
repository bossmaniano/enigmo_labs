'use client';

import { type FC, useEffect, useState } from 'react';

export const ScrollProgress: FC = () => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      const total = scrollHeight - clientHeight;
      setOffset(total > 0 ? (scrollTop / total) * 100 : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 h-0.5 bg-egyptian-blue origin-left z-50"
      style={{ width: `${offset}%` }}
    />
  );
};
