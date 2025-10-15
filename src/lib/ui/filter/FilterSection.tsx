import Genres from "./Genres.tsx";
import Search from "./Search";
import Year from "./Year";
import Season from "./Season";
import Format from "./Format";
import AiringStatus from "./AiringStatus";

const FilterSection = () => {
    return (
        <div className="max-w-[1400px] mx-auto container-px grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 place-items-center mb-[60px] gap-x-6 gap-y-4">
            <Search />
            <Genres />
            <Year />
            <Season />
            <Format />
            <AiringStatus />
        </div>
    );
};

export default FilterSection;
