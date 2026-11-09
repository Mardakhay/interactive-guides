import { NavLink } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Bookmark, StickyNote, Search, Code2 } from 'lucide-react';
import { ROUTE_PATHS, localizedPath } from '@/app/router/routes';
import { cn } from '@/lib/utils';
import { translate, useUiLocale, type TranslationKey } from '@/features/localization';

const navItems: { label: TranslationKey; path: string; icon: typeof LayoutDashboard }[] = [
  { label: 'home', path: ROUTE_PATHS.DASHBOARD, icon: LayoutDashboard },
  { label: 'courses', path: ROUTE_PATHS.COURSES, icon: BookOpen },
  { label: 'practice', path: ROUTE_PATHS.PRACTICE, icon: Code2 },
  { label: 'bookmarks', path: ROUTE_PATHS.BOOKMARKS, icon: Bookmark },
  { label: 'notes', path: ROUTE_PATHS.NOTES, icon: StickyNote },
  { label: 'search', path: ROUTE_PATHS.SEARCH, icon: Search },
];

export function MobileNav() {
  const locale = useUiLocale();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 flex border-t border-neutral-200 bg-white lg:hidden" aria-label={translate(locale, 'mainNavigation')}>
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={localizedPath(item.path, locale)}
          className={({ isActive }) =>
            cn(
              'flex flex-1 flex-col items-center gap-1 py-2 text-2xs font-medium transition-colors focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary-700',
              isActive ? 'text-primary-600' : 'text-neutral-500',
            )
          }
        >
          <item.icon className="h-5 w-5" />
          {translate(locale, item.label)}
        </NavLink>
      ))}
    </nav>
  );
}
