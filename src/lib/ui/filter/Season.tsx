import { MediaSeason } from "@/lib/anilist/gql/graphql";
import { BaseFilterDropdown, FilterDropdownItem } from "./BaseFilterDropDown";

const Season = () => {
    return (
        <BaseFilterDropdown dropdownType="season">
            {Object.keys(MediaSeason).map((season) => (
                <FilterDropdownItem
                    key={season}
                    filterKey="season"
                    value={season}
                />
            ))}
        </BaseFilterDropdown>
    );
};

export default Season;
