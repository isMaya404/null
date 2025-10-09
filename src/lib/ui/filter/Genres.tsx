import { getAniListGenreAndTagData } from "@/lib/anilist/api";
import { DropdownMenuItem } from "@/lib/ui/dropdown";
import { useSuspenseQuery } from "@tanstack/react-query";
import { AnilistGenreAndTagCollectionQuery } from "@/lib/anilist/gql/graphql";
import { BaseFilterDropdown, FilterDropdownItem } from "./BaseFilterDropDown";
import { useMemo } from "react";

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

    // const { filters, setFilters } = useFilters();

    // create a set for 0(1) lookup
    // const genreSet = useMemo(
    //     () => new Set(filters.genres ?? []),
    //     [filters.genres],
    // );
    // const tagSet = useMemo(() => new Set(filters.tags ?? []), [filters.tags]);
    //
    // const handleToggle = useCallback(
    //     (g: string) => {
    //         setFilters((prev) => ({
    //             ...prev,
    //             genres: toggleArrItem(prev.genres, g),
    //         }));
    //     },
    //     [setFilters],
    // );

    if (error && !isFetching) throw error;
    if (nonNullGenres.length === 0 || nonNullTags.length === 0)
        return <div className="text-center text-20-bold">No Results</div>;

    return (
        <>
            <DropdownMenuItem className="text-16-medium" disabled>
                GENRES
            </DropdownMenuItem>

            {nonNullGenres.map((g) => (
                <FilterDropdownItem key={g} filterKey="genres" value={g} />
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

// hoist icon
// const CheckIcon = <Check className="text-white !h-3 !w-3" />;
//
// const GenreItem = ({
//     g,
//     onClick,
//     active,
// }: {
//     g: string;
//     onClick: () => void;
//     active: boolean;
// }) => (
//     <DropdownMenuItem
//         className="flex-between filter-dropdown-item-spacing"
//         onClick={onClick}
//     >
//         {g}
//         {active && (
//             <div className="flex-center bg-accent rounded-full p-[2px]">
//                 {/* idk why size prop does not work atp,  */}
//                 {/* so I'm using rasses for now */}
//                 {CheckIcon}
//             </div>
//         )}
//     </DropdownMenuItem>
// );
