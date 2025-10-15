// A minimal filter store without redux or zustand for learning purposes

import { useSyncExternalStore } from "react";
import hasObjKey from "@/lib/utils/hasObjKey";

/*
 * dumbed down version of how useSyncExternalStore works under the hood
 */
// function useSyncExternalStore(subscribe, getSnapshot) {
//   // 1. Read the current value once during render.
//   const value = getSnapshot();
//
//   // 2. Setup internal state to trigger re-renders.
//   const [, forceRender] = useState(0);
//
//   useEffect(() => {
//     // 3. Subscribe to external store updates.
//     const unsubscribe = subscribe(() => {
//       // React tells your store: "When this cb runs, re-render me."
//       forceRender(x => x + 1);
//     });
//
//     // 4. Unsubscribe on unmount.
//     return unsubscribe;
//   }, [subscribe]);
//
//   // 5. Always re-read latest value.
//   return getSnapshot();
// }

export const FILTERS: (keyof Filters)[] = [
    "search",
    "genres",
    "tags",
    "year",
    "season",
    "format",
    "airingStatus",
] as const;
const ARRAY_FILTERS: ArrayFilterKeys[] = ["genres", "tags", "format"] as const;

// for faster lookup
export const arrFilterSet = new Set<ArrayFilterKeys>(ARRAY_FILTERS);

let filters: Filters = {};
const listeners = new Set<() => void>();

export const filtersStore = {
    getSnapshot: () => filters,

    subscribe: (cb: () => void) => {
        listeners.add(cb);
        return () => listeners.delete(cb); // return unsub fn
    },

    setFilters: (
        patchOrFn: Partial<Filters> | ((filters: Filters) => Partial<Filters>),
    ) => {
        const next =
            typeof patchOrFn === "function" ? patchOrFn(filters) : patchOrFn;

        // This is important bruh. Pass in a different obj reference so re-render works
        filters = next;
        localStorage.setItem("media-filters", JSON.stringify(filters));
        // console.log("filters: ", { filters });

        listeners.forEach((cb) => cb()); // notify subscribers (triggers re-render)
    },

    hasFilters() {
        // just so its a lil bit faster than Object.values() + .some()
        if (objectHasValue(filters)) return true;
        return false;
    },

    clearFilters: () => {
        filters = {};
        listeners.forEach((cb) => cb());
    },
};

export const useFilters = () => {
    const { setFilters, clearFilters, hasFilters } = filtersStore;
    const filters = useSyncExternalStore(
        filtersStore.subscribe,
        filtersStore.getSnapshot,
    );
    return { filters, setFilters, hasFilters, clearFilters };
};
