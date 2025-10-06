import React, { ReactNode, useLayoutEffect, useRef, useState } from "react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/lib/ui/dropdown";

import { Button } from "@/lib/ui/shadcn/button";
import { ChevronDown } from "lucide-react";
import PersistSuspense from "@/components/PersistSuspense";
import { Skeleton } from "../shadcn/skeleton";

type FilterType = "genres" | "year" | "season" | "format" | "airing-status";

const filterLabels: Record<FilterType, string> = {
    genres: "Genres",
    year: "Year",
    season: "Season",
    format: "Format",
    "airing-status": "Airing Status",
};

type BaseFilterDropdownProps = {
    children: ReactNode;
    dropdownType: FilterType;
};

// Used by all the filter components as base except Search

const BaseFilterDropdown = ({
    children,
    dropdownType,
}: BaseFilterDropdownProps) => {
    const [isInputFocused, setInputFocus] = useState(false);
    const [open, setOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [triggerWidth, setTriggerWidth] = useState<number>(0);
    const triggerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (triggerRef.current) {
            setTriggerWidth(triggerRef.current.offsetWidth);
        }
    }, [open]);

    const label = filterLabels[dropdownType];
    const inputId = `${dropdownType}-input`;

    return (
        <div className="flex w-full flex-col gap-2">
            <DropdownMenu open={open} onOpenChange={setOpen}>
                <label className="cursor-text">{label}</label>

                <DropdownMenuTrigger
                    ref={triggerRef}
                    asChild
                    asControlled
                    // prevents input blur/losing focus so the "Any"
                    // placeholder wont flicker when clicking
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => {
                        document.activeElement !== inputRef.current &&
                            inputRef.current?.focus();
                        !open && setOpen(true);
                    }}
                >
                    <div className="flex h-[40px] w-full items-center rounded-sm p-3 outline dark:outline-0 outline-ring focus-within:outline-2  dark:bg-sec">
                        <input
                            ref={inputRef}
                            name={inputId}
                            onClick={() => !open && setOpen(true)}
                            onFocus={() => setInputFocus(true)}
                            onBlur={() => setInputFocus(false)}
                            className="h-full w-full placeholder-muted-foreground focus:outline-none"
                            placeholder={isInputFocused ? "" : "Any"}
                            type="text"
                        />
                        <Button
                            variant="minimal"
                            size="auto"
                            // prevents input blur (losing focus) so the "Any" placeholder
                            // wont flicker when clicking this btn
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => {
                                document.activeElement !== inputRef.current &&
                                    inputRef.current?.focus();
                                setOpen(!open);
                            }}
                        >
                            <ChevronDown
                                className={`transition-transform duration-200 ease-out ${open ? "rotate-180" : ""}`}
                            />
                        </Button>
                    </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                    style={{ width: triggerWidth }}
                    className="dark:bg-sec max-h-[520px] w-[triggerWidth]"
                    sideOffset={15}
                    align="center"
                >
                    <PersistSuspense
                        fallback={
                            <FilterSkeleton triggerWidth={triggerWidth} />
                        }
                    >
                        {children}
                    </PersistSuspense>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

const FilterSkeleton = ({ triggerWidth }: { triggerWidth: number }) => {
    return (
        <div
            className={`max-h-[520px] overflow-y-hidden py-[9px] px-1 flex flex-col gap-[18px] w-[${triggerWidth}px]`}
        >
            <Skeleton className="h-[17px] w-[70px] rounded mx-1 mb-1" />
            {Array.from({ length: 4 }).map((_, i) => (
                <React.Fragment key={i}>
                    <Skeleton className="h-4 w-[80px] rounded mx-3" />
                    <Skeleton className="h-4 w-[80px] rounded mx-3" />
                    <Skeleton className="h-4 w-[90px] rounded mx-3" />
                </React.Fragment>
            ))}
        </div>
    );
};

export default BaseFilterDropdown;
