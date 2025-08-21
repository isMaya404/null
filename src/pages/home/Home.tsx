import { Skeleton } from "@/lib/ui/shadcn/skeleton";
import { MediaSort, MediaType } from "@/lib/anilist/gql/graphql";
import { getCurrentSeason, getNextSeason } from "@/lib/utils/dates";

import FilterSection from "@/components/FilterSection";
import Hero from "./ui/hero/Hero";
import DefaultCardsSection from "@/components/card/DefaultCardsSection";
import DefaultCardSectionSkeleton from "@/lib/ui/card/section/DefaultCardSectionSkeleton";
import PersistSuspense from "@/components/PersistSuspense";

const Home = () => {
    const nextSeason = getNextSeason();

    return (
        <div className="flex-1">
            <PersistSuspense
                fallback={<Skeleton className="w-full h-72 mb-25" />}
            >
                <Hero
                    perPage={10}
                    type={MediaType.Anime}
                    sort={[MediaSort.PopularityDesc]}
                />
            </PersistSuspense>

            <FilterSection />

            <PersistSuspense fallback={<DefaultCardSectionSkeleton />}>
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

            <PersistSuspense fallback={<DefaultCardSectionSkeleton />}>
                <DefaultCardsSection
                    qk="popular-this-season"
                    sectionTitle="POPULAR THIS SEASON"
                    props={{
                        perPage: 6,
                        type: MediaType.Anime,
                        season: getCurrentSeason(),
                        seasonYear: new Date().getFullYear(),
                        sort: [MediaSort.PopularityDesc],
                    }}
                />
            </PersistSuspense>

            <PersistSuspense fallback={<DefaultCardSectionSkeleton />}>
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
    );
};

export default Home;
