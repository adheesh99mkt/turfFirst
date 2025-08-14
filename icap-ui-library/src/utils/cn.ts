import { clsx, type ClassValue } from 'clsx';

/**
 * Utility function for conditionally combining CSS classes
 * This is a wrapper around clsx for better TypeScript support
 * 
 * @param inputs - CSS class values to combine
 * @returns Combined class string
 * 
 * @example
 * ```tsx
 * cn('btn', isActive && 'btn-active', className)
 * ```
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}