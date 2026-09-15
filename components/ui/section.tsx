import { type FC, type HTMLAttributes } from 'react';
import { classNames } from '@/lib/utils';

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  variant?: 'dark' | 'light';
  narrow?: boolean;
  id?: string;
}

export const Section: FC<SectionProps> = ({
  variant = 'dark',
  narrow = false,
  className,
  children,
  ...props
}) => (
  <section
    className={classNames(
      'py-20 px-4 sm:px-6 lg:px-8',
      variant === 'dark' ? 'bg-midnight' : 'bg-white',
      className,
    )}
    {...props}
  >
    <div className={classNames('mx-auto', narrow ? 'max-w-3xl' : 'max-w-7xl')}>
      {children}
    </div>
  </section>
);
