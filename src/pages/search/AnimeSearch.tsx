import DefaultCardsSection from "@/lib/ui/cards/DefaultCardsSection";
import FilteredCardsSection from "@/lib/ui/cards/FilteredCardSection";
import DefaultCardSectionSkeleton from "@/lib/ui/skeletons/DefaultCardSectionSkeleton";
import FilteredCardSectionSkeleton from "@/lib/ui/skeletons/FilteredCardSectionSkeleton";

import PersistSuspense from "@/components/PersistSuspense";
import {
    AnilistMediaQueryVariables,
    MediaSort,
    MediaType,
} from "@/lib/anilist/gql/graphql";
import { getCurrentSeason, getNextSeason } from "@/lib/utils/dates";
import { Suspense, useEffect, useMemo } from "react";
import { useFilters } from "@/stores/useFiltersStore";
import { useDebouncedValue } from "@/hooks/useDebounce";

const AnimeSearch = () => {
    const { filters, hasFilters } = useFilters();

    // map filters to the correct anilist var args
    const anilistVars: AnilistMediaQueryVariables | undefined = useMemo(() => {
        if (!filters) return undefined;

        const vars: AnilistMediaQueryVariables = {};

        if (filters.search) vars.search = filters.search;
        if (filters.genres?.length) vars.genre_in = filters.genres;
        if (filters.tags?.length) vars.tag_in = filters.tags;
        if (filters.year) vars.seasonYear = Number(filters.year);
        if (filters.season) vars.season = filters.season;
        if (filters.format?.length) vars.format_in = filters.format;

        return vars;
    }, [filters]);

    const debouncedAnilistVars = useDebouncedValue(anilistVars, 100);

    //@tmp for debugging
    // useEffect(() => {
    //     console.log("anilist vars: ", anilistVars);
    // }, [anilistVars]);
    // useEffect(() => {
    //     console.log("filters: ", filters);
    // }, [filters]);
    // useEffect(() => {
    //     console.log(hasFilters);
    // }, [hasFilters]);

    return (
        <>
            {!hasFilters() ? (
                <>
                    <div>
                        <PersistSuspense
                            fallback={<DefaultCardSectionSkeleton />}
                        >
                            <DefaultCardsSection
                                qk="trending-data"
                                sectionTitle="TRENDING NOW"
                                props={{
                                    perPage: 6,
                                    type: MediaType.Anime,
                                    sort: [MediaSort.TrendingDesc],
                                }}
                            />
                        </PersistSuspense>

                        <PersistSuspense
                            fallback={<DefaultCardSectionSkeleton />}
                        >
                            <DefaultCardsSection
                                qk="popular-this-season"
                                sectionTitle="POPULAR THIS SEASON"
                                props={{
                                    type: MediaType.Anime,
                                    season: getCurrentSeason(),
                                    seasonYear: new Date().getFullYear(),
                                    sort: [MediaSort.PopularityDesc],
                                }}
                            />
                        </PersistSuspense>

                        <PersistSuspense
                            fallback={<DefaultCardSectionSkeleton />}
                        >
                            <DefaultCardsSection
                                qk="upcoming-next-season"
                                sectionTitle="UPCOMING NEXT SEASON"
                                props={{
                                    perPage: 6,
                                    type: MediaType.Anime,
                                    season: getNextSeason(),
                                    seasonYear: new Date().getFullYear(),
                                    sort: [MediaSort.PopularityDesc],
                                }}
                            />
                        </PersistSuspense>
                    </div>
                </>
            ) : (
                <Suspense
                    fallback={
                        <div className="mx-auto max-w-[1400px] container-px mb-[65px] card-section-grid">
                            <FilteredCardSectionSkeleton length={10} />
                        </div>
                    }
                >
                    <FilteredCardsSection {...debouncedAnilistVars} />
                </Suspense>
            )}
        </>
    );
};

export default AnimeSearch;
