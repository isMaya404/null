import CardSkeleton from "../CardSkeleton";
import React from "react";

const FilteredCardSectionSkeleton = ({ length = 6 }: { length: number }) => {
    const media = Array.from({ length });

    return (
        <div className="mx-auto max-w-[1400px] container-px mb-[65px] card-section-grid">
            {media.map((_, i) => (
                <React.Fragment key={i}>
                    <CardSkeleton />
                </React.Fragment>
            ))}
        </div>
    );
};

export default FilteredCardSectionSkeleton;
