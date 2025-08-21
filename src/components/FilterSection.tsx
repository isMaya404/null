import { ChevronUp, ChevronDown, Search } from "lucide-react";
import useFilters from "@/hooks/useFilters";
import sanitizeInput from "@/lib/utils/sanitizeInput";
import { useNavigate, useLocation } from "react-router";
import { useEffect, useState } from "react";

const FilterSection = () => {
    const searchVal =
        new URLSearchParams(window.location.search).get("search") ?? undefined;
    const [search, setSearch] = useState<string | undefined>(searchVal);

    const navigate = useNavigate();
    const location = useLocation();
    const { filters, mergeFilters } = useFilters();

    // debounced search
    useEffect(() => {
        if (search == undefined) return;

        const handler = setTimeout(() => {
            const safeValue = sanitizeInput(search);

            if (!location.pathname.startsWith("/search")) {
                navigate("/search/anime");
            }

            mergeFilters({ search: safeValue || undefined });
        }, 400);

        return () => clearTimeout(handler);
    }, [search]);

    const handleGenreSelect = (genre: string) => {
        const current = filters.genres ?? [];
        if (current.includes(genre)) {
            mergeFilters({
                genres: current.filter((g) => g !== genre),
            });
        } else {
            mergeFilters({ genres: [...current, genre] });
        }
    };

    return (
        <div className="max-w-[1400px] mx-auto container-px grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 place-items-center mb-[60px] gap-x-6 gap-y-4">
            <div className="flex flex-col gap-2 w-full">
                <div className="">Search</div>
                <div className="border border-ring dark:border-0 dark:bg-sec relative w-full flex flex-between rounded-sm  h-[40px]">
                    <input
                        value={search === undefined ? "" : search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="focus:ring-2 focus:ring-ring dark:focus:ring-0 rounded-md h-full w-full outline-none  pl-9"
                        type="search"
                    />
                    <Search
                        className="absolute left-3 top-1/2 -translate-y-1/2"
                        size={16}
                    />
                </div>
            </div>

            <div className="flex flex-col gap-2 w-full">
                <div className="">Genres</div>
                <div className="border border-ring dark:border-0 flex flex-between py-3 px-4 rounded-sm dark:bg-sec h-[40px] w-full">
                    Any
                    <ChevronDown />
                </div>
            </div>

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
