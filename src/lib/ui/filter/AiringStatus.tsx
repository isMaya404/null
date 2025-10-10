import { FilterDropdownItem, BaseFilterDropdown } from "./BaseFilterDropDown";
import { MediaStatus } from "@/lib/anilist/gql/graphql";

const AiringStatus = () => {
    return (
        <BaseFilterDropdown dropdownType="airingStatus">
            {Object.keys(MediaStatus).map((status) => (
                <FilterDropdownItem
                    key={status}
                    filterKey="airingStatus"
                    value={status}
                />
            ))}
        </BaseFilterDropdown>
    );
};

export default AiringStatus;
