import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, invalid = false, type = 'text', ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          'h-10 w-full rounded-lg border bg-white px-3 text-sm text-neutral-900',
          'placeholder:text-neutral-400',
          'transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500/30',
          invalid
            ? 'border-error-400 focus:border-error-500'
            : 'border-neutral-300 focus:border-primary-500',
          className,
        )}
        {...props}
      />
    );
  },
);

Input.displayName = 'Input';
