import { forwardRef } from 'react';
import { cn } from '../../utils.js';
// Removed unused InputHTMLAttributes import to fix ESLint error
const Input = forwardRef(function Input({
  className,
  label,
  helperText,
  error,
  leftIcon,
  rightIcon,
  variant = 'default',
  id,
  ...props
}, ref) {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <div className="text-gray-400">{leftIcon}</div>
          </div>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'block w-full rounded-md border transition-colors duration-200',
            'focus:outline-none focus:ring-1 focus:ring-offset-0',
            'disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed',
            variant === 'default' && [
              'bg-white border-gray-300 text-gray-900 placeholder-gray-400',
              'focus:border-blue-500 focus:ring-blue-500/20',
            ],
            variant === 'filled' && [
              'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400',
              'focus:bg-white focus:border-blue-500 focus:ring-blue-500/20',
            ],
            error && [
              'border-red-300 text-red-900 placeholder-red-300',
              'focus:border-red-500 focus:ring-red-500/20',
            ],
            leftIcon && 'pl-9',
            rightIcon && 'pr-9',
            'px-3 py-2.5 text-sm h-9',
            className
          )}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={
            error
              ? `${inputId}-error`
              : helperText
              ? `${inputId}-helper`
              : undefined
          }
          {...props}
        />
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <div className="text-gray-400">{rightIcon}</div>
          </div>
        )}
      </div>
      {(helperText || error) && (
        <div className="mt-1.5">
          {error ? (
            <p id={`${inputId}-error`} className="text-sm text-red-600">{error}</p>
          ) : (
            helperText && (
              <p id={`${inputId}-helper`} className="text-sm text-gray-500">{helperText}</p>
            )
          )}
        </div>
      )}
    </div>
  );
});

export default Input;
