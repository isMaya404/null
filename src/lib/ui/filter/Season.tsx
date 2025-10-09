import { MediaSeason } from "@/lib/anilist/gql/graphql";
import { BaseFilterDropdown, FilterDropdownItem } from "./BaseFilterDropDown";

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
                <FilterDropdownItem
                    key={season}
                    filterKey="season"
                    value={item}
                />
            ))}
        </BaseFilterDropdown>
    );
};

export default Season;
