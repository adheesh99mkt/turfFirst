import React from 'react';
import { cn } from '../../utils/cn';
import { BadgeProps } from '../../types';

const badgeVariants = {
  primary: 'badge-primary',
  secondary: 'badge-secondary',
  success: 'badge-success',
  warning: 'badge-warning',
  error: 'badge-error',
  info: 'badge-primary',
};

const badgeSizes = {
  xs: 'px-2 py-0.5 text-xs',
  sm: 'px-2.5 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
  lg: 'px-3 py-1 text-sm',
};

const Badge: React.FC<BadgeProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'sm',
  dot = false,
  ...props
}) => {
  if (dot) {
    return (
      <span
        className={cn(
          'inline-flex items-center gap-x-1.5 rounded-full px-2 py-1 text-xs font-medium',
          badgeVariants[variant],
          className
        )}
        {...props}
      >
        <svg className="h-1.5 w-1.5 fill-current" viewBox="0 0 6 6" aria-hidden="true">
          <circle cx={3} cy={3} r={3} />
        </svg>
        {children}
      </span>
    );
  }

  return (
    <span
      className={cn(
        'badge',
        badgeVariants[variant],
        badgeSizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

Badge.displayName = 'Badge';

export default Badge;