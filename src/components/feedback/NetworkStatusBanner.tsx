import { useEffect, useState } from 'react';
import { WifiOff } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export function NetworkStatusBanner() {
  const { pathname } = useLocation();
  const [offline, setOffline] = useState(
    () => typeof navigator !== 'undefined' && !navigator.onLine,
  );

  useEffect(() => {
    const handleOnline = () => setOffline(false);
    const handleOffline = () => setOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!offline) return null;
  const isRussian = pathname.startsWith('/ru/');

  return (
    <div
      role="status"
      aria-live="polite"
      className="flex items-start gap-3 border-b border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950 sm:px-6"
    >
      <WifiOff className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
      <div>
        <p className="font-semibold">
          {isRussian ? 'Нет подключения к интернету' : 'You are offline'}
        </p>
        <p className="mt-0.5 leading-5 text-amber-900">
          {isRussian
            ? 'Ранее сохранённые страницы и уроки могут быть доступны. Для загрузки нового материала подключись к сети.'
            : 'Previously cached pages and lessons may still be available. Reconnect to load content you have not opened before.'}
        </p>
      </div>
    </div>
  );
}
