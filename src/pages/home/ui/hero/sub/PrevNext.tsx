import { ChevronLeft, ChevronRight } from "lucide-react";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils/cn";

type PrevNext = {
  prev: () => void;
  next: () => void;
  index: number;
  totalIndex: number;
  className?: string;
};

const PrevNext = ({ prev, next, index, totalIndex, className }: PrevNext) => {
  const mobile = useIsMobile();

  const iconSize = !mobile ? 37 : 24;

  return (
    <div
      className={cn(
        mobile ? "w-35" : "w-45",
        "select-none flex items-center  justify-between gap-5 relative text-light dark:text-stone-300",
        className
      )}
    >
      <button
        onClick={prev}
        className="cursor-pointer dark:hover:text-white"
        aria-label="Previous slide"
      >
        <ChevronLeft size={iconSize} />
      </button>

      <div
        className={
          "flex items-center justify-center gap-3 absolute left-1/2 -translate-x-1/2"
        }
      >
        <span
          className={`${mobile ? "text-xl" : "text-2xl"} font-bold
          dark:text-white`}
        >
          {index + 1}
        </span>
        <span className="text-xl">/</span>
        <span className="mt-1 text-sm">{totalIndex}</span>
      </div>

      <button
        onClick={next}
        className="cursor-pointer dark:hover:text-white"
        aria-label="Next slide"
      >
        <ChevronRight size={iconSize} />
      </button>
    </div>
  );
};

export default PrevNext;
