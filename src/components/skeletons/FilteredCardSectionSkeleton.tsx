import { Skeleton } from "@/components/ui/skeleton";

const FilteredCardSectionSkeleton = ({ length = 6 }: { length: number }) => {
    const media = Array.from({ length });

    return (
        <div className="grid justify-items-center gap-x-6 sm:gap-x-8 lg:gap-x-10 gap-y-10 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {media.map((_, i) => (
                <div key={i} className="w-full flex flex-col gap-2">
                    <div className="aspect-[3/4.1] mb-[6px]">
                        <Skeleton className="w-full h-full rounded" />
                    </div>
                    <Skeleton className="h-3 w-full rounded" />
                    <Skeleton className="h-3 w-3/4 rounded" />
                </div>
            ))}
        </div>
    );
};

export default FilteredCardSectionSkeleton;
