import { MediaSeason } from "@/lib/anilist/gql/graphql";
import { FilterDropdownMenu } from "./FilterDropDownMenu";
import { FilterDropdownMenuItem } from "./FilterDropdownMenuItem";

const Season = () => {
    return (
        <FilterDropdownMenu dropdownType="season">
            {Object.keys(MediaSeason).map((season) => (
                <FilterDropdownMenuItem
                    key={season}
                    filterKey="season"
                    value={season}
                />
            ))}
        </FilterDropdownMenu>
    );
};

export default Season;
