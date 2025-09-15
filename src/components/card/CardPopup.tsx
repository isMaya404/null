import { cn } from "@/lib/utils/cn";
import { getCurrentSeason, getSeasonFromMonthNumber } from "@/lib/utils/dates";
import { JSX } from "react";

const CardPopup = ({
    media,
    popupSide,
}: {
    media: NonNullableMedia;
    popupSide: "left" | "right";
    className?: string;
}) => {
    return (
        <div
            className={cn(
                popupSide === "left" ? "right-[110%]" : "left-[110%]",
                "flex flex-col justify-evenly align-center card-popup-anim absolute top-[1rem] z-10 bg-white dark:bg-sec p-4 rounded-lg shadow-md h-[170px] w-[320px]",
            )}
        >
            {/* Card popup contents */}
            <div className="flex justify-between">
                {formatAiringDateTime(media) ?? "Unknown airing date"}
                <div>{media.averageScore ? `${media.averageScore}%` : ""}</div>
            </div>

            <div className="flex flex-col gap-2 text-14-normal">
                <div className="text-12-normal">
                    {media.studios?.nodes?.[0]?.name}
                </div>{" "}
                <div className="text-12-normal">
                    {media.format === "TV" ? "TV Show" : media.format}
                    {media.episodes
                        ? media.episodes === 1
                            ? ` · ${media.episodes} episode`
                            : ` · ${media.episodes} episodes`
                        : ""}
                </div>
            </div>

            <div className="flex gap-2 text-12-normal truncate">
                {getGenres(media)}
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

function getGenres(media: NonNullableMedia) {
    return (
        media.genres?.reduce((acc, g) => {
            if (acc.length >= 3) return acc;
            if (g === null) return acc;
            acc.push(
                <div key={g} className="border border-ring rounded-xl p-2 py-1">
                    {g}
                </div>,
            );
            return acc;
        }, [] as JSX.Element[]) ?? []
    );
}

export function formatAiringDateTime(
    media: NonNullableMedia,
    date: Date = new Date(),
): string | undefined {
    const timeUntilAiringInSeconds =
        media?.nextAiringEpisode?.timeUntilAiring ?? null;

    const episode = media?.nextAiringEpisode?.episode ?? null;

    const start = media?.startDate ?? {};
    const end = media?.endDate ?? {};

    const startYear = start.year;
    const endYear = end.year;
    const startMonth = start.month;
    const endMonth = end.month;
    // const startDay = start.day ?? null;
    const endDay = end.day ?? null;

    const SECONDS_IN_A_DAY = 86400;
    const SECONDS_IN_AN_HOUR = 3600;

    const formatSeasonString = (s: string): string => {
        return `${s[0]}${s.slice(1).toLowerCase()}`;
    };
    // Upcoming series
    const isUpcomingRelease =
        startYear != null &&
        startMonth != null &&
        (startYear > date.getFullYear() ||
            (startYear === date.getFullYear() &&
                startMonth > date.getMonth() + 1));
    if (isUpcomingRelease) {
        return `${formatSeasonString(getSeasonFromMonthNumber(startMonth))} ${startYear}`;
    }

    // Countdown of currently airing series in current season
    // Or long running series that's been airing for a long time but is still unfinished,
    // as of 2025 Aug 31, an example would be One Piece
    const isCurrentSeasonRelease =
        startMonth != null &&
        getSeasonFromMonthNumber(startMonth) === getCurrentSeason() &&
        startYear === date.getFullYear();

    const hasEndDate = endYear != null || endMonth != null || endDay != null;
    const longRunningSeries = !hasEndDate;

    if (
        timeUntilAiringInSeconds != null &&
        (isCurrentSeasonRelease || longRunningSeries)
    ) {
        if (timeUntilAiringInSeconds >= SECONDS_IN_A_DAY) {
            const days = Math.floor(
                timeUntilAiringInSeconds / SECONDS_IN_A_DAY,
            );
            // format example: Ep 7 airing in 8 days
            return `Ep ${episode} airing in ${days} days`;
        }
        const hours = Math.floor(timeUntilAiringInSeconds / SECONDS_IN_AN_HOUR);

        // format example: Ep 9 airing in 4 hours
        return `Ep ${episode} airing in ${hours} hours`;
    }

    // Finished series
    if (startYear && endYear && startMonth && endMonth) {
        const diffYears = endYear - startYear;
        const diffMonths = endMonth - startMonth;

        // media aired within multiple years
        // format example: 2011 - 2014
        if (diffYears > 1) return `${startYear} - ${endYear}`;

        // media aired within multiple months
        // format example: Winter - Spring 2005
        if (diffMonths > 4 && startYear === endYear)
            return `${formatSeasonString(getSeasonFromMonthNumber(startMonth))} - ${formatSeasonString(getSeasonFromMonthNumber(endMonth))} ${startYear}`;

        // media aired within a single season (most anime air like this)
        // format example: Fall 2025
        if (diffMonths < 4 && startYear === endYear) {
            return `${formatSeasonString(getSeasonFromMonthNumber(startMonth))} ${startYear}`;
        }
    }

    // fallback
    if (startYear && startMonth) {
        return `${formatSeasonString(getSeasonFromMonthNumber(startMonth))} ${startYear}`;
    }

    return undefined;
}

export default CardPopup;
