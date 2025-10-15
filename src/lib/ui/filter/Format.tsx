import { FilterDropdownMenu } from "./base/FilterDropDownMenu";
import { FilterDropdownMenuItem } from "./base/FilterDropdownMenuItem";
import { MediaFormat } from "@/lib/anilist/gql/graphql";
import { useState } from "react";
import searchSubstring from "@/lib/utils/searchSubtring";

const Format = () => {
    const [inputVal, setInputVal] = useState("");

    const filteredFormat = searchSubstring(Object.keys(MediaFormat), inputVal);

    return (
        <FilterDropdownMenu
            dropdownType="format"
            inputValue={inputVal}
            setInputValue={setInputVal}
        >
            {filteredFormat.map((format) => (
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
