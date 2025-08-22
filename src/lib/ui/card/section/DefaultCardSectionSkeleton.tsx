import { useMediaQuery } from "@/hooks/useMediaQuery";
import CardSkeleton from "../CardSkeleton";
import React from "react";
import { Skeleton } from "../../shadcn/skeleton";

const DefaultCardSectionSkeleton = () => {
    const isMD = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
    const isLG = useMediaQuery("(min-width: 1024px) and (max-width: 1279px)");
    const length = isMD ? 4 : isLG ? 5 : 6;
    const media = Array.from({ length });
    return (
        // NOTE: mb is higher than 5px than the actual DefaultCardSectionSkeleton mb-60px to match gap/spacing
        <div className="mx-auto max-w-[1400px] container-px mb-[65px]">
            <div className="flex-between flex mb-4">
                <Skeleton className="h-6 w-30 rounded" />
                <Skeleton className="h-4 w-18 rounded" />
            </div>

            <div className="card-section-grid">
                {media.map((_: any, i: number) => (
                    <React.Fragment key={i}>
                        <CardSkeleton />
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default DefaultCardSectionSkeleton;
