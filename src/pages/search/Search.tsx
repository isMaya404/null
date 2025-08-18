import FilterSection from "@/components/FilterSection";
import { Outlet } from "react-router";

const Search = () => {
    return (
        <div className="mt-[125px]">
            <FilterSection />
            <Outlet />
        </div>
    );
};

export default Search;
