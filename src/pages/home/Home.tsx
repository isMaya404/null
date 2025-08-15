import PersistSuspense from "@/components/PersistSuspense";
import { Skeleton } from "@/components/ui/skeleton";
import Hero from "./ui/hero/Hero";
import CardsSection from "./ui/cards/CardsSection";
import CardSectionSkeleton from "./ui/skeleton/CardSectionSkeleton";
import Nav from "@/components/Navbar";
import { MediaSort, MediaType } from "@/lib/anilist/gql/graphql";
import {
    getCurrentSeason,
    getCurrentSeasonYear,
    getNextSeason,
} from "@/lib/utils/dates";

const Home = () => {
    const nextSeason = getNextSeason();

    return (
        <div className="flex-1">
            <Nav />

            <PersistSuspense
                fallback={<Skeleton className="w-full h-72 mb-20" />}
            >
                <Hero
                    perPage={10}
                    type={MediaType.Anime}
                    sort={[MediaSort.PopularityDesc]}
                />
            </PersistSuspense>

            <PersistSuspense fallback={<CardSectionSkeleton />}>
                <CardsSection
                    qk="trending-data"
                    sectionTitle="TRENDING NOW"
                    props={{
                        perPage: 6,
                        type: MediaType.Anime,
                        sort: [MediaSort.TrendingDesc],
                    }}
                />
            </PersistSuspense>

            <PersistSuspense fallback={<CardSectionSkeleton />}>
                <CardsSection
                    qk="popularThisSeason"
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

            <PersistSuspense fallback={<CardSectionSkeleton />}>
                <CardsSection
                    qk="upcomingNextSeason"
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

            {/* <PersistSuspense fallback={<CardSectionSkeleton />}> */}
            {/*     <CardsSection */}
            {/*         perPage={6} */}
            {/*         type={MediaType.Anime} */}
            {/*         sort={[MediaSort.TrendingDesc]} */}
            {/*     /> */}
            {/* </PersistSuspense> */}
            {/**/}
            {/* <PersistSuspense fallback={<CardSectionSkeleton />}> */}
            {/*     <CardsSection */}
            {/*         perPage={6} */}
            {/*         type={MediaType.Anime} */}
            {/*         sort={[MediaSort.TrendingDesc]} */}
            {/*     /> */}
            {/* </PersistSuspense> */}
        </div>
    );
};

export default Home;
