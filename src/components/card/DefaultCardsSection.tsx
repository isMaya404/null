import Card from "./Card";
import fetchHomePageData from "@/lib/anilist/api";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useState } from "react";
import { cn } from "@/lib/utils/cn";
// import CardPopup from "@/components/CardPopup";
import type {
    HomePageQuery,
    HomePageQueryVariables,
} from "@/lib/anilist/gql/graphql";
import CardPopup from "./CardPopup";

type DefaultCardsSectionProps = {
    qk: string;
    sectionTitle?: string;
    props: HomePageQueryVariables;
};

const DefaultCardsSection = ({
    qk,
    sectionTitle,
    props,
}: DefaultCardsSectionProps) => {
    const { data, error, isFetching } = useSuspenseQuery<HomePageQuery>({
        queryKey: [qk],
        queryFn: () => fetchHomePageData(props),
        meta: { persist: true },
    });

    let media =
        (data?.Page?.media ?? []).filter(
            (m): m is NonNullable<typeof m> => m !== null
        ) ?? [];

    const [hoveredId, setHoveredId] = useState<number | null>(null);
    const isLgAndUp = useMediaQuery("(min-width: 1024px)");
    const [popupSide, setPopupSide] = useState<"left" | "right">("right");

    if (error && !isFetching) throw error;
    if (media.length === 0)
        return <div className="text-center text-20-bold">No Results</div>;

    const handleMouseEnter = (e: React.MouseEvent<HTMLElement>, id: number) => {
        setHoveredId(id);

        const rect = e.currentTarget.getBoundingClientRect();
        const cardCenterX = rect.left + rect.width / 2;
        const screenFiftyFivePercentX = 0.55 * window.innerWidth;
        setPopupSide(cardCenterX <= screenFiftyFivePercentX ? "right" : "left");
    };

    const isMd = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
    const isLg = useMediaQuery("(min-width: 1024px) and (max-width: 1279px)");
    media = isMd ? media.slice(0, 4) : isLg ? media.slice(0, 5) : media;

    return (
        <div className="mx-auto max-w-[1400px] container-px mb-[60px]">
            <div className="flex-between flex mb-4">
                <h4 className="text-18-bold">{sectionTitle}</h4>{" "}
                <p className="text-14-normal">View All</p>
            </div>

            <div className="card-section-grid">
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
