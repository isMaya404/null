import { useEffect, useState } from "react";

const mediaQueryStore = new Map<
    string,
    {
        mql: MediaQueryList;
        matches: boolean;
        listeners: Set<React.Dispatch<React.SetStateAction<boolean>>>;
        handler: (e: MediaQueryListEvent) => void;
    }
>();

export function useMediaQuery(query: string): boolean {
    const [matches, setMatches] = useState(() => {
        // only run in client-side
        if (typeof window !== "undefined") {
            if (mediaQueryStore.has(query)) {
                return mediaQueryStore.get(query)!.matches; // use the cached val
            }
            return window.matchMedia(query).matches;
        }
        return false; // SSR fallback
    });

    useEffect(() => {
        if (typeof window === "undefined") return;

        let entry = mediaQueryStore.get(query);
        // If query is not yet stored in MediaQueryStore,
        // create a new entry and store it
        if (!entry) {
            const mql = window.matchMedia(query);
            const listeners = new Set<
                React.Dispatch<React.SetStateAction<boolean>>
            >();
            // onChange handler
            const handler = (e: MediaQueryListEvent) => {
                // sync value
                entry!.matches = e.matches;
                // notify subscribers
                for (const listener of listeners) {
                    listener(e.matches);
                }
            };
            mql.addEventListener("change", handler);

            entry = {
                mql,
                matches: mql.matches,
                listeners,
                handler,
            };

            mediaQueryStore.set(query, entry);
        }

        // Else just add current hook’s setMatches fn to
        // the existing (Set) subscribers
        entry.listeners.add(setMatches);
        setMatches(entry.matches); // sync current match state

        return () => {
            const stored = mediaQueryStore.get(query);
            if (!stored) return;

            stored.listeners.delete(setMatches);

            if (stored.listeners.size === 0) {
                stored.mql.removeEventListener("change", stored.handler);
                mediaQueryStore.delete(query);
            }
        };
    }, [query]);

    return matches;
}

export const useIsMobile = () => useMediaQuery("(max-width: 639px)");
export const useIsTablet = () =>
    useMediaQuery("(min-width: 640px) and (max-width: 1023px)");
export const useIsDesktop = () => useMediaQuery("(min-width: 1024px)");

// Or maybe use a sophisticated lib
// import { useMediaQuery } from '@react-hookz/web';
