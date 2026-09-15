import {
  type ButtonHTMLAttributes,
  type FC,
  type ReactNode,
} from 'react';
import { classNames } from '@/lib/utils';

export type ButtonVariant = 'primary' | 'outline' | 'ghost' | 'terminal';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-gradient-to-r from-egyptian-blue to-egyptian-blue-dark text-white font-semibold shadow-lg hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-egyptian-blue/50',
  outline:
    'border border-white/20 text-white hover:bg-egyptian-blue/20 hover:border-egyptian-blue/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-egyptian-blue/50 font-mono',
  ghost:
    'text-gray-400 hover:text-white hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-egyptian-blue/50 font-mono text-sm',
  terminal:
    'font-mono text-sm font-bold tracking-[0.2em] rounded-lg border border-white/20 bg-transparent text-white hover:bg-egyptian-blue/20 hover:border-egyptian-blue/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-egyptian-blue/50',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-10 py-5 text-base',
};

export const Button: FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className,
  disabled,
  loading,
  icon,
  children,
  ...props
}) => {
  const rounded = variant === 'primary' ? 'rounded-full' : 'rounded-lg';
  return (
    <button
      disabled={disabled || loading}
      className={classNames(
        'inline-flex items-center justify-center gap-2 transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60',
        rounded,
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {icon && <span className="flex items-center">{icon}</span>}
      {loading ? 'INITIALIZING...' : children}
    </button>
  );
};
