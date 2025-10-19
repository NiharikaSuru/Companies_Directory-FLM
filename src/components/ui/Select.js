import { forwardRef } from 'react';
import { cn } from '../../utils.js';

const Select = forwardRef(function Select({
  className,
  label,
  helperText,
  error,
  options,
  placeholder,
  variant = 'default',
  id,
  onChange,
  ...props
}, ref) {
  const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={selectId} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      )}
      <div className="relative">
        <select
          ref={ref}
          id={selectId}
          className={cn(
            'block w-full rounded-md border transition-colors duration-200 appearance-none cursor-pointer',
            'focus:outline-none focus:ring-1 focus:ring-offset-0',
            'disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed',
            variant === 'default' && [
              'bg-white border-gray-300 text-gray-900',
              'focus:border-blue-500 focus:ring-blue-500/20',
              'hover:border-gray-400',
            ],
            variant === 'filled' && [
              'bg-gray-50 border-gray-200 text-gray-900',
              'focus:bg-white focus:border-blue-500 focus:ring-blue-500/20',
              'hover:border-gray-300',
            ],
            error && [
              'border-red-300 text-red-900',
              'focus:border-red-500 focus:ring-red-500/20',
            ],
            'px-3 py-2 pr-9 text-sm h-9',
            className
          )}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={
            error
              ? `${selectId}-error`
              : helperText
              ? `${selectId}-helper`
              : undefined
          }
          onChange={onChange ? (e) => onChange(e.target.value) : undefined}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>{placeholder}</option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value} disabled={option.disabled}>{option.label}</option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2.5 pointer-events-none">
          <span className="h-4 w-4 text-gray-400">▼</span>
        </div>
      </div>
      {(helperText || error) && (
        <div className="mt-1.5">
          {error ? (
            <p id={`${selectId}-error`} className="text-sm text-red-600">{error}</p>
          ) : (
            helperText && (
              <p id={`${selectId}-helper`} className="text-sm text-gray-500">{helperText}</p>
            )
          )}
        </div>
      )}
    </div>
  );
});

export default Select;
