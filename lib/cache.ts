// Lightweight localStorage cache with TTL for stale-while-revalidate data loading.
// Used by ShopContext to render cached Firestore data instantly and refresh in the background.

const PREFIX = "colitrack:cache:";
const DEFAULT_TTL = 1000 * 60 * 10; // 10 minutes

interface CacheEnvelope<T> {
  exp: number;
  data: T;
}

/** Read a cached value. Returns null on miss, expiry, or any parse error. */
export function readCache<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(PREFIX + key);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CacheEnvelope<T>;
    if (!parsed || typeof parsed.exp !== "number") return null;
    if (Date.now() > parsed.exp) {
      window.localStorage.removeItem(PREFIX + key);
      return null;
    }
    return parsed.data;
  } catch {
    return null;
  }
}

/** Write a value with an expiry. Silently ignores quota / serialization errors. */
export function writeCache(key: string, data: unknown, ttlMs: number = DEFAULT_TTL): void {
  if (typeof window === "undefined") return;
  try {
    const envelope: CacheEnvelope<unknown> = { exp: Date.now() + ttlMs, data };
    window.localStorage.setItem(PREFIX + key, JSON.stringify(envelope));
  } catch {
    // localStorage full or unavailable — caching is best-effort, so ignore.
  }
}

/** Remove a single cached entry. */
export function clearCache(key: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(PREFIX + key);
  } catch {
    // ignore
  }
}

/**
 * JSON.stringify turns Date objects into ISO strings. When hydrating cached rows
 * back into state, revive the given fields to real Date objects so downstream
 * consumers (formatters, comparisons) keep working.
 */
export function reviveDates<T extends Record<string, any>>(rows: T[], fields: string[]): T[] {
  if (!Array.isArray(rows)) return rows;
  return rows.map((row) => {
    if (!row || typeof row !== "object") return row;
    const next: Record<string, any> = { ...row };
    for (const field of fields) {
      const value = next[field];
      if (typeof value === "string" || typeof value === "number") {
        const d = new Date(value);
        if (!isNaN(d.getTime())) next[field] = d;
      }
    }
    return next as T;
  });
}
