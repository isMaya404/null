import { useHeroStore } from "@/stores/useHeroStore";
import removeBrTags from "@/lib/utils/removeBrTags";
import PrevNext from "./sub/PrevNext";
import DetailsBtn from "./sub/DetailsBtn";
import BookmarkBtn from "./sub/BookmarkBtn";
import { useIsDesktop, useIsTablet } from "@/hooks/useMediaQuery";

type LgScreenProps = {
    title: string;
    desc: string;
    genres: string[];
    index: number;
    totalIndex: number;
    prev: () => void;
    next: () => void;
};

const LgScreenLayout = ({
    title,
    desc,
    genres,
    index,
    totalIndex,
    prev,
    next,
}: LgScreenProps) => {
    const isBookmarked = useHeroStore((s) =>
        s.isBookmarked(`bookmark-${index}`),
    );
    const toggleBookmark = useHeroStore((s) => s.toggleBookmark);

    const tablet = useIsTablet();
    const desktop = useIsDesktop();

    const titleSize = desktop ? "text-3xl" : "text-2xl";

    const shortenedGenres = genres.slice(0, 3);
    const truncatedGenres =
        shortenedGenres.length === genres.length
            ? genres.join(", ")
            : shortenedGenres.join(", ") + "...";
    return (
        <>
            <div
                key={`slide-details-${index}`}
                className={
                    "absolute z-[12] w-full flex justify-between items-end pr-4 pl-8 bottom-8"
                }
            >
                <div className="text-light">
                    <div
                        className={`hero-text-anim ${titleSize} font-extrabold select-none`}
                    >
                        {title}
                    </div>

                    <div className="select-none hero-text-anim mt-2 font-semibold">
                        {tablet ? truncatedGenres : genres.join(", ")}
                    </div>

                    {desktop && (
                        <div
                            className="select-none hero-text-anim description-clamp-3 mt-5 h-15 w-140 text-sm dark:text-zinc-200"
                            // rm br tags because anilist returns too
                            // many br for this specific layout usecase
                            dangerouslySetInnerHTML={{
                                __html: removeBrTags(desc),
                            }}
                        />
                    )}

                    {tablet && (
                        <div className="mt-5 flex items-center gap-4">
                            <DetailsBtn className="h-11 w-30 font-bold text-lg text-white cursor-pointer " />
                            <BookmarkBtn
                                onClick={() =>
                                    toggleBookmark(`bookmark-${index}`)
                                }
                                isBookmarked={isBookmarked}
                            />
                        </div>
                    )}
                </div>

                <PrevNext
                    prev={prev}
                    next={next}
                    index={index}
                    totalIndex={totalIndex}
                />
            </div>
        </>
    );
};

export default LgScreenLayout;
