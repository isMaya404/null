import { MediaSeason } from "@/lib/anilist/gql/graphql";
import BaseFilterDropdown from "./BaseFilterDropDown";
import { DropdownMenuItem } from "@/lib/ui/dropdown";

const SEASON_ITEMS: [MediaSeason, string][] = [
    [MediaSeason.Winter, "Winter"],
    [MediaSeason.Spring, "Spring"],
    [MediaSeason.Summer, "Summer"],
    [MediaSeason.Fall, "Fall"],
];

const Season = () => {
    return (
        <BaseFilterDropdown dropdownType="season">
            {SEASON_ITEMS.map(([season, item]) => (
                <DropdownMenuItem
                    className="filter-dropdown-item-spacing"
                    key={season}
                >
                    {item}
                </DropdownMenuItem>
            ))}
        </BaseFilterDropdown>
    );
};

export default Season;
