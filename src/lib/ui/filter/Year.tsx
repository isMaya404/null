import { FilterDropdownMenu } from "./FilterDropDownMenu";
import { FilterDropdownMenuItem } from "./FilterDropdownMenuItem";

import { useMemo } from "react";

export default function Year() {
    const currentYear = new Date().getFullYear();

    const years = useMemo(
        () =>
            Array.from({ length: currentYear - 1940 + 1 }, (_, i) =>
                String(currentYear - i),
            ),
        [currentYear],
    );

    return (
        <FilterDropdownMenu dropdownType="year">
            {years.map((year) => (
                <FilterDropdownMenuItem
                    key={year}
                    filterKey="year"
                    value={year}
                />
            ))}
        </FilterDropdownMenu>
    );
}
