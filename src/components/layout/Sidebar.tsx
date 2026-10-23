import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  Route,
  Bookmark,
  StickyNote,
  Search,
  GraduationCap,
  X,
} from 'lucide-react';
import { APP_NAME } from '@/lib/constants';
import { ROUTE_PATHS } from '@/app/router/routes';
import { useUIStore } from '@/stores/uiStore';
import { cn } from '@/lib/utils';

interface NavEntry {
  label: string;
  path: string;
  icon: typeof LayoutDashboard;
}

const navItems: NavEntry[] = [
  { label: 'Dashboard', path: ROUTE_PATHS.DASHBOARD, icon: LayoutDashboard },
  { label: 'Courses', path: ROUTE_PATHS.COURSES, icon: BookOpen },
  { label: 'Learning Paths', path: ROUTE_PATHS.LEARNING_PATHS, icon: Route },
  { label: 'Bookmarks', path: ROUTE_PATHS.BOOKMARKS, icon: Bookmark },
  { label: 'Notes', path: ROUTE_PATHS.NOTES, icon: StickyNote },
  { label: 'Search', path: ROUTE_PATHS.SEARCH, icon: Search },
];

export function Sidebar() {
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
        aria-label="Main navigation"
      >
        <div className="flex h-16 items-center justify-between border-b border-neutral-200 px-6">
          <NavLink to={ROUTE_PATHS.DASHBOARD} className="flex items-center gap-2" onClick={() => setSidebarOpen(false)}>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-white">
              <GraduationCap className="h-5 w-5" />
            </div>
            <span className="font-semibold text-neutral-900">{APP_NAME}</span>
          </NavLink>
          <button
            className="rounded-lg p-1.5 text-neutral-500 hover:bg-neutral-100 lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
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
              {item.label}
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
