import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const HEADING_SELECTORS = ['h1', 'h2', '[data-page-heading]'];

/**
 * Moves focus to the current page's primary heading on route changes so
 * screen-reader users perceive navigation. Falls back to #main-content when
 * no heading is present.
 */
export function useRouteFocus(): void {
  const { pathname } = useLocation();
  const previousPath = useRef<string | null>(null);

  useEffect(() => {
    if (previousPath.current === pathname) return;
    previousPath.current = pathname;

    const main = document.getElementById('main-content');
    if (!main) return;

    let target: HTMLElement | null = null;
    for (const selector of HEADING_SELECTORS) {
      target = main.querySelector<HTMLElement>(selector);
      if (target) break;
    }

    const focusTarget = target ?? main;
    if (focusTarget) {
      focusTarget.tabIndex = -1;
      focusTarget.focus({ preventScroll: true });
    }
  }, [pathname]);
}
