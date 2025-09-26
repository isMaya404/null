import { ChevronDown } from "lucide-react";
import Genres from "./Genres";
import Search from "./Search";

const FilterSection = () => {
    return (
        <div className="max-w-[1400px] mx-auto container-px grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 place-items-center mb-[60px] gap-x-6 gap-y-4">
            <Search />
            <Genres />

            <div className="flex flex-col gap-2 w-full">
                <div className="">Year</div>
                <div className="border border-ring dark:border-0 flex flex-between py-3 px-4 rounded-sm dark:bg-sec h-[40px] w-full">
                    Any
                    <ChevronDown />
                </div>
            </div>

            <div className="flex flex-col gap-2 w-full">
                <div className="">Season</div>
                <div className="border border-ring dark:border-0 flex flex-between py-3 px-4 rounded-sm dark:bg-sec h-[40px] w-full">
                    Any
                    <ChevronDown />
                </div>
            </div>

            <div className="flex flex-col gap-2 w-full">
                <div className="">Format</div>
                <div className="border border-ring dark:border-0 flex flex-between py-3 px-4 rounded-sm dark:bg-sec h-[40px] w-full">
                    Any
                    <ChevronDown />
                </div>
            </div>

            <div className="flex flex-col gap-2 w-full">
                <div className="">Airing Status</div>
                <div className="border border-ring dark:border-0 flex flex-between py-3 px-4 rounded-sm dark:bg-sec h-[40px] w-full">
                    Any
                    <ChevronDown />
                </div>
            </div>
        </div>
    );
};

export default FilterSection;
