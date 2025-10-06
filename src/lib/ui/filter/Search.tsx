import { Search as SearchIcon } from "lucide-react";
import { useFilters } from "@/hooks/useFilters";
import { useEffect, useState } from "react";

const Search = () => {
    const { filters, setFilters } = useFilters();
    const [search, setSearch] = useState((filters.search as string) ?? "");

    // debounced search
    useEffect(() => {
        const handler = setTimeout(() => {
            setFilters((prev) => ({
                ...prev,
                search: search.trim() ?? undefined,
            }));
        }, 400);

        return () => clearTimeout(handler);
    }, [search]);

    return (
        <div className="flex flex-col gap-2 w-full">
            <div className="">Search</div>
            <div className="relative border border-ring dark:border-0 dark:bg-sec w-full rounded-sm  h-[40px]">
                <SearchIcon
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    size={16}
                />
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="focus:ring-2 focus:ring-ring focus:outline-none rounded-md h-full w-full pl-10"
                    type="search"
                />
            </div>
        </div>
    );
};

export default Search;
