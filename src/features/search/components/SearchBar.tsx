import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui';
import { translate, type Locale } from '@/features/localization';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
  locale?: Locale;
}

export function SearchBar({ value, onChange, placeholder, autoFocus, locale = 'en' }: SearchBarProps) {
  const resolvedPlaceholder = placeholder ?? translate(locale, 'searchPlaceholder');
  return (
    <div className="relative">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={resolvedPlaceholder}
        autoFocus={autoFocus}
        aria-label={translate(locale, 'search')}
        className="pl-10 pr-10"
      />
      {value.length > 0 && (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label={translate(locale, 'clearSearch')}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-0.5 text-neutral-500 transition-colors hover:text-neutral-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-700"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
