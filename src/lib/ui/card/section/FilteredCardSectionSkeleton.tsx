import CardSkeleton from "../CardSkeleton";
import React from "react";

const FilteredCardSectionSkeleton = ({ length = 6 }: { length: number }) => {
    const media = Array.from({ length });

    return (
        <div className="mx-auto max-w-[1400px] container-px mb-[65px] grid justify-items-center gap-y-10 gap-x-6 sm:gap-x-8 lg:gap-x-10  grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {media.map((_, i) => (
                <React.Fragment key={i}>
                    <CardSkeleton />
                </React.Fragment>
            ))}
        </div>
    );
};

export default FilteredCardSectionSkeleton;
