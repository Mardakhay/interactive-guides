import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, invalid = false, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          'w-full rounded-lg border bg-white px-3 py-2 text-sm text-neutral-900',
          'placeholder:text-neutral-400',
          'transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500/30',
          'resize-y',
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

Textarea.displayName = 'Textarea';
