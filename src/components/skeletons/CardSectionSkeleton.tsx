import { Skeleton } from "@/components/ui/skeleton";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const CardSectionSkeleton = () => {
    const isMD = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
    const isLG = useMediaQuery("(min-width: 1024px) and (max-width: 1279px)");
    const length = isMD ? 4 : isLG ? 5 : 6;
    const media = Array.from({ length });
    return (
        <div className="mx-auto max-w-[1400px] container-px mb-[62px]">
            <div className="flex-between flex mb-4">
                <Skeleton className="h-6 w-30 rounded" />
                <Skeleton className="h-4 w-18 rounded" />
            </div>

            <div className="grid justify-items-center gap-x-6 sm:gap-x-8 lg:gap-x-10 gap-y-10 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {media.map((_: any, i: number) => (
                    <div key={i} className="w-full flex flex-col gap-2">
                        <div className="aspect-[3/4.1]">
                            <Skeleton className="w-full h-full rounded" />
                        </div>
                        <Skeleton className="h-3 w-full rounded" />
                        <Skeleton className="h-3 w-3/4 rounded" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CardSectionSkeleton;
