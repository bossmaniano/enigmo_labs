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
      /* Sits on the navbar's top edge (36px below the viewport top) so it stays
         legible against the announcement bar rather than blending into it. */
      className="fixed top-9 left-0 h-0.5 bg-egyptian-blue-light origin-left z-[60]"
      style={{ width: `${offset}%` }}
    />
  );
};
