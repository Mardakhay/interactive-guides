import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  Route,
  Bookmark,
  StickyNote,
  Search,
  Database,
  Code2,
  Settings2,
  GraduationCap,
  X,
} from 'lucide-react';
import { APP_NAME } from '@/lib/constants';
import { ROUTE_PATHS, localizedPath } from '@/app/router/routes';
import { useUIStore } from '@/stores/uiStore';
import { cn } from '@/lib/utils';
import { translate, useUiLocale, type TranslationKey } from '@/features/localization';

interface NavEntry {
  label: TranslationKey;
  path: string;
  icon: typeof LayoutDashboard;
}

const navItems: NavEntry[] = [
  { label: 'dashboard', path: ROUTE_PATHS.DASHBOARD, icon: LayoutDashboard },
  { label: 'courses', path: ROUTE_PATHS.COURSES, icon: BookOpen },
  { label: 'learningPaths', path: ROUTE_PATHS.LEARNING_PATHS, icon: Route },
  { label: 'bookmarks', path: ROUTE_PATHS.BOOKMARKS, icon: Bookmark },
  { label: 'notes', path: ROUTE_PATHS.NOTES, icon: StickyNote },
  { label: 'practice', path: ROUTE_PATHS.PRACTICE, icon: Code2 },
  { label: 'search', path: ROUTE_PATHS.SEARCH, icon: Search },
  { label: 'dataBackup', path: ROUTE_PATHS.BACKUP, icon: Database },
  { label: 'settings', path: ROUTE_PATHS.SETTINGS, icon: Settings2 },
];

export function Sidebar() {
  const locale = useUiLocale();
  const sidebarOpen = useUIStore((s) => s.sidebarOpen);
  const setSidebarOpen = useUIStore((s) => s.setSidebarOpen);

  // Keyboard-equivalent for the mobile overlay's click-to-dismiss gesture.
  useEffect(() => {
    if (!sidebarOpen) return;

    function handleKeyDown(event: KeyboardEvent): void {
      if (event.key === 'Escape') {
        setSidebarOpen(false);
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [sidebarOpen, setSidebarOpen]);

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-neutral-900/40 lg:hidden"
          aria-hidden="true"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-neutral-200 bg-white transition-transform duration-200 lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full',
        )}
        aria-label={translate(locale, 'mainNavigation')}
      >
        <div className="flex h-16 items-center justify-between border-b border-neutral-200 px-6">
          <NavLink to={localizedPath(ROUTE_PATHS.DASHBOARD, locale)} className="flex items-center gap-2" onClick={() => setSidebarOpen(false)}>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-white">
              <GraduationCap className="h-5 w-5" />
            </div>
            <span className="font-semibold text-neutral-900">{APP_NAME}</span>
          </NavLink>
          <button
            className="rounded-lg p-1.5 text-neutral-500 hover:bg-neutral-100 lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-label={translate(locale, 'closeSidebar')}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={localizedPath(item.path, locale)}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900',
                )
              }
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {translate(locale, item.label)}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-neutral-200 p-4">
          <p className="text-xs text-neutral-500">Interactive Guides MVP</p>
        </div>
      </aside>
    </>
  );
}
