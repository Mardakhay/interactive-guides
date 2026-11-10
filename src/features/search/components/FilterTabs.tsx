import { BookOpen, FolderOpen, StickyNote, LayoutGrid } from 'lucide-react';
import type { SearchFilter, SearchResultType } from '../types';
import { cn } from '@/lib/utils';
import { translate, type Locale, type TranslationKey } from '@/features/localization';

interface FilterTabsProps {
  filter: SearchFilter;
  counts: Record<SearchResultType, number>;
  onChange: (filter: SearchFilter) => void;
  locale?: Locale;
}

interface FilterOption {
  key: SearchFilter;
  label: TranslationKey;
  icon: typeof BookOpen;
  count: number | null;
}

export function FilterTabs({ filter, counts, onChange, locale = 'en' }: FilterTabsProps) {
  const options: FilterOption[] = [
    { key: 'all', label: 'allResults', icon: LayoutGrid, count: null },
    { key: 'lesson', label: 'lessons', icon: BookOpen, count: counts.lesson },
    { key: 'course', label: 'courses', icon: FolderOpen, count: counts.course },
    { key: 'note', label: 'notes', icon: StickyNote, count: counts.note },
  ];

  return (
    <div className="flex flex-wrap gap-1.5" role="group" aria-label={translate(locale, 'filterResultsByType')}>
      {options.map((option) => {
        const isActive = filter === option.key;
        return (
          <button
            key={option.key}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(option.key)}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-700',
              isActive
                ? 'bg-primary-50 text-primary-700'
                : 'text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700',
            )}
          >
            <option.icon className="h-4 w-4" aria-hidden="true" />
            {translate(locale, option.label)}
            {option.count !== null && option.count > 0 && (
              <span className={cn('rounded-full px-1.5 text-xs', isActive ? 'bg-primary-200 text-primary-800' : 'bg-neutral-200 text-neutral-600')}>
                {option.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
