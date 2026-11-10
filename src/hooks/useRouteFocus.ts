import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Moves keyboard/screen-reader focus to the current page's main heading (or
 * the #main-content landmark as a fallback) whenever the route changes.
 * React Router does not reset focus on client-side navigation by default,
 * which otherwise leaves screen reader users anchored on the previous
 * page's content after navigating.
 */
export function useRouteFocus(): void {
  const location = useLocation();

  useEffect(() => {
    // Defer to the next frame so the new route's content (including inside
    // <Suspense>) has mounted before we look for something to focus.
    const raf = requestAnimationFrame(() => {
      const heading = document.querySelector<HTMLElement>('#main-content h1');
      const target = heading ?? document.getElementById('main-content');
      if (!target) return;

      if (!target.hasAttribute('tabindex')) {
        target.setAttribute('tabindex', '-1');
      }
      target.focus({ preventScroll: false });
    });

    return () => cancelAnimationFrame(raf);
  }, [location.pathname]);
}
