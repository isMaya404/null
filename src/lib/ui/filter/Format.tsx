import { FilterDropdownItem, BaseFilterDropdown } from "./BaseFilterDropDown";
import { MediaFormat } from "@/lib/anilist/gql/graphql";

const Format = () => {
    return (
        <BaseFilterDropdown dropdownType="format">
            {Object.keys(MediaFormat).map((format) => (
                <FilterDropdownItem
                    key={format}
                    filterKey="format"
                    value={format}
                />
            ))}
        </BaseFilterDropdown>
    );
};

export default Format;
