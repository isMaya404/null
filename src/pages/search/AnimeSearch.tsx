import { MediaSort, MediaType } from "@/lib/anilist/gql/graphql";
import { getCurrentSeason, getNextSeason } from "@/lib/utils/dates";

import DefaultCardsSection from "@/components/cards/DefaultCardsSection";
import { DefaultCardSectionSkeleton } from "@/components/skeletons/DefaultCardSectionSkeleton";
import PersistSuspense from "@/components/PersistSuspense";

import useFilters from "@/hooks/useFilters";
import FilteredCardsSection from "@/components/cards/FilteredCardSection";
import { useEffect } from "react";
import FilteredCardSectionSkeleton from "@/components/skeletons/FilteredCardSectionSkeleton";

const AnimeSearch = () => {
    const { filters } = useFilters();
    const hasFiltersApplied = Object.values(filters).some((f) => {
        if (Array.isArray(f)) return f.length > 0;
        return Boolean(f);
    });

    useEffect(() => {
        console.log({ ...filters });
    }, [filters]);

    const nextSeason = getNextSeason();

    return (
        <>
            {!hasFiltersApplied ? (
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
                                    season: nextSeason.season,
                                    seasonYear: nextSeason.year,
                                    sort: [MediaSort.PopularityDesc],
                                }}
                            />
                        </PersistSuspense>
                    </div>
                </>
            ) : (
                <PersistSuspense
                    fallback={<FilteredCardSectionSkeleton length={20} />}
                >
                    <FilteredCardsSection
                        props={{
                            type: MediaType.Anime,
                            sort: [MediaSort.PopularityDesc],
                            ...filters,
                        }}
                    />
                </PersistSuspense>
            )}
        </>
    );
};

export default AnimeSearch;
