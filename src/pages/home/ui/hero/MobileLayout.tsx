import { useIsMobile } from "@/hooks/useMediaQuery.ts";
import useIsDarkTheme from "@/hooks/useIsDarkTheme";
import { Button } from "@/components/ui/button";
import BookmarkBtn from "./sub/BookmarkBtn";
import PrevNext from "./sub/PrevNext";
import { cn } from "@/lib/utils/cn";

type MobileProps = {
  index: number;
  mediaLength: number;
  prev: () => void;
  next: () => void;
  toggleBookmark: (id: string) => void;
  isBookmarked: boolean;
  genres: string[];
  title: string;
};

const MobileLayout = ({
  index,
  mediaLength,
  prev,
  next,
  toggleBookmark,
  isBookmarked,
  genres,
  title,
}: MobileProps) => {
  const isDarkTheme = useIsDarkTheme();
  const isMobile = useIsMobile();

  if (!isMobile) return null;
  const shortenedGenres = genres.slice(0, 3);

  // if the length didnt change after slicing
  // display it normaly else put truncated notice "..."
  const displayGenres =
    shortenedGenres.length === genres.length
      ? genres.join(", ")
      : shortenedGenres.join(", ") + "...";

  return (
    <div
      key={`slide-details-${index}`}
      className="w-full h-30 absolute bottom-[60px] z-90 flex flex-col items-center justify-center gap-4"
    >
      <div className="text-light  w-full text-center">
        <div className="select-none animate-fade-scale-in mb-1 truncate justify-center gap-1 text-sm font-bold">
          {displayGenres}
        </div>

        <div className="select-none animate-fade-scale-in text-xl font-bold truncate px-2">
          {title}
        </div>
      </div>

      <div className="w-full flex items-center justify-between container-px">
        <div className="flex items-center">
          <Button
            variant="default"
            className="h-10 w-23 font-bold text-sm text-white cursor-pointer"
          >
            Details
          </Button>
          <BookmarkBtn
            onClick={() => toggleBookmark(`bookmark-${index}`)}
            isBookmarked={isBookmarked}
          />
        </div>

        <PrevNext
          prev={prev}
          next={next}
          index={index}
          totalIndex={mediaLength}
          // INFO: adjust pos on mobile light theme for visibility
          className={cn(isMobile && !isDarkTheme && "mb-6")}
        />
      </div>
    </div>
  );
};

export default MobileLayout;
