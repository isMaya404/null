import Card from "./Card";
import AniListMediaData from "@/lib/anilist/api";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useEffect, useMemo, useRef, useState } from "react";
import CardPopup from "./CardPopup";

import type {
    MediaQuery,
    MediaQueryVariables,
} from "@/lib/anilist/gql/graphql";
import FilteredCardSectionSkeleton from "@/lib/ui/card/section/FilteredCardSectionSkeleton";

type FilteredCardsSectionProps = {
    props: MediaQueryVariables;
};

// FIX: skeletons for subsequent request not working
const FilteredCardsSection = ({ props }: FilteredCardsSectionProps) => {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        error,
        isFetchingNextPage,
        isFetching,
    } = useSuspenseInfiniteQuery<MediaQuery>({
        queryKey: ["search-media"],
        queryFn: ({ pageParam }) =>
            AniListMediaData({
                ...props,
                page: pageParam as number,
                perPage: 10,
            }),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            const info = lastPage?.Page?.pageInfo;
            if (!info?.hasNextPage || !info.currentPage) return undefined;
            return info.currentPage + 1;
        },
        meta: { persist: false },
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
            { rootMargin: "-100px" },
        );
        observer.observe(sentinelRef.current);
        return () => observer.disconnect();
    }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

    if (error) throw error;
    if (media.length === 0 && !isFetching && !isFetchingNextPage) {
        return <div className="text-center text-20-bold">No Results</div>;
    }

    return (
        <div className="mx-auto max-w-[1400px] container-px mb-[65px] card-section-grid">
            {media.map((m) => {
                const numberOfDaysLeft = Math.floor(
                    (m?.nextAiringEpisode?.timeUntilAiring ?? 0) / 86400,
                );

                return (
                    <div key={m.id} className="w-full relative">
                        {hasNextPage && isLgAndUp && hoveredId === m.id && (
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

            <div ref={sentinelRef} className="h-10" />
        </div>
    );
};

export default FilteredCardsSection;
