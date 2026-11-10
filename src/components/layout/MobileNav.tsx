import { NavLink } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Bookmark, StickyNote, Search } from 'lucide-react';
import { ROUTE_PATHS } from '@/app/router/routes';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Home', path: ROUTE_PATHS.DASHBOARD, icon: LayoutDashboard },
  { label: 'Courses', path: ROUTE_PATHS.COURSES, icon: BookOpen },
  { label: 'Bookmarks', path: ROUTE_PATHS.BOOKMARKS, icon: Bookmark },
  { label: 'Notes', path: ROUTE_PATHS.NOTES, icon: StickyNote },
  { label: 'Search', path: ROUTE_PATHS.SEARCH, icon: Search },
];

export function MobileNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 flex border-t border-neutral-200 bg-white lg:hidden" aria-label="Mobile navigation">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            cn(
              'flex flex-1 flex-col items-center gap-1 py-2 text-2xs font-medium transition-colors',
              isActive ? 'text-primary-600' : 'text-neutral-500',
            )
          }
        >
          <item.icon className="h-5 w-5" />
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}
