import { useCallback, useMemo } from "react";
import { DropdownMenuItem } from "@/lib/ui/dropdown";
import { Check } from "lucide-react";
import { arrFilterSet, useFilters } from "@/stores/useFiltersStore";
import toggleArrItem from "@/lib/utils/toggleArrItem";

type FilterDropdownMenuItemProps<K extends keyof Filters> = {
    filterKey: K;
    value: string;
};

// hoist icon
const CheckIcon = <Check className="text-white !h-3 !w-3" />;

export const FilterDropdownMenuItem = <K extends keyof Filters>({
    filterKey,
    value,
}: FilterDropdownMenuItemProps<K>) => {
    const { filters, setFilters } = useFilters();

    const isArr = useMemo(
        () => arrFilterSet.has(filterKey as ArrayFilterKeys),
        [filterKey],
    );

    const active = useMemo(() => {
        if (isArr) {
            // make a set for O(1) lookup
            const filterSet = new Set(filters[filterKey]);
            return filterSet.has(value);
        }

        return filters[filterKey] === value;
    }, [filters, filterKey]);

    const handleToggle = useCallback(() => {
        setFilters((prev) => {
            const curr = prev[filterKey];
            const updated = isArr
                ? toggleArrItem(curr as string[] | undefined, value)
                : value === curr
                  ? undefined
                  : value;

            return { ...prev, [filterKey]: updated };
        });
    }, [filterKey, value, isArr]);

    return (
        <DropdownMenuItem
            className="flex-between filter-dropdown-item-spacing focus:bg-prim"
            onSelect={handleToggle}
        >
            {value}
            {active && (
                <div className="flex-center bg-accent rounded-full p-[2px]">
                    {CheckIcon}
                </div>
            )}
        </DropdownMenuItem>
    );
};
