import Card from "./Card";
import AniListMediaData from "@/lib/anilist/api";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useState } from "react";
import CardPopup from "./CardPopup";

import type {
    AnilistMediaQuery,
    AnilistMediaQueryVariables,
} from "@/lib/anilist/gql/graphql";

type DefaultCardsSectionProps = {
    qk: string;
    sectionTitle?: string;
    props: AnilistMediaQueryVariables;
};

const DefaultCardsSection = ({
    qk,
    sectionTitle,
    props,
}: DefaultCardsSectionProps) => {
    const { data, error, isFetching } = useSuspenseQuery<AnilistMediaQuery>({
        queryKey: [qk],
        queryFn: () => AniListMediaData(props),
        meta: { persist: true },
    });

    let media =
        (data?.Page?.media ?? []).filter(
            (m): m is NonNullable<typeof m> => m !== null,
        ) ?? [];

    const [hoveredId, setHoveredId] = useState<number | null>(null);
    const isLgAndUp = useMediaQuery("(min-width: 1024px)");
    const [popupSide, setPopupSide] = useState<"left" | "right">("right");

    if (error && !isFetching) throw error;
    if (media.length === 0)
        return <div className="text-center text-20-bold">No Results</div>;

    const isMd = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
    const isLg = useMediaQuery("(min-width: 1024px) and (max-width: 1279px)");
    media = isMd ? media.slice(0, 4) : isLg ? media.slice(0, 5) : media;

    const mediaQueryPopupConstraint = useMediaQuery(
        "(min-width: 768px) and (max-width: 1622px)",
    );
    const handleMouseEnter = (e: React.MouseEvent<HTMLElement>, id: number) => {
        setHoveredId(id);

        const rect = e.currentTarget.getBoundingClientRect();
        const cardCenterX = rect.left + rect.width / 2;
        const screenXPercent =
            (mediaQueryPopupConstraint ? 0.55 : 0.8) * window.innerWidth;
        setPopupSide(cardCenterX <= screenXPercent ? "right" : "left");
    };

    return (
        <div className="mx-auto max-w-[1400px] container-px mb-[60px]">
            <div className="flex-between flex mb-4">
                <h4 className="text-18-bold">{sectionTitle}</h4>{" "}
                <p className="text-14-normal">View All</p>
            </div>

            <div className="card-section-grid">
                {media.map((m) => {
                    return (
                        <div key={m.id} className="relative w-full">
                            {isLgAndUp && hoveredId === m.id && (
                                <CardPopup media={m} popupSide={popupSide} />
                            )}

                            <Card
                                onMouseEnter={(e) => handleMouseEnter(e, m.id)}
                                onMouseLeave={() => setHoveredId(null)}
                                id={m.id}
                                title={
                                    m.title?.romaji ??
                                    m.title?.english ??
                                    undefined
                                }
                                coverImage={m.coverImage?.extraLarge}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default DefaultCardsSection;
