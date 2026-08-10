import { Search, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUIStore } from '@/stores/uiStore';
import { ROUTE_PATHS } from '@/app/router/routes';

export function TopBar() {
  const toggleSidebar = useUIStore((s) => s.toggleSidebar);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-neutral-200 bg-white/95 px-4 backdrop-blur lg:px-6">
      <button
        className="rounded-lg p-2 text-neutral-600 hover:bg-neutral-100 lg:hidden"
        onClick={toggleSidebar}
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      <button
        className="flex flex-1 items-center gap-2 rounded-lg px-3 py-2 text-sm text-neutral-500 hover:bg-neutral-100"
        onClick={() => navigate(ROUTE_PATHS.SEARCH)}
        aria-label="Search"
      >
        <Search className="h-4 w-4" />
        <span>Search lessons, courses, notes...</span>
      </button>
    </header>
  );
}
