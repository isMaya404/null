import { MediaSort, MediaType } from "@/lib/anilist/gql/graphql";
import { getCurrentSeason, getNextSeason } from "@/lib/utils/dates";

import DefaultCardsSection from "@/components/card/DefaultCardsSection";
import DefaultCardSectionSkeleton from "@/lib/ui/card/section/DefaultCardSectionSkeleton";
import FilteredCardsSection from "@/components/card/FilteredCardSection.tsx";
import FilteredCardSectionSkeleton from "@/lib/ui/card/section/FilteredCardSectionSkeleton";
import PersistSuspense from "@/components/PersistSuspense";

import useFilters from "@/hooks/useFilters";
import { Suspense, useEffect } from "react";

const AnimeSearch = () => {
    const { filters } = useFilters();
    const hasFiltersApplied = Object.values(filters).some((f) => {
        if (Array.isArray(f)) return f.length > 0;
        return Boolean(f);
    });

    useEffect(() => {
        console.log({ ...filters });
    }, [filters]);

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
                    <FilteredCardsSection
                        props={{
                            type: MediaType.Anime,
                            sort: [MediaSort.PopularityDesc],
                            ...filters,
                        }}
                    />
                </Suspense>
            )}
        </>
    );
};

export default AnimeSearch;
