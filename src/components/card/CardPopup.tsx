import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils/cn";
import type { Media } from "@/types/media";

// NOTE:
// Dynamic airing date/time value that needs to displayed inside the popup
// depending if the anime is currently airing or has already aired or upcoming.

// if already aired:
// when an anime aired within multiple years then, start year - end year (e.g 2011 - 2014)
// aired in a single season then, season year (e.g Fall 2022)

// if currently airing this season:
// days left until and what ep is it (e.g Ep 9 is airing in 5 days)
// hours left until and what ep is it (e.g Ep 5 is airing in 2 hours)

// if will be aired then, season year (e.g Fall 2022)

const CardPopup = ({
    media,
    popupSide,
}: {
    media: Media;
    popupSide: "left" | "right";
    className?: string;
}) => {
    const numberOfDaysLeft = Math.floor(
        (media?.nextAiringEpisode?.timeUntilAiring ?? 0) / 86400,
    );
    const isLgAndUp = useMediaQuery("(min-width: 1024px)");
    return (
        <div
            className={cn(
                popupSide === "left" ? "right-[110%]" : "left-[110%]",
                "flex flex-col justify-evenly align-center card-popup-anim absolute top-[1rem] z-10 bg-white dark:bg-sec p-4 rounded-lg shadow-md h-[170px] w-[320px]",
            )}
        >
            {/* Card popup contents */}
            <div className="flex justify-between text-16-medium">
                <div>
                    Ep airing in{" "}
                    {/* timeUntilAiring is in seconds so it's divided by 86400, the num of seconds in a day, */}
                    {/* then flooring it getting only a whole number number of days */}
                    {Math.floor(
                        (media?.nextAiringEpisode?.timeUntilAiring ?? 0) /
                            86400,
                    )}
                </div>{" "}
                <div>86%</div>
            </div>

            <div className="flex flex-col gap-2 text-14-normal">
                <div>CloverWorks</div> <div>TV SHOW - 12 episodes</div>
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
                    "absolute top-6 w-0 h-0 border-y-10 border-y-transparent",
                )}
            ></div>
        </div>
    );
};

export default CardPopup;
