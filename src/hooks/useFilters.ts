import { useSearchParams } from "react-router";
import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router";

export type Filters = {
    // mediaType: string;
    search?: string;
    genres?: string[];
    tags?: string[];
};

type ArrayFilterKeys = {
    [K in keyof Filters]: Exclude<Filters[K], undefined> extends any[]
        ? K
        : never;
}[keyof Filters];

const ARRAY_FILTERS: ArrayFilterKeys[] = ["genres", "tags"];
const FILTERS: (keyof Filters)[] = ["search", "genres", "tags"];

export const useFilters = () => {
    // searchParams will act as a global state && source
    // of truth for both filters obj and url search params.
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const location = useLocation();

    const filters = useMemo(() => {
        const result: Filters = {};

        for (const key of FILTERS) {
            if (ARRAY_FILTERS.includes(key as ArrayFilterKeys)) {
                const values = searchParams.getAll(key);
                if (values.length) (result[key] as string[]) = values;
            } else {
                const value = searchParams.get(key);
                if (value) (result[key] as string) = value;
            }
        }

        return result;
    }, [searchParams]);
    const hasFilters: Boolean = useMemo(() => {
        return Object.values(filters).some((v) =>
            Array.isArray(v) ? v.length > 0 : Boolean(v),
        );
    }, [filters]);

    const setFilters = (
        patchOrCb: Partial<Filters> | ((prev: Filters) => Partial<Filters>),
    ) => {
        const patch =
            typeof patchOrCb === "function" ? patchOrCb(filters) : patchOrCb;

        // let's see if cloning isn't needed
        // const newParams = new URLSearchParams(searchParams);

        patch.search
            ? searchParams.set("search", patch.search)
            : searchParams.delete("search");

        if (patch.genres && patch.genres.length) {
            searchParams.delete("genres");
            const genresArr = Array.isArray(patch.genres)
                ? patch.genres
                : [patch.genres];
            genresArr.forEach((g) => searchParams.append("genres", g));
        } else searchParams.delete("genres");

        const nextSearch = searchParams.toString(); // serialize it so an empty obj will be falsy

        // nav to /search/anime if there's any filter cause that's
        // where filtered cards will be rendered and also SEO
        if (nextSearch && location.pathname === "/") {
            navigate({
                pathname: "/search/anime",
                search: `?${nextSearch}`,
            });
            // early exit so root won't be polluted with setSearchParams and
            // clicking browser or mouse button prev/back history stack
            // wont cause a loop
            return;
        }

        setSearchParams(searchParams, { replace: true });
    };

    return { filters, setFilters, hasFilters };
};
