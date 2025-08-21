import { Skeleton } from "../shadcn/skeleton";

const CardSkeleton = () => {
    return (
        <div className="w-full flex flex-col gap-2">
            <div className="aspect-[3/4.1] mb-[6px]">
                <Skeleton className="w-full h-full rounded" />
            </div>
            <Skeleton className="h-3 w-full rounded" />
            <Skeleton className="h-3 w-3/4 rounded" />
        </div>
    );
};

export default CardSkeleton;
