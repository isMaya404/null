import BaseFilterDropdown from "./BaseFilterDropDown";
import { DropdownMenuItem } from "@/lib/ui/dropdown";
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
        <BaseFilterDropdown dropdownType="airing-status">
            {STATUS_ITEMS.map(([status, items]) => (
                <DropdownMenuItem
                    className="filter-dropdown-item-spacing"
                    key={status}
                >
                    {items}
                </DropdownMenuItem>
            ))}
        </BaseFilterDropdown>
    );
};

export default AiringStatus;
