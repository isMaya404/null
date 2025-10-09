import { FilterDropdownItem, BaseFilterDropdown } from "./BaseFilterDropDown";
import { MediaStatus } from "@/lib/anilist/gql/graphql";

const STATUS_ITEMS: [MediaStatus, string][] = [
    [MediaStatus.Releasing, "Airing"],
    [MediaStatus.Finished, "Finished"],
    [MediaStatus.NotYetReleased, "Not Yet Aired"],
    [MediaStatus.Cancelled, "Cancelled"],
    [MediaStatus.Hiatus, "On Hiatus"],
];

const AiringStatus = () => {
    return (
        <BaseFilterDropdown dropdownType="airingStatus">
            {STATUS_ITEMS.map(([status, items]) => (
                <FilterDropdownItem
                    key={status}
                    filterKey="airingStatus"
                    value={items}
                />
            ))}
        </BaseFilterDropdown>
    );
};

export default AiringStatus;
