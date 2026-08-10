import { Inbox } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  message?: string;
  icon?: typeof Inbox;
  action?: React.ReactNode;
}

export function EmptyState({ title, message, icon: Icon = Inbox, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 py-16 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100">
        <Icon className="h-6 w-6 text-neutral-400" />
      </div>
      <div className="space-y-1">
        <h3 className="text-lg font-semibold text-neutral-900">{title}</h3>
        {message && <p className="text-sm text-neutral-600">{message}</p>}
      </div>
      {action}
    </div>
  );
}
