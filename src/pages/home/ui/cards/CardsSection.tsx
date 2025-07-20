import Card from "@/components/Card";
import fetchHomePageData from "@/lib/anilist/api";
import { useSuspenseQuery } from "@tanstack/react-query";
import type { TrendingMedia } from "@/types/media";

const CardsSection = () => {
  const { data, error, isFetching } = useSuspenseQuery({
    queryKey: ["hero-data"],
    queryFn: fetchHomePageData,
  });

  const media = (data?.trending?.media ?? []).filter(
    (m): m is TrendingMedia & { id: number } => !!m
  );

  if (error && !isFetching) throw error;
  if (!media.length)
    return (
      <div className="flex h-72 items-center justify-center">
        No anime banner found.
      </div>
    );

  return (
    <div className="mx-auto max-w-[1550px] container-px">
      <div className="flex-between flex pb-4">
        <h4 className="text-xl font-extrabold md:text-2xl">Trending</h4>{" "}
        <p className="extra-bold">View All</p>
      </div>

      <div className="grid justify-items-center grid-cols-2 gap-x-4 sm:gap-x-6 gap-y-10 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6">
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
