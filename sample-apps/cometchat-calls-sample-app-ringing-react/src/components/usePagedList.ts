import { useCallback, useEffect, useRef, useState, type UIEvent } from 'react';

/** Anything with a stateful `fetchNext()`: the Chat SDK's users / groups requests, call logs. */
export interface PagedRequest<T> {
  fetchNext(): Promise<T[]>;
}

/**
 * A list fed page by page from an SDK request. `makeRequest` builds a fresh request; the list
 * starts again whenever it changes (a new search) or `reload()` is called, keeping the old rows
 * up until the first new page replaces them. A page that arrives after a newer reload started
 * is dropped, so a slow response never overwrites a newer search.
 */
export function usePagedList<T>(
  makeRequest: () => PagedRequest<T>,
  pageSize: number,
) {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const requestRef = useRef<PagedRequest<T> | null>(null);
  const generationRef = useRef(0);
  const hasMoreRef = useRef(true);
  const busyRef = useRef(false);

  /** The next page; `replacing` swaps it in for the old rows, which stay up until then. */
  const loadMore = useCallback(
    async (replacing = false) => {
      const request = requestRef.current;
      if (!request || busyRef.current || !hasMoreRef.current) return;
      busyRef.current = true;
      const generation = generationRef.current;
      try {
        const page = await request.fetchNext();
        if (generation !== generationRef.current) return;
        hasMoreRef.current = page.length >= pageSize;
        setItems((current) => (replacing ? page : [...current, ...page]));
        setError(null);
      } catch (e) {
        if (generation !== generationRef.current) return;
        hasMoreRef.current = false;
        if (replacing) setItems([]);
        setError(
          e instanceof Error
            ? e.message
            : String((e as { message?: string })?.message ?? e),
        );
      } finally {
        if (generation === generationRef.current) {
          busyRef.current = false;
          setLoading(false);
        }
      }
    },
    [pageSize],
  );

  const reload = useCallback(() => {
    generationRef.current += 1;
    requestRef.current = makeRequest();
    hasMoreRef.current = true;
    busyRef.current = false;
    void loadMore(true);
  }, [makeRequest, loadMore]);

  useEffect(() => {
    reload();
  }, [reload]);

  /** For a scroll container: loads the next page near the bottom. */
  const onScroll = useCallback(
    (e: UIEvent<HTMLElement>) => {
      const el = e.currentTarget;
      if (el.scrollHeight - el.scrollTop - el.clientHeight < 200)
        void loadMore();
    },
    [loadMore],
  );

  return { items, loading, error, reload, onScroll };
}

/** A search box's value after typing pauses for 300 ms. */
export function useDebounced(value: string, delayMs = 300): string {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(timer);
  }, [value, delayMs]);
  return debounced;
}
