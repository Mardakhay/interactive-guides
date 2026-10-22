import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Route, Bookmark, StickyNote, Search, GraduationCap, Settings, X } from 'lucide-react';
import { APP_NAME } from '@/lib/constants';
import { ROUTE_PATHS } from '@/app/router/routes';
import { useUIStore } from '@/stores/uiStore';
import { useLocaleStore } from '@/stores/localeStore';
import { UI_COPY } from '@/lib/i18n';
import { cn } from '@/lib/utils';

interface NavEntry { label: string; path: string; icon: typeof LayoutDashboard; }

export function Sidebar() {
  const sidebarOpen = useUIStore((state) => state.sidebarOpen);
  const setSidebarOpen = useUIStore((state) => state.setSidebarOpen);
  const locale = useLocaleStore((state) => state.locale);
  const copy = UI_COPY[locale].navigation;
  const navItems: NavEntry[] = [
    { label: copy.dashboard, path: ROUTE_PATHS.DASHBOARD, icon: LayoutDashboard },
    { label: copy.courses, path: ROUTE_PATHS.COURSES, icon: BookOpen },
    { label: copy.learningPaths, path: ROUTE_PATHS.LEARNING_PATHS, icon: Route },
    { label: copy.bookmarks, path: ROUTE_PATHS.BOOKMARKS, icon: Bookmark },
    { label: copy.notes, path: ROUTE_PATHS.NOTES, icon: StickyNote },
    { label: copy.search, path: ROUTE_PATHS.SEARCH, icon: Search },
    { label: copy.dataManagement, path: ROUTE_PATHS.DATA_MANAGEMENT, icon: Settings },
  ];

  useEffect(() => {
    if (!sidebarOpen) return;
    function handleKeyDown(event: KeyboardEvent): void {
      if (event.key === 'Escape') setSidebarOpen(false);
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [sidebarOpen, setSidebarOpen]);

  return (
    <>
      {sidebarOpen && <div className="fixed inset-0 z-30 bg-neutral-900/40 lg:hidden" aria-hidden="true" onClick={() => setSidebarOpen(false)} />}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-neutral-200 bg-white transition-transform duration-200 lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full',
        )}
        aria-label={copy.mainLabel}
      >
        <div className="flex h-16 items-center justify-between border-b border-neutral-200 px-6">
          <NavLink to={ROUTE_PATHS.DASHBOARD} className="flex items-center gap-2" onClick={() => setSidebarOpen(false)}>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-white"><GraduationCap className="h-5 w-5" /></div>
            <span className="font-semibold text-neutral-900">{APP_NAME}</span>
          </NavLink>
          <button className="rounded-lg p-1.5 text-neutral-500 hover:bg-neutral-100 lg:hidden" onClick={() => setSidebarOpen(false)} aria-label={copy.closeSidebar}>
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto p-3" aria-label={copy.mainLabel}>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) => cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                isActive ? 'bg-primary-50 text-primary-700' : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900',
              )}
            >
              <item.icon className="h-5 w-5 shrink-0" />{item.label}
            </NavLink>
          ))}
        </nav>
        <div className="border-t border-neutral-200 p-4"><p className="text-xs text-neutral-500">{copy.appVersion}</p></div>
      </aside>
    </>
  );
}
