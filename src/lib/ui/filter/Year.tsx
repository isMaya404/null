import searchSubstring from "@/lib/utils/searchSubtring";
import { useMemo, useState } from "react";
import { FilterDropdownMenu } from "./base/FilterDropDownMenu";
import { FilterDropdownMenuItem } from "./base/FilterDropdownMenuItem";

const CURRENT_YEAR = new Date().getFullYear();

export default function Year() {
    const [inputValue, setInputValue] = useState("");

    const filteredYears = useMemo(() => {
        const yearsArray = Array.from(
            { length: CURRENT_YEAR - 1940 + 1 },
            (_, i) => String(CURRENT_YEAR - i),
        );
        return searchSubstring(yearsArray, inputValue);
    }, [CURRENT_YEAR, inputValue]);

    return (
        <FilterDropdownMenu
            dropdownType="year"
            inputValue={inputValue}
            setInputValue={setInputValue}
        >
            {filteredYears.map((year) => (
                <FilterDropdownMenuItem
                    key={year}
                    filterKey="year"
                    value={year}
                />
            ))}
        </FilterDropdownMenu>
    );
}
