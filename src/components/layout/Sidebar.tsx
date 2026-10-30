import { useEffect, useRef } from 'react';
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

  const sidebarRef = useRef<HTMLElement | null>(null);
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);

  // Treat the mobile drawer as a modal dialog while it is open.
  useEffect(() => {
    if (!sidebarOpen) return;

    const activeElement = document.activeElement;
    previouslyFocusedElement.current = activeElement instanceof HTMLElement ? activeElement : null;
    const sidebar = sidebarRef.current;
    const firstFocusable = sidebar?.querySelector<HTMLElement>('[data-sidebar-close], a[href], button:not([disabled])');
    firstFocusable?.focus();

    function getFocusableElements(): HTMLElement[] {
      const root = sidebarRef.current;
      if (!root) return [];
      return Array.from(root.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'));
    }

    function handleKeyDown(event: KeyboardEvent): void {
      if (event.key === 'Escape') {
        event.preventDefault();
        setSidebarOpen(false);
        return;
      }
      if (event.key !== 'Tab') return;

      const focusableElements = getFocusableElements();
      if (focusableElements.length === 0) {
        event.preventDefault();
        sidebar?.focus();
        return;
      }

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      const previous = previouslyFocusedElement.current;
      if (previous?.isConnected) previous.focus();
      previouslyFocusedElement.current = null;
    };
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
        ref={sidebarRef}
        role={sidebarOpen ? 'dialog' : undefined}
        aria-modal={sidebarOpen ? true : undefined}
        tabIndex={sidebarOpen ? -1 : undefined}
        className={cn(
          'fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-neutral-200 bg-white transition-transform duration-200 lg:translate-x-0',
          sidebarOpen ? 'translate-x-0 visible' : '-translate-x-full invisible lg:visible',
        )}
        aria-label={translate(locale, 'mainNavigation')}
      >
        <div className="flex h-16 items-center justify-between border-b border-neutral-200 px-6">
          <NavLink to={localizedPath(ROUTE_PATHS.DASHBOARD, locale)} className="flex items-center gap-2 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-700" onClick={() => setSidebarOpen(false)}>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-white">
              <GraduationCap className="h-5 w-5" />
            </div>
            <span className="font-semibold text-neutral-900">{APP_NAME}</span>
          </NavLink>
          <button
            className="rounded-lg p-1.5 text-neutral-500 hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-700 lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-label={translate(locale, 'closeSidebar')}
            data-sidebar-close
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
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-700',
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
