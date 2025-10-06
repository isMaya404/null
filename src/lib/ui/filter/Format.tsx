import BaseFilterDropdown from "./BaseFilterDropDown";
import { DropdownMenuItem } from "@/lib/ui/dropdown";
import { MediaFormat } from "@/lib/anilist/gql/graphql";

const FORMAT_ITEMS: [MediaFormat, string][] = [
    [MediaFormat.Tv, "TV Show"],
    [MediaFormat.Movie, "Movie"],
    [MediaFormat.TvShort, "TV Short"],
    [MediaFormat.Special, "Special"],
    [MediaFormat.Ova, "OVA"],
    [MediaFormat.Ona, "ONA"],
    [MediaFormat.Music, "Music"],
    [MediaFormat.Manga, "Manga"],
    [MediaFormat.Novel, "Light Novel"],
    [MediaFormat.OneShot, "One Shot"],
];

const Format = () => {
    return (
        <BaseFilterDropdown dropdownType="format">
            {FORMAT_ITEMS.map(([format, item]) => (
                <DropdownMenuItem
                    className="filter-dropdown-item-spacing"
                    key={format}
                >
                    {item}
                </DropdownMenuItem>
            ))}
        </BaseFilterDropdown>
    );
};

export default Format;
