import clsx from "clsx";
import DetailsBtn from "./sub/DetailsBtn";
import BookmarkBtn from "./sub/BookmarkBtn";
// import Debug from "./Debug";
import {
    useIsDesktop,
    useIsMobile,
    useMediaQuery,
} from "@/hooks/useMediaQuery.ts";
import useCooldown from "@/hooks/useCooldown";
import { useEffect, useRef, useState, useMemo } from "react";
import DarkOverlay from "./sub/DarkOverlay";
import MobileLayout from "./MobileLayout";
import LgScreenLayout from "./LgScreenLayout";
import { useSuspenseQuery } from "@tanstack/react-query";
import fetchHomePageData from "@/lib/anilist/api";

const NEXT_INTERVAL_MS = 10000;

const Hero = () => {
    const { data, error, isFetching } = useSuspenseQuery({
        queryKey: ["hero-data"],
        queryFn: fetchHomePageData,
        meta: { persist: true },
    });

    const media = data?.popular?.media ?? [];
    if (error && !isFetching) throw error;
    if (!media.length)
        return (
            <div className="flex h-72 items-center justify-center">
                No anime banner found.
            </div>
        );

    // prevent rapid next/prev clicks
    const canTrigger = useCooldown(450); // ms

    // screen sizes
    const isTabletAndUp = useMediaQuery("(min-width: 640px)");
    const isMobile = useIsMobile();

    const [index, setIndex] = useState(0);
    const [prevIndex, setPrevIndex] = useState<number | null>(null);
    const [direction, setDirection] = useState<"next" | "prev">("next");

    const [bookmarks, setBookmarks] = useState<Record<string, boolean>>({});
    const isBookmarked = bookmarks[`bookmark-${index}`] ?? false;

    const toggleBookmark = (id: string) => {
        setBookmarks((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const timeRef = useRef<NodeJS.Timeout | null>(null);
    const [showTransition, setShowTransition] = useState(false);

    const autoNextSlide = () => {
        if (timeRef.current) clearInterval(timeRef.current);
        timeRef.current = setInterval(() => {
            setShowTransition(true);
            setDirection("next");
            setIndex((i) => {
                setPrevIndex(i);
                return (i + 1) % media.length;
            });
        }, NEXT_INTERVAL_MS);
    };

    useEffect(() => {
        autoNextSlide();
        return () => {
            clearInterval(timeRef.current!);
        };
    }, []);

    const prev = () => {
        if (!canTrigger()) return;
        setShowTransition(true);
        setPrevIndex(index);
        setDirection("prev");
        setIndex((i) => (i - 1 + media.length) % media.length);
        autoNextSlide();
    };

    const next = () => {
        if (!canTrigger()) return;
        setShowTransition(true);
        setPrevIndex(index);
        setDirection("next");
        setIndex((i) => (i + 1) % media.length);
        autoNextSlide();
    };

    const filteredGenres = useMemo(
        () => media[index]?.genres?.filter((g) => typeof g === "string") ?? [],
        [media[index]]
    );
    return (
        <div className={clsx("h-92 relative")}>
            <div className="relative h-72 overflow-hidden">
                {/* <Debug index={index} totalIndex={media.length} /> */}

                {media.length > 0 && (
                    <>
                        {/* Outgoing Slide */}
                        {prevIndex !== null && (
                            <div
                                key={`prev-${media[prevIndex]?.id}`}
                                className={clsx(
                                    showTransition &&
                                        direction === "prev" &&
                                        "animate-slide-out-right",
                                    showTransition &&
                                        direction === "next" &&
                                        "animate-slide-out-left",
                                    isTabletAndUp
                                        ? "right-0 inset-y-0"
                                        : "inset-0",
                                    "h-full w-full absolute z-10 transition-width ease-in-out duration-300"
                                )}
                            >
                                <img
                                    src={media[prevIndex]?.bannerImage ?? ""}
                                    alt={
                                        media[prevIndex]?.title?.english ??
                                        "Previous anime banner"
                                    }
                                    draggable="false"
                                    className="w-full h-full object-cover select-none"
                                />
                            </div>
                        )}
                        {/* Incoming Slide */}
                        <div
                            key={`curr-${media[index]?.id}`}
                            className={clsx(
                                showTransition &&
                                    direction === "next" &&
                                    "animate-slide-in-right",
                                showTransition &&
                                    direction === "prev" &&
                                    "animate-slide-in-left",
                                isTabletAndUp ? "right-0 inset-y-0" : "inset-0",
                                "h-full w-full absolute z-10 transition-width ease-in-out duration-200"
                            )}
                            // onAnimationEnd={() => setPrevIndex(null)}
                        >
                            <img
                                src={media[index]?.bannerImage ?? ""}
                                alt={
                                    media[index]?.title?.english ??
                                    "Current anime banner"
                                }
                                draggable="false"
                                className="w-full h-full object-cover select-none"
                            />
                        </div>
                    </>
                )}

                {/* tablet width or wider */}
                {isTabletAndUp && (
                    <LgScreenLayout
                        title={
                            (media[index]?.title?.english ||
                                media[index]?.title?.romaji) ??
                            "No title found"
                        }
                        desc={
                            media[index]?.description ?? "No description found"
                        }
                        genres={filteredGenres}
                        index={index}
                        totalIndex={media.length}
                        prev={prev}
                        next={next}
                    />
                )}

                <DarkOverlay />
            </div>

            {/* INFO: is sibling to slides container to
      have a higher context position. */}
            {isMobile && (
                <MobileLayout
                    index={index}
                    mediaLength={media.length}
                    prev={prev}
                    next={next}
                    toggleBookmark={toggleBookmark}
                    isBookmarked={isBookmarked}
                    genres={filteredGenres}
                    title={
                        (media[index]?.title?.english ||
                            media[index]?.title?.romaji) ??
                        "No title found"
                    }
                />
            )}

            {useIsDesktop() && (
                <div className="absolute z-20 bottom-[60px] right-[20%] flex items-center gap-3">
                    <DetailsBtn className="h-12 w-39 font-bold text-lg text-white cursor-pointer " />
                    <BookmarkBtn
                        onClick={() => toggleBookmark(`bookmark-${index}`)}
                        isBookmarked={isBookmarked}
                    />
                </div>
            )}
        </div>
    );
};

export default Hero;
