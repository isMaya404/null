import { FilterDropdownMenu } from "./base/FilterDropDownMenu";
import { FilterDropdownMenuItem } from "./base/FilterDropdownMenuItem";
import { MediaStatus } from "@/lib/anilist/gql/graphql";
import { useState } from "react";
import searchSubstring from "@/lib/utils/searchSubtring";

const AiringStatus = () => {
    const [inputVal, setInputVal] = useState("");

    const filteredAiringStatus = searchSubstring(
        Object.keys(MediaStatus),
        inputVal,
    );

    return (
        <FilterDropdownMenu
            dropdownType="airingStatus"
            inputValue={inputVal}
            setInputValue={setInputVal}
        >
            {filteredAiringStatus.map((status) => (
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
