import Card from "./Card";
import fetchHomePageData from "@/lib/anilist/api";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useEffect, useRef, useState } from "react";
import CardPopup from "./CardPopup";

import type {
    HomePageQuery,
    HomePageQueryVariables,
} from "@/lib/anilist/gql/graphql";
import FilteredCardSectionSkeleton from "@/lib/ui/card/section/FilteredCardSectionSkeleton";

type FilteredCardsSectionProps = {
    props: HomePageQueryVariables;
};

// FIX: skeletons for subsequent request not working
const FilteredCardsSection = ({ props }: FilteredCardsSectionProps) => {
    // const stableProps = useMemo(() => props, [JSON.stringify(props)]);

    const {
        data,
        fetchNextPage,
        hasNextPage,
        error,
        isFetchingNextPage,
        isFetching,
    } = useSuspenseInfiniteQuery<HomePageQuery>({
        queryKey: ["search-media"],
        queryFn: ({ pageParam }) =>
            fetchHomePageData({
                ...props,
                page: pageParam as number,
                perPage: pageParam === 1 ? 20 : 6,
            }),
        initialPageParam: 0,
        getNextPageParam: (lastPage) => {
            const info = lastPage?.Page?.pageInfo;
            console.log("currentPage: ", info?.currentPage);
            return info?.hasNextPage ? (info.currentPage ?? 0) + 1 : undefined;
        },
        meta: { persist: false },
        // refetchOnMount: true,
        // staleTime: 0,
    });
    const media =
        data?.pages
            .flatMap((page) => page.Page?.media ?? [])
            .filter((m): m is NonNullable<typeof m> => m != null) || [];

    const [hoveredId, setHoveredId] = useState<number | null>(null);
    const isLgAndUp = useMediaQuery("(min-width: 1024px)");
    const [popupSide, setPopupSide] = useState<"left" | "right">("right");

    const handleMouseEnter = (e: React.MouseEvent<HTMLElement>, id: number) => {
        setHoveredId(id);

        const rect = e.currentTarget.getBoundingClientRect();
        const cardCenterX = rect.left + rect.width / 2;
        const screenFiftyFivePercentX = 0.55 * window.innerWidth;
        setPopupSide(cardCenterX <= screenFiftyFivePercentX ? "right" : "left");
    };

    const sentinelRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        if (!sentinelRef.current) return;
        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (entry.isIntersecting && !isFetchingNextPage) {
                    fetchNextPage();
                }
            },
            { rootMargin: "100px" }
        );
        observer.observe(sentinelRef.current);
        return () => observer.disconnect();
    }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

    if (error) throw error;
    if (media.length === 0 && !isFetching && !isFetchingNextPage) {
        return <div className="text-center text-20-bold">No Results</div>;
    }
    if (!hasNextPage) return;

    return (
        <div className="mx-auto max-w-[1400px] container-px mb-[65px] card-section-grid">
            {media.map((m) => {
                // Dynamic airing date/time value that needs to displayed inside the popup depending if the anime is currently airing or has already aired.
                // if aired within multiple years then, start year - end year (e.g 2011 - 2014)
                // if aired in a single season then, seeason year (e.g Fall 2022)
                // if will be aired in a month or more then, a normal date maybe? (e.g Airing on August 2, 2025)
                // hours left and what ep is it (e.g Ep 5 is airing in 2 hours)
                // days left and what ep is it (e.g Ep 9 is airing in 5 days)

                const numberOfDaysLeft = Math.floor(
                    (m?.nextAiringEpisode?.timeUntilAiring ?? 0) / 86400
                );

                return (
                    <div key={m.id} className="w-full relative">
                        {isLgAndUp && hoveredId === m.id && (
                            <CardPopup media={m} popupSide={popupSide} />
                        )}

                        <Card
                            onMouseEnter={(e) => handleMouseEnter(e, m.id)}
                            onMouseLeave={() => setHoveredId(null)}
                            id={m.id}
                            title={
                                m.title?.romaji ?? m.title?.english ?? undefined
                            }
                            coverImage={m.coverImage?.extraLarge}
                        />
                    </div>
                );
            })}

            {isFetchingNextPage && (
                <div className="card-section-grid">
                    <FilteredCardSectionSkeleton length={6} />
                </div>
            )}

            <div ref={sentinelRef} className="b h-10" />
        </div>
    );
};

export default FilteredCardsSection;
