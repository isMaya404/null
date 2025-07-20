import { Button } from "@/components/ui/button";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils/cn";

const BookmarkBtn = ({
  onClick,
  isBookmarked,
}: {
  onClick: () => void;
  isBookmarked: boolean;
}) => {
  return (
    <Button
      variant="default"
      size="icon"
      onClick={onClick}
      className={cn(
        useIsMobile() ? "h-10" : "h-11",
        "bg-accent text-light dark:bg-transparent dark:text-white dark:hover:text-accent dark:hover:bg-transparent w-12 cursor-pointer"
      )}
    >
      {isBookmarked ? (
        <BookmarkCheck
          className={`size-6 cursor-pointer fill-accent stroke-light dark:fill-none  dark:stroke-accent`}
        />
      ) : (
        <Bookmark
          className={`size-6 cursor-pointer
fill-current stroke-none
dark:fill-none dark:stroke-current`}
        />
      )}
    </Button>
  );
};
export default BookmarkBtn;
