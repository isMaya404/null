import BaseFilterDropdown from "./BaseFilterDropDown";
import { DropdownMenuItem } from "@/lib/ui/dropdown";
import { JSX, useMemo } from "react";

const Year = () => {
    const currentYear = new Date().getFullYear();

    const memoizedYearItems = useMemo(() => {
        const years: JSX.Element[] = [];
        for (let i = currentYear; i >= 1940; i--) {
            years.push(
                <DropdownMenuItem
                    className="filter-dropdown-item-spacing"
                    key={i}
                >
                    {i}
                </DropdownMenuItem>,
            );
        }
        return years;
    }, [currentYear]);

    return (
        <BaseFilterDropdown dropdownType="year">
            {memoizedYearItems}
        </BaseFilterDropdown>
    );
};

export default Year;
