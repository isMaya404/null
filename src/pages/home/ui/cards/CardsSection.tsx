import Card from "@/components/Card";
import fetchHomePageData from "@/lib/anilist/api";
import { useSuspenseQuery } from "@tanstack/react-query";
import type { TrendingMedia } from "@/types/media";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const CardsSection = () => {
  const { data, error, isFetching } = useSuspenseQuery({
    queryKey: ["hero-data"],
    queryFn: fetchHomePageData,
  });

  let media = (data?.trending?.media ?? []).filter(
    (m): m is TrendingMedia & { id: number } => !!m
  );

  if (error && !isFetching) throw error;
  if (!media.length)
    return (
      <div className="flex h-72 items-center justify-center">
        No anime banner found.
      </div>
    );

  // INFO: sizes matches taildwind's breakpoints
  const isMD = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
  const isLG = useMediaQuery("(min-width: 1024px) and (max-width: 1279px)");

  media = isMD ? media.slice(0, 4) : isLG ? media.slice(0, 5) : media;

  return (
    <div className="mx-auto max-w-[1550px] container-px mb-6">
      <div className="flex-between flex pb-4">
        <h4 className="text-20-semibold">TRENDING NOW</h4>{" "}
        <p className="text-14-normal">View All</p>
      </div>

      <div className="grid justify-items-center  gap-x-4 sm:gap-x-6 lg:gap-x-8 gap-y-10 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {media.map((m) => (
          <Card
            key={m?.id}
            id={m?.id}
            title={m?.title?.romaji ?? m?.title?.english ?? "Untitled"}
            // TODO: use a real fallback img
            coverImage={m?.coverImage?.extraLarge ?? "/fallback.jpg"}
            className=""
          />
        ))}
      </div>
    </div>
  );
};

export default CardsSection;
