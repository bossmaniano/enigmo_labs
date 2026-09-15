import { type FC, type HTMLAttributes } from 'react';
import { classNames } from '@/lib/utils';

export type CardVariant = 'elevated' | 'outlined' | 'terminal';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
}

const variantClasses: Record<CardVariant, string> = {
  elevated:
    'bg-charcoal-light border border-white/10 rounded-xl p-6 hover:border-egyptian-blue/50 hover-glow',
  outlined:
    'bg-transparent border border-white/10 rounded-xl p-6',
  terminal:
    'bg-gray-900/50 border border-white/10 rounded-xl p-6',
};

export const Card: FC<CardProps> = ({
  variant = 'elevated',
  className,
  ...props
}) => (
  <div
    className={classNames(variantClasses[variant], className)}
    {...props}
  />
);
