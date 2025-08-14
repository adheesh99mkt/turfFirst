import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { InputProps } from '../../types';

const Input = forwardRef<HTMLInputElement, InputProps>(({
  className,
  label,
  placeholder,
  error,
  helperText,
  disabled = false,
  required = false,
  type = 'text',
  value,
  defaultValue,
  onChange,
  onBlur,
  onFocus,
  ...props
}, ref) => {
  const inputId = React.useId();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <div className="w-full">
      {label && (
        <label 
          htmlFor={inputId}
          className={cn(
            'form-label',
            disabled && 'text-gray-400',
            error && 'text-error-700'
          )}
        >
          {label}
          {required && <span className="text-error-500 ml-1">*</span>}
        </label>
      )}
      
      <input
        ref={ref}
        id={inputId}
        type={type}
        className={cn(
          'form-input',
          error && 'border-error-300 focus:border-error-500 focus:ring-error-500',
          disabled && 'bg-gray-50 cursor-not-allowed',
          className
        )}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        value={value}
        defaultValue={defaultValue}
        onChange={handleChange}
        onBlur={onBlur}
        onFocus={onFocus}
        aria-invalid={!!error}
        aria-describedby={
          error ? `${inputId}-error` : helperText ? `${inputId}-help` : undefined
        }
        {...props}
      />
      
      {error && (
        <p id={`${inputId}-error`} className="form-error">
          {error}
        </p>
      )}
      
      {helperText && !error && (
        <p id={`${inputId}-help`} className="form-help">
          {helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;