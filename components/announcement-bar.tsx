import { type FC } from 'react';
import Link from 'next/link';
import { ANNOUNCEMENT_TEXT, SME_PROGRAM } from '@/lib/data';

/**
 * Sits above the sticky navbar (`z-50` vs `z-40`) so the promotion stays
 * visible. The navbar offsets itself with `top-9` to clear this bar.
 */
export const AnnouncementBar: FC = () => (
  <div className="sticky top-0 z-50 h-9 border-b border-white/10 bg-gradient-to-r from-egyptian-blue-dark via-egyptian-blue to-egyptian-blue-dark">
    <div className="mx-auto flex h-9 max-w-7xl items-center justify-center gap-2 overflow-hidden px-4 sm:px-6 lg:px-8">
      <p className="min-w-0 truncate text-center font-mono text-[11px] font-medium tracking-wide text-white/90 sm:text-xs">
        {ANNOUNCEMENT_TEXT}
      </p>
      <Link
        href={SME_PROGRAM.intakeHref}
        className="shrink-0 whitespace-nowrap rounded-full bg-white px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-egyptian-blue-dark transition-colors hover:bg-amber-300 hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 sm:text-[11px]"
      >
        Apply Now →
      </Link>
    </div>
  </div>
);
