import React from 'react';
import { cn } from '../../utils/cn';
import { CardProps } from '../../types';

const shadowVariants = {
  none: 'shadow-none',
  soft: 'shadow-soft',
  medium: 'shadow-medium',
  hard: 'shadow-hard',
};

const paddingVariants = {
  xs: 'p-2',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
  xl: 'p-10',
};

const Card: React.FC<CardProps> = ({
  children,
  className,
  shadow = 'soft',
  padding = 'md',
  ...props
}) => {
  return (
    <div
      className={cn(
        'card',
        shadowVariants[shadow],
        paddingVariants[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={cn('card-header', className)} {...props}>
      {children}
    </div>
  );
};

const CardBody: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={cn('card-body', className)} {...props}>
      {children}
    </div>
  );
};

const CardFooter: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={cn('card-footer', className)} {...props}>
      {children}
    </div>
  );
};

Card.displayName = 'Card';
CardHeader.displayName = 'CardHeader';
CardBody.displayName = 'CardBody';
CardFooter.displayName = 'CardFooter';

export default Card;
export { CardHeader, CardBody, CardFooter };