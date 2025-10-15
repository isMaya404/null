import { getAniListGenreAndTagData } from "@/lib/anilist/api";
import { DropdownMenuItem } from "@/lib/ui/dropdown";
import { useSuspenseQuery } from "@tanstack/react-query";
import { AnilistGenreAndTagCollectionQuery } from "@/lib/anilist/gql/graphql";
import { FilterDropdownMenu } from "./base/FilterDropDownMenu";
import { FilterDropdownMenuItem } from "./base/FilterDropdownMenuItem";
import { useMemo } from "react";
import searchSubstring from "@/lib/utils/searchSubtring";

export default function Genres() {
    return (
        <FilterDropdownMenu dropdownType="genres">
            {(inputValue) => <GenreDropdownItems inputValue={inputValue} />}
        </FilterDropdownMenu>
    );
}

// useSuspenseQuery doesn't allow "enabled: some-condition" query opts like in
// useQuery which is to only exec the query on a condition. This is a hacky way
// to do that
const GenreDropdownItems = ({ inputValue }: { inputValue: string }) => {
    const { data, error, isFetching } =
        useSuspenseQuery<AnilistGenreAndTagCollectionQuery>({
            queryKey: ["anilist-genre-and-tag"],
            queryFn: getAniListGenreAndTagData,
            meta: { persist: true },
        });

    const filteredGenres = useMemo(() => {
        const nonNullGenres = (data.GenreCollection ?? []).filter(
            (g): g is string => g != null && g !== "Hentai",
        );

        return searchSubstring(nonNullGenres, inputValue);
    }, [data, inputValue]);

    const filteredTags = useMemo(() => {
        const nonNullTags = (data.MediaTagCollection ?? []).reduce<string[]>(
            (acc, tag) => {
                if (tag && tag.name && tag.isAdult !== true) {
                    acc.push(tag.name);
                }
                return acc;
            },
            [],
        );

        return searchSubstring(nonNullTags, inputValue);
    }, [data, inputValue]);

    if (error && !isFetching) throw error;
    if (!data)
        return <div className="text-center text-16-medium">No Results</div>;

    return (
        <>
            <DropdownMenuItem className="text-16-medium" disabled>
                GENRES
            </DropdownMenuItem>

            {filteredGenres.map((g) => (
                <FilterDropdownMenuItem key={g} filterKey="genres" value={g} />
            ))}

            <DropdownMenuItem className="text-16-medium" disabled>
                TAGS
            </DropdownMenuItem>

            {filteredTags.map((t) => (
                <FilterDropdownMenuItem key={t} filterKey="tags" value={t} />
            ))}
        </>
    );
};
