import { ReactNode } from 'react';

// Common component props
export interface BaseComponentProps {
  className?: string;
  children?: ReactNode;
}

// Size variants
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

// Color variants
export type ColorVariant = 
  | 'primary' 
  | 'secondary' 
  | 'success' 
  | 'warning' 
  | 'error' 
  | 'info';

// Button variants
export type ButtonVariant = 
  | 'primary' 
  | 'secondary' 
  | 'outline' 
  | 'ghost' 
  | 'link';

// Button props
export interface ButtonProps extends BaseComponentProps {
  variant?: ButtonVariant;
  size?: Size;
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
}

// Card props
export interface CardProps extends BaseComponentProps {
  shadow?: 'none' | 'soft' | 'medium' | 'hard';
  padding?: Size;
}

// Alert props
export interface AlertProps extends BaseComponentProps {
  variant?: ColorVariant;
  title?: string;
  onClose?: () => void;
  closable?: boolean;
}

// Badge props
export interface BadgeProps extends BaseComponentProps {
  variant?: ColorVariant;
  size?: Exclude<Size, 'xl'>;
  dot?: boolean;
}

// Input props
export interface InputProps extends BaseComponentProps {
  label?: string;
  placeholder?: string;
  error?: string;
  helperText?: string;
  disabled?: boolean;
  required?: boolean;
  type?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
}

// Form field wrapper props
export interface FormFieldProps extends BaseComponentProps {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
}