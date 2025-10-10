import { FilterDropdownMenu } from "./FilterDropDownMenu";
import { FilterDropdownMenuItem } from "./FilterDropdownMenuItem";
import { MediaFormat } from "@/lib/anilist/gql/graphql";

const Format = () => {
    return (
        <FilterDropdownMenu dropdownType="format">
            {Object.keys(MediaFormat).map((format) => (
                <FilterDropdownMenuItem
                    key={format}
                    filterKey="format"
                    value={format}
                />
            ))}
        </FilterDropdownMenu>
    );
};

export default Format;
