import { MediaSeason } from "@/lib/anilist/gql/graphql";
import { FilterDropdownMenu } from "./base/FilterDropDownMenu";
import { FilterDropdownMenuItem } from "./base/FilterDropdownMenuItem";
import { useState } from "react";
import searchSubstring from "@/lib/utils/searchSubtring";

const Season = () => {
    const [inputVal, setInputVal] = useState("");

    const filteredSeason = searchSubstring(Object.keys(MediaSeason), inputVal);

    return (
        <FilterDropdownMenu
            dropdownType="season"
            inputValue={inputVal}
            setInputValue={setInputVal}
        >
            {filteredSeason.map((season) => (
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
