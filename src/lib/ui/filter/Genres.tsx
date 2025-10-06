import { getAniListGenreAndTagData } from "@/lib/anilist/api";

import { DropdownMenuItem } from "@/lib/ui/dropdown";
import { useSuspenseQuery } from "@tanstack/react-query";
import { AnilistGenreAndTagCollectionQuery } from "@/lib/anilist/gql/graphql";
import { useFilters } from "@/hooks/useFilters";
import BaseFilterDropdown from "./BaseFilterDropDown";
import { useMemo } from "react";
import toggleArrItem from "@/lib/utils/toggleArrItem";

export default function Genres() {
    return (
        <BaseFilterDropdown dropdownType="genres">
            <GenreDropdownItems />
        </BaseFilterDropdown>
    );
}

// useSuspenseQuery doesn't allow "enabled: some-condition" query opts like in
// useQuery which is to only exec the query on a condition. This is a hacky way
// to do that
const GenreDropdownItems = () => {
    const { data, error, isFetching } =
        useSuspenseQuery<AnilistGenreAndTagCollectionQuery>({
            queryKey: ["anilist-genre-and-tag"],
            queryFn: getAniListGenreAndTagData,
            meta: { persist: true },
        });

    const nonNullGenres = useMemo(() => {
        return (data?.GenreCollection ?? []).filter(
            (g): g is string => g != null && g !== "Hentai",
        );
    }, [data.GenreCollection]);

    const nonNullTags = useMemo(() => {
        return (data?.MediaTagCollection ?? []).filter(
            (t): t is NonNullable<typeof t> => t != null && !t.isAdult,
        );
    }, [data.MediaTagCollection]);

    const { setFilters } = useFilters();

    if (error && !isFetching) throw error;
    if (nonNullGenres.length === 0 || nonNullTags.length === 0)
        return <div className="text-center text-20-bold">No Results</div>;

    return (
        <>
            <DropdownMenuItem className="text-16-medium" disabled>
                GENRES
            </DropdownMenuItem>

            {nonNullGenres.map((g) => (
                <DropdownMenuItem
                    key={g}
                    className="filter-dropdown-item-spacing"
                    onClick={() =>
                        setFilters((prev) => ({
                            ...prev,
                            genres: toggleArrItem(prev.genres, g),
                        }))
                    }
                >
                    {g}
                </DropdownMenuItem>
            ))}

            <DropdownMenuItem className="text-16-medium" disabled>
                TAGS
            </DropdownMenuItem>

            {nonNullTags.map((t) => (
                <DropdownMenuItem
                    className="filter-dropdown-item-spacing"
                    key={t.name}
                >
                    {t.name}
                </DropdownMenuItem>
            ))}
        </>
    );
};
