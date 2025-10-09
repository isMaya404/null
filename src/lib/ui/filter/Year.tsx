import { BaseFilterDropdown, FilterDropdownItem } from "./BaseFilterDropDown";
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
        <BaseFilterDropdown dropdownType="year">
            {years.map((year) => (
                <FilterDropdownItem key={year} filterKey="year" value={year} />
            ))}
        </BaseFilterDropdown>
    );
}
