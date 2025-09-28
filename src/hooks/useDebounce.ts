import { useCallback, useEffect, useRef } from "react";

export function useDebounce<T extends (...args: any[]) => void>(
    fn: T,
    delay: number,
): T {
    // Always call the latest fn (avoid stale closures)
    const fnRef = useRef(fn);
    useEffect(() => {
        fnRef.current = fn;
    }, [fn]);

    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Stable debounced function identity
    const debounced = useCallback(
        (...args: Parameters<T>) => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);

            timeoutRef.current = setTimeout(() => {
                fnRef.current(...args); // use the latest fn
            }, delay);
        },
        [delay],
    );

    // Cleanup on unmount to prevent leaks (and stray execution after unmount)
    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        }
    }, []);

    return debounced as T;
}
