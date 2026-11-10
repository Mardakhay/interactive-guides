import { Link } from 'react-router-dom';
import { BookOpen, FolderOpen, StickyNote, ChevronRight } from 'lucide-react';
import type { SearchResult, SearchResultType } from '../types';
import { Highlight } from './Highlight';
import { Card } from '@/components/ui';

interface SearchResultsProps {
  results: readonly SearchResult[];
  terms: readonly string[];
}

const TYPE_META: Record<SearchResultType, { label: string; icon: typeof BookOpen; badgeClass: string }> = {
  lesson: { label: 'Lesson', icon: BookOpen, badgeClass: 'bg-primary-100 text-primary-700' },
  course: { label: 'Course', icon: FolderOpen, badgeClass: 'bg-secondary-100 text-secondary-700' },
  note: { label: 'Note', icon: StickyNote, badgeClass: 'bg-accent-100 text-accent-700' },
};

export function SearchResults({ results, terms }: SearchResultsProps) {
  return (
    <div className="space-y-2">
      {results.map((result) => {
        const meta = TYPE_META[result.type];
        const Icon = meta.icon;

        return (
          <Link key={`${result.type}-${result.id}`} to={result.path}>
            <Card interactive className="group flex items-start gap-4 p-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-neutral-100 text-neutral-500">
                <Icon className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${meta.badgeClass}`}>
                    {meta.label}
                  </span>
                  <h3 className="truncate text-sm font-semibold text-neutral-900 group-hover:text-primary-700">
                    <Highlight text={result.title} terms={terms} />
                  </h3>
                </div>
                <p className="mt-1 line-clamp-2 text-sm text-neutral-600">
                  <Highlight text={result.snippet} terms={terms} />
                </p>
              </div>
              <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-neutral-300 transition-transform group-hover:translate-x-0.5 group-hover:text-primary-600" />
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
