import { useSyncExternalStore } from 'react';

/**
 * Tiny hash router. Hash URLs (/#/menu/hot-coffee) work on any static host,
 * including Cloudflare Pages, with no rewrite rules.
 *   #/                         → home
 *   #/menu                     → home, scrolled to the categories
 *   #/menu/<category>          → category page
 *   #/menu/<category>/<item>   → category page with the item open
 */
export type Route =
  | { name: 'home'; anchor?: 'menu' }
  | { name: 'category'; categoryId: string; productId?: string };

export function parseHash(hash: string): Route {
  const parts = hash.replace(/^#\/?/, '').split('/').filter(Boolean).map(decodeURIComponent);
  if (parts[0] === 'menu' && parts[1]) return { name: 'category', categoryId: parts[1], productId: parts[2] };
  if (parts[0] === 'menu') return { name: 'home', anchor: 'menu' };
  return { name: 'home' };
}

export function toHash(route: Route): string {
  if (route.name === 'home') return route.anchor ? '#/menu' : '#/';
  const base = `#/menu/${encodeURIComponent(route.categoryId)}`;
  return route.productId ? `${base}/${encodeURIComponent(route.productId)}` : base;
}

const EVENT = 'benraya:route';
let pushedInApp = 0;

export function navigate(route: Route, opts: { replace?: boolean } = {}) {
  const hash = toHash(route);
  if (opts.replace) {
    history.replaceState(history.state, '', hash);
  } else {
    history.pushState({ inApp: true }, '', hash);
    pushedInApp++;
  }
  window.dispatchEvent(new Event(EVENT));
}

/** Go back if the previous entry is ours, otherwise replace with `fallback`. */
export function goBackOr(fallback: Route) {
  if (pushedInApp > 0 && history.state?.inApp) {
    pushedInApp--;
    history.back();
  } else {
    navigate(fallback, { replace: true });
  }
}

function subscribe(cb: () => void) {
  window.addEventListener('hashchange', cb);
  window.addEventListener('popstate', cb);
  window.addEventListener(EVENT, cb);
  return () => {
    window.removeEventListener('hashchange', cb);
    window.removeEventListener('popstate', cb);
    window.removeEventListener(EVENT, cb);
  };
}

const getHash = () => window.location.hash;

export function useRoute(): Route {
  const hash = useSyncExternalStore(subscribe, getHash, () => '');
  return parseHash(hash);
}
