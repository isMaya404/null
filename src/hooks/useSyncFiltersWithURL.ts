import { FILTERS, arrFilterSet, useFilters } from "@/stores/useFiltersStore";
import { useSearchParams } from "react-router";
import { useLocation, useNavigate } from "react-router";
import { useEffect, useRef } from "react";
import hasObjKey from "@/lib/utils/hasObjKey";

// Bidiretional sync of URL and filter store.
// this fn should only be called once at the topmost level dom tree.
export const useSyncFiltersWithURL = () => {
    const { filters, setFilters, clearFilters } = useFilters();
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const location = useLocation();

    // URL/cache → filter store: push URL to filters on mount
    useEffect(() => {
        if (!searchParams.toString()) {
            // console.log(
            //     "URL -> store: searchParams empty, clearing filters and cache...",
            // );
            clearFilters();
            localStorage.removeItem("media-filters");
            return;
        }

        const filterCache = localStorage.getItem("media-filters");
        if (filterCache) {
            // console.log("cache found, restoring cache.");
            setFilters(JSON.parse(filterCache) as Filters);
            return;
        }

        const next: Filters = {};

        // check all valid filter keys since we don't know what will be typed/pasted in the URL
        for (const key of FILTERS) {
            if (arrFilterSet.has(key as ArrayFilterKeys)) {
                const vals = searchParams.getAll(key);
                if (vals.length)
                    next[key as Extract<keyof Filters, ArrayFilterKeys>] = vals;
            } else {
                const val = searchParams.get(key);
                if (val)
                    next[key as Exclude<keyof Filters, ArrayFilterKeys>] = val;
            }
        }

        if (!hasObjKey(next)) return;

        // sync filters
        setFilters(next);
        // console.log("(URL -> store) filters: ", next);
    }, []);

    // filter store → URL: push filter store to URL
    const prevSerialized = useRef("");
    useEffect(() => {
        const serialized = JSON.stringify(filters);
        if (serialized === prevSerialized.current) {
            // console.log("store -> URL early exit");
            return;
        }
        prevSerialized.current = serialized;

        for (const key in filters) {
            const val = filters[key as keyof Filters];

            if (!val || !val.length) {
                searchParams.delete(key);
                setFilters((prev) => {
                    const next = { ...prev };
                    delete next[key as keyof Filters];
                    return next;
                });
                continue;
            }

            if (arrFilterSet.has(key as ArrayFilterKeys)) {
                searchParams.delete(key); // reset to avoid duplication
                const arrVals = Array.isArray(val) ? val : [val]; // guard against non arr vals
                arrVals.forEach((v) => searchParams.append(key, v));
            } else {
                searchParams.set(key, val as string);
            }
        }

        const nextSearch = searchParams.toString();

        // navigate to /search/anime?${params} if needed
        if (nextSearch && location.pathname === "/") {
            navigate({ pathname: "/search/anime", search: `?${nextSearch}` });
        } else {
            // sync URL params
            setSearchParams(searchParams, { replace: true });
            // console.log("(store -> URL) searchParams: ", searchParams);
        }
    }, [filters]);
};
