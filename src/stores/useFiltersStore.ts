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

export const FILTERS: (keyof Filters)[] = ["search", "genres", "tags", "year"];
const ARRAY_FILTERS: ArrayFilterKeys[] = ["genres", "tags"];

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

        // remove keys that have falsy vals so they'll not be included for
        // syncing with URL. Also a little bit of optimization since filters is
        // used within loops in some other places and now they'll have few
        // iteration checks. Absolute Cinema ✋ 😐 🤚.
        // const cleanedNext: Partial<Filters> = {};
        // for (const k in next) {
        //     const v = next[k as keyof Filters];
        //     if (Array.isArray(v) ? v.length : v) {
        //         cleanedNext[k as keyof Filters] = v;
        //     }
        // }
        // This is important bruh. Pass in a different obj reference so re-render works
        filters = next;
        localStorage.setItem("media-filters", JSON.stringify(filters));
        console.log("filters: ", { filters });

        listeners.forEach((cb) => cb()); // notify subscribers (triggers re-render)
    },

    hasFilters() {
        if (!hasObjKey(filters)) return false;
        return true;
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
