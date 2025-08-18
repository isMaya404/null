import { useCallback, useEffect, useRef } from "react";

export function useDebounce<T extends (...args: any[]) => void>(
    fn: T,
    delay: number
): T {
    // 1) Always call the latest fn (avoid stale closures)
    const fnRef = useRef(fn);
    useEffect(() => {
        fnRef.current = fn;
    }, [fn]);

    // 2) Keep timer id in a ref so it survives renders and is shared by the same debounced fn
    const timeoutRef = useRef<number | null>(null);

    // 3) Stable debounced function identity; only changes if 'delay' changes
    const debounced = useCallback(
        (...args: Parameters<T>) => {
            if (timeoutRef.current !== null) {
                clearTimeout(timeoutRef.current);
            }
            timeoutRef.current = window.setTimeout(() => {
                fnRef.current(...args); // use the latest fn
            }, delay);
        },
        [delay]
    );

    // 4) Cleanup on unmount to prevent leaks (and stray execution after unmount)
    useEffect(() => {
        return () => {
            if (timeoutRef.current !== null) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return debounced as T;
}
