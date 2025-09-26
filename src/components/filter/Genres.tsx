import { Suspense, useMemo, useRef, useState } from "react";
import { getAniListGenreAndTagData } from "@/lib/anilist/api";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/filter/dropdown";
import { Button } from "@/lib/ui/shadcn/button";
import { ChevronDown } from "lucide-react";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { AnilistGenreAndTagCollectionQuery } from "@/lib/anilist/gql/graphql";
import useFilters from "@/hooks/useFilters";
import notNull from "@/lib/utils/notNull";

export default function Genres() {
    const [isInputFocused, setInputFocus] = useState(false);
    const [open, setOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);
    // const { filters, setFilters } = useFilters();

    // const { data, error, isFetching } =
    //     useSuspenseQuery<AnilistGenreAndTagCollectionQuery>({
    //         queryKey: ["anilist-genre-and-tag"],
    //         queryFn: () => getAniListGenreAndTagData(),
    //         meta: { persist: true },
    //     });
    //
    // const nonNullGenres = useMemo(
    //     () => (data?.GenreCollection ?? []).filter((g) => g !== null),
    //     [data],
    // );
    // const nonNullTags = useMemo(
    //     () => (data?.MediaTagCollection ?? []).filter((g) => g !== null),
    //     [data],
    // );
    //
    // if (error && !isFetching) throw error;
    // if (nonNullGenres.length === 0 || nonNullTags.length === 0)
    //     return <div className="text-center text-20-bold">No Results</div>;

    return (
        <div className="flex flex-col gap-2 w-full">
            <DropdownMenu open={open} onOpenChange={setOpen}>
                <label htmlFor="genres-input">Genres</label>
                <DropdownMenuTrigger
                    asChild
                    asControlled
                    // prevents input blur/losing focus so the "Any"
                    // placeholder wont flicker when clicking
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => {
                        document.activeElement !== inputRef.current &&
                            inputRef.current?.focus();
                        !open && setOpen(true);
                    }}
                >
                    <div className="border border-ring dark:border-0 flex items-center pr-2 rounded-sm dark:bg-sec h-[40px] w-full">
                        <input
                            ref={inputRef}
                            id="genres-input"
                            name="genres-input"
                            onClick={() => !open && setOpen(true)}
                            onFocus={() => setInputFocus(true)}
                            onBlur={() => setInputFocus(false)}
                            className="focus:outline-none h-full w-full pl-2 placeholder-muted-foreground"
                            placeholder={isInputFocused ? "" : "Any"}
                            type="text"
                        />
                        <Button
                            variant="minimal"
                            size="auto"
                            // prevents input blur so the "Any" placeholder
                            // wont flicker when clicking
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => {
                                document.activeElement !== inputRef.current &&
                                    inputRef.current?.focus();
                                setOpen(!open);
                            }}
                        >
                            <ChevronDown />
                        </Button>
                    </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent sideOffset={15}>
                    {open && (
                        <Suspense fallback={<div>Loading genres…</div>}>
                            <GenreDropdownItems />
                        </Suspense>
                    )}

                    {/* <Suspense fallback={<div>Loading genres…</div>}> */}
                    {/* <DropdownMenuItem disabled>Genre</DropdownMenuItem> */}
                    {/* {nonNullGenres.map((g) => ( */}
                    {/*     <DropdownMenuItem */}
                    {/*         onClick={() => */}
                    {/*             setFilters({ */}
                    {/*                 genres: [...(filters.genres || []), g], */}
                    {/*             }) */}
                    {/*         } */}
                    {/*         key={g} */}
                    {/*     > */}
                    {/*         {g} */}
                    {/*     </DropdownMenuItem> */}
                    {/* ))} */}
                    {/**/}
                    {/* <DropdownMenuItem disabled>Tags</DropdownMenuItem> */}
                    {/* {nonNullTags.map((t) => ( */}
                    {/*     <DropdownMenuItem key={t.name}> */}
                    {/*         {t.name} */}
                    {/*     </DropdownMenuItem> */}
                    {/* ))} */}
                    {/* </Suspense> */}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}

// useSuspenseQuery doesn't allow "enabled: some-condition" query opts like in
// useQuery which is to only exec the query on a condition. This is some sort of
// a way to do that.
const GenreDropdownItems = () => {
    const { data, error, isFetching } =
        useSuspenseQuery<AnilistGenreAndTagCollectionQuery>({
            queryKey: ["anilist-genre-and-tag"],
            queryFn: getAniListGenreAndTagData,
            meta: { persist: true },
        });

    const nonNullGenres = (data?.GenreCollection ?? []).filter(notNull);
    const nonNullTags = (data?.MediaTagCollection ?? []).filter(notNull);
    const { filters, setFilters } = useFilters();

    if (error && !isFetching) throw error;
    if (nonNullGenres.length === 0 || nonNullTags.length === 0)
        return <div className="text-center text-20-bold">No Results</div>;

    return (
        <>
            <DropdownMenuItem disabled>Genre</DropdownMenuItem>
            {nonNullGenres.map((g) => (
                <DropdownMenuItem
                    key={g}
                    onClick={() =>
                        setFilters({
                            genres: [...(filters.genres || []), g],
                        })
                    }
                >
                    {g}
                </DropdownMenuItem>
            ))}

            <DropdownMenuItem disabled>Tags</DropdownMenuItem>
            {nonNullTags.map((t) => (
                <DropdownMenuItem key={t.name}>{t.name}</DropdownMenuItem>
            ))}
        </>
    );
};
