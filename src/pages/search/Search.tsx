import FilterSection from "@/components/filter/FilterSection";
import { Outlet } from "react-router";

const Search = () => {
    return (
        <div className="mt-[125px] flex-1">
            <FilterSection />
            <Outlet />
        </div>
    );
};

export default Search;
