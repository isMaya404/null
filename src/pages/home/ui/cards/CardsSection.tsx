import Card from "@/components/Card";
import fetchHomePageData from "@/lib/anilist/api";
import { useSuspenseQuery } from "@tanstack/react-query";
import type { TrendingMedia } from "@/types/media";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useState } from "react";
import { cn } from "@/lib/utils/cn";
import CardPopup from "@/components/CardPopup";

// NOTE: maybe props here for diff media.foo?
const CardsSection = () => {
    const { data, error, isFetching } = useSuspenseQuery({
        queryKey: ["home-data"],
        queryFn: fetchHomePageData,
        meta: { persist: true },
    });
    let media = (data?.trending?.media ?? []).filter(
        (m): m is TrendingMedia & { id: number } => !!m
    );

    const [hoveredId, setHoveredId] = useState<number | null>(null);

    if (error && !isFetching) throw error;
    if (!media.length)
        return (
            <div className="flex h-72 items-center justify-center">
                No anime banner found.
            </div>
        );

    const isLgAndUp = useMediaQuery("(min-width: 1024px)");

    const [popupSide, setPopupSide] = useState<"left" | "right">("right");

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
        <div className="mx-auto max-w-[1400px] container-px mb-6">
            <div className="flex-between flex pb-4">
                <h4 className="text-20-semibold">TRENDING NOW</h4>{" "}
                <p className="text-14-normal">View All</p>
            </div>

            <div className="grid justify-items-center gap-x-6 sm:gap-x-8 lg:gap-x-10 gap-y-10 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
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
                        <div key={m.id} className="relative">
                            {/* TODO: abstract card popup */}

                            {/* Card popup */}
                            {isLgAndUp && hoveredId === m.id && (
                                <div
                                    className={cn(
                                        popupSide === "left"
                                            ? "right-[110%]"
                                            : "left-[110%]",
                                        "flex flex-col justify-evenly align-center card-popup-anim absolute top-[1rem] z-10 bg-white dark:bg-sec p-4 rounded-lg shadow-md h-[170px] w-[320px]"
                                    )}
                                >
                                    {/* Card popup contents */}
                                    <div className="flex justify-between text-16-medium">
                                        <div>
                                            Ep airing in{" "}
                                            {/* timeUntilAiring is in seconds so it's divided by 86400, the num of seconds in a day, */}
                                            {/* then flooring it getting only a whole number number of days */}
                                            {Math.floor(
                                                (m?.nextAiringEpisode
                                                    ?.timeUntilAiring ?? 0) /
                                                    86400
                                            )}
                                        </div>{" "}
                                        <div>86%</div>
                                    </div>

                                    <div className="flex flex-col gap-2 text-14-normal">
                                        <div>CloverWorks</div>{" "}
                                        <div>TV SHOW - 12 episodes</div>
                                    </div>

                                    <div className="flex gap-2 text-14-normal">
                                        <div>foo</div> <div>bar</div>
                                        <div>foo</div>
                                    </div>

                                    {/* Card Popup tail */}
                                    <div
                                        className={cn(
                                            popupSide === "left"
                                                ? "-right-2 border-l-10 border-l-white dark:border-l-sec"
                                                : "-left-2 border-r-10 border-r-white dark:border-r-sec",
                                            "absolute top-6 w-0 h-0 border-y-10 border-y-transparent"
                                        )}
                                    ></div>
                                </div>
                            )}

                            <Card
                                onMouseEnter={(e) => handleMouseEnter(e, m.id)}
                                onMouseLeave={() => setHoveredId(null)}
                                id={m.id}
                                title={
                                    m.title?.romaji ??
                                    m.title?.english ??
                                    "Title not found"
                                }
                                coverImage={
                                    m.coverImage?.extraLarge ?? "/fallback.jpg"
                                }
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CardsSection;
