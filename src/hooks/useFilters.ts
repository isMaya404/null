import { useSearchParams } from "react-router";
import { MediaType } from "@/lib/anilist/gql/graphql";

type Filters = {
    // mediaType: string;
    search?: string;
    genres?: string[];
};

export default function useFilters() {
    const [searchParams, setSearchParams] = useSearchParams();

    const filters: Filters = {
        // mediaType: searchParams.get("mediaType") || MediaType.Anime,
        search: searchParams.get("search") || undefined,
        genres: searchParams.getAll("genres"),
    };

    function setFilters(next: Filters) {
        const params = new URLSearchParams(searchParams);

        // search
        if (next.search) params.set("search", next.search);
        else params.delete("search");

        // genres
        if (next.genres?.length) {
            params.delete("genres");
            next.genres.forEach((g) => params.append("genres", g));
        } else {
            params.delete("genres");
        }

        setSearchParams(params, { replace: true });
    }

    function mergeFilters(patch: Partial<Filters>) {
        const merge: Filters = {
            ...filters,
            ...patch,
        };
        setFilters(merge);
    }

    return { filters, setFilters, mergeFilters };
}
