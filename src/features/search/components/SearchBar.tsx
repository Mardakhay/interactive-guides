import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui';
import { useLocaleStore } from '@/stores/localeStore';
import { UI_COPY } from '@/lib/i18n';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
}

export function SearchBar({ value, onChange, placeholder, autoFocus }: SearchBarProps) {
  const locale = useLocaleStore((state) => state.locale);
  const copy = UI_COPY[locale].searchPage;
  const resolvedPlaceholder = placeholder ?? UI_COPY[locale].search.placeholder;
  return (
    <div className="relative">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
      <Input value={value} onChange={(event) => onChange(event.target.value)} placeholder={resolvedPlaceholder} autoFocus={autoFocus} aria-label={copy.title} className="pl-10 pr-10" />
      {value.length > 0 && (
        <button type="button" onClick={() => onChange('')} aria-label={copy.clearSearch} className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-0.5 text-neutral-500 transition-colors hover:text-neutral-700">
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
