import React, { ReactNode, useLayoutEffect, useRef, useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/lib/ui/dropdown";
import { Button } from "@/lib/ui/shadcn/button";
import { ChevronDown } from "lucide-react";
import PersistSuspense from "@/components/PersistSuspense";
import { Skeleton } from "../../shadcn/skeleton";

type FilterLabelType = "genres" | "year" | "season" | "format" | "airingStatus";

const filterLabels: Record<FilterLabelType, string> = {
    genres: "Genres",
    year: "Year",
    season: "Season",
    format: "Format",
    airingStatus: "Airing Status",
};

type FilterDropdownMenuProps = {
    children: ReactNode | ((inputValue: string) => ReactNode);
    dropdownType: FilterLabelType;
    inputValue?: string;
    setInputValue?: React.Dispatch<React.SetStateAction<string>>;
};

// Used by all the filter components as base except Search

export const FilterDropdownMenu = ({
    children,
    dropdownType,
    inputValue: controlledValue,
    setInputValue: setControlledValue,
}: FilterDropdownMenuProps) => {
    const [open, setOpen] = useState(false);
    const [isInputFocused, setInputFocus] = useState(false);

    const isControlled =
        controlledValue !== undefined && setControlledValue !== undefined;

    // Log warning when misusing component is being misused
    if (
        (controlledValue === undefined) !==
        (setControlledValue === undefined)
    ) {
        if (process.env.NODE_ENV !== "production") {
            console.warn(
                "FilterDropdownMenu: both inputValue and setInputValue must be provided together for controlled mode.",
            );
        }
    }

    const [uncontrolledValue, setUncontrolledValue] = useState("");
    const inputValue = isControlled ? controlledValue! : uncontrolledValue;
    const setInputValue = isControlled
        ? setControlledValue!
        : setUncontrolledValue;

    const inputRef = useRef<HTMLInputElement | null>(null);
    const [triggerWidth, setTriggerWidth] = useState<number>(0);
    const triggerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (triggerRef.current) {
            setTriggerWidth(triggerRef.current.offsetWidth);
        }
    }, [open]);

    const label = filterLabels[dropdownType];
    // const inputId = `${dropdownType}-input`;
    const childrenWithValue =
        typeof children === "function" ? children(inputValue) : children;

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
                            // name={inputId}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
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

                {/* This will contain all the filter dropdown items */}
                <DropdownMenuContent
                    style={{ width: triggerWidth }}
                    className="dark:bg-sec min-h-[25px] max-h-[520px] w-[triggerWidth]"
                    sideOffset={15}
                    align="center"
                >
                    <PersistSuspense
                        fallback={
                            <FilterDropdownContentSkeleton
                                triggerWidth={triggerWidth}
                            />
                        }
                    >
                        {childrenWithValue}
                    </PersistSuspense>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

// this is placed here and not in skeletons dir so triggerWidth can be accessed
const FilterDropdownContentSkeleton = ({
    triggerWidth,
}: {
    triggerWidth: number;
}) => {
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
