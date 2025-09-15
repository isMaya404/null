import Card from "./Card";
import AniListMediaData from "@/lib/anilist/api";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useEffect, useRef, useState } from "react";
import CardPopup from "./CardPopup";

import type {
    AnilistMediaQuery,
    AnilistMediaQueryVariables,
} from "@/lib/anilist/gql/graphql";
import FilteredCardSectionSkeleton from "@/lib/ui/card/section/FilteredCardSectionSkeleton";

const FilteredCardsSection = ({
    props,
}: {
    props: AnilistMediaQueryVariables;
}) => {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        error,
        isFetchingNextPage,
        isFetching,
    } = useSuspenseInfiniteQuery<AnilistMediaQuery>({
        queryKey: ["search-media", props],
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
        staleTime: 0,
    });

    const media =
        data?.pages
            .flatMap((page) => page.Page?.media ?? [])
            .filter((m): m is NonNullable<typeof m> => m != null) || [];

    if (error) throw error;
    if (media.length === 0 && !isFetching && !isFetchingNextPage) {
        return <div className="text-center text-20-bold">No Results</div>;
    }

    const [hoveredId, setHoveredId] = useState<number | null>(null);
    const isLgAndUp = useMediaQuery("(min-width: 1024px)");
    const [popupSide, setPopupSide] = useState<"left" | "right">("right");

    const mediaQueryPopupConstraint = useMediaQuery(
        "(min-width: 768px) and (max-width: 1622px)",
    );
    const handleMouseEnter = (e: React.MouseEvent<HTMLElement>, id: number) => {
        setHoveredId(id);

        const rect = e.currentTarget.getBoundingClientRect();
        const cardCenterX = rect.left + rect.width / 2;
        const screenXPercent = mediaQueryPopupConstraint
            ? 0.55
            : 0.8 * window.innerWidth;
        setPopupSide(cardCenterX <= screenXPercent ? "right" : "left");
    };

    const sentinelRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!sentinelRef.current) return;
        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (
                    hasNextPage &&
                    entry.isIntersecting &&
                    !isFetchingNextPage
                ) {
                    fetchNextPage();
                }
            },
            { rootMargin: "-100px" },
        );
        observer.observe(sentinelRef.current);
        return () => observer.disconnect();
    }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

    return (
        <>
            <div className="mx-auto max-w-[1400px] container-px mb-[65px] card-section-grid">
                {media.map((m) => (
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
                ))}

                {isFetchingNextPage && (
                    <FilteredCardSectionSkeleton length={10} />
                )}
                <div ref={sentinelRef} className="h-10" />
            </div>
        </>
    );
};

export default FilteredCardsSection;
