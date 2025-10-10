import { FilterDropdownMenu } from "./FilterDropDownMenu";
import { FilterDropdownMenuItem } from "./FilterDropdownMenuItem";
import { MediaStatus } from "@/lib/anilist/gql/graphql";

const AiringStatus = () => {
    return (
        <FilterDropdownMenu dropdownType="airingStatus">
            {Object.keys(MediaStatus).map((status) => (
                <FilterDropdownMenuItem
                    key={status}
                    filterKey="airingStatus"
                    value={status}
                />
            ))}
        </FilterDropdownMenu>
    );
};

export default AiringStatus;
