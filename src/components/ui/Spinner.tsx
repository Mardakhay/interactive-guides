import { Loader as Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SpinnerProps {
  className?: string;
  label?: string;
}

export function Spinner({ className, label = 'Loading' }: SpinnerProps) {
  return (
    <div className={cn('flex items-center justify-center', className)} role="status">
      <Loader2 className="h-5 w-5 animate-spin text-primary-600" aria-hidden="true" />
      <span className="sr-only">{label}</span>
    </div>
  );
}
