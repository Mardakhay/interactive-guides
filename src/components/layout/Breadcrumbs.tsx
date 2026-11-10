import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import type { BreadcrumbItem } from '@/types/common';

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1 text-sm">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <div key={index} className="flex items-center gap-1">
            {item.path && !isLast ? (
              <Link to={item.path} className="text-neutral-500 transition-colors hover:text-neutral-900">
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? 'font-medium text-neutral-900' : 'text-neutral-500'}>
                {item.label}
              </span>
            )}
            {!isLast && <ChevronRight className="h-3.5 w-3.5 shrink-0 text-neutral-500" />}
          </div>
        );
      })}
    </nav>
  );
}
