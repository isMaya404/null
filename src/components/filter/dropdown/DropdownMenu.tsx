import React, {
    useState,
    useRef,
    useEffect,
    useCallback,
    createContext,
} from "react";

interface DropdownMenuContextValue {
    open: boolean;
    setOpen: (open: boolean) => void;
    triggerRef: React.RefObject<HTMLElement | null>;
    contentRef: React.RefObject<HTMLDivElement | null>;
    registerItem: (
        ref: React.RefObject<HTMLElement | null>,
        disabled?: boolean,
    ) => number;
    unregisterItem: (ref: React.RefObject<HTMLElement | null>) => void;
    focusItem: (index: number) => void;
    focusedIndex: number;
    items: Array<{ ref: React.RefObject<HTMLElement>; disabled?: boolean }>;
    isControlled: boolean;
}

export const DropdownMenuContext = createContext<
    DropdownMenuContextValue | undefined
>(undefined);

export const DropdownMenu: React.FC<{
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    defaultOpen?: boolean;
    children: React.ReactNode;
    modal?: boolean;
}> = ({
    open: openProp,
    defaultOpen = false,
    onOpenChange,
    children,
    modal = true,
}) => {
    const [openState, setOpenState] = useState(defaultOpen);
    const isControlled = openProp !== undefined;
    const open = isControlled ? openProp : openState;
    const setOpen = (o: boolean) => {
        if (!isControlled) setOpenState(o);
        onOpenChange?.(o);
    };

    const triggerRef = useRef<HTMLElement | null>(null);
    const contentRef = useRef<HTMLDivElement | null>(null);

    const [items, setItems] = useState<
        Array<{ ref: React.RefObject<HTMLElement>; disabled?: boolean }>
    >([]);
    const [focusedIndex, setFocusedIndex] = useState<number>(-1);

    const registerItem = useCallback(
        (ref: React.RefObject<HTMLElement | null>, disabled = false) => {
            setItems((prev) => {
                if (prev.find((i) => i.ref === ref)) return prev;
                return [
                    ...prev,
                    { ref: ref as React.RefObject<HTMLElement>, disabled },
                ];
            });
            return items.length;
        },
        [items],
    );

    const unregisterItem = useCallback(
        (ref: React.RefObject<HTMLElement | null>) => {
            setItems((prev) => prev.filter((i) => i.ref !== ref));
        },
        [],
    );

    const focusItem = (index: number) => {
        setFocusedIndex(index);
        const item = items[index];
        if (item && item.ref.current && !item.disabled) {
            item.ref.current.focus();
        }
    };

    // handle keyboard navigation
    useEffect(() => {
        if (!open) return;

        const onKeyDown = (e: KeyboardEvent) => {
            if (!contentRef.current) return;
            switch (e.key) {
                case "ArrowDown": {
                    e.preventDefault();
                    let next = focusedIndex + 1;
                    while (next < items.length && items[next].disabled) {
                        next++;
                    }
                    if (next < items.length) {
                        focusItem(next);
                    } else {
                        let wrap = 0;
                        while (wrap < items.length && items[wrap].disabled) {
                            wrap++;
                        }
                        if (wrap < items.length) focusItem(wrap);
                    }
                    break;
                }
                case "ArrowUp": {
                    e.preventDefault();
                    let prev = focusedIndex - 1;
                    while (prev >= 0 && items[prev].disabled) {
                        prev--;
                    }
                    if (prev >= 0) {
                        focusItem(prev);
                    } else {
                        let wrap = items.length - 1;
                        while (wrap >= 0 && items[wrap].disabled) {
                            wrap--;
                        }
                        if (wrap >= 0) focusItem(wrap);
                    }
                    break;
                }
                case "Escape":
                    e.preventDefault();
                    setOpen(false);
                    triggerRef.current?.focus();
                    break;
                case "Home": {
                    e.preventDefault();
                    const first = items.findIndex((i) => !i.disabled);
                    if (first >= 0) focusItem(first);
                    break;
                }
                case "End": {
                    e.preventDefault();
                    const revIdx = items
                        .slice()
                        .reverse()
                        .findIndex((i) => !i.disabled);
                    if (revIdx >= 0) {
                        const origIdx = items.length - 1 - revIdx;
                        focusItem(origIdx);
                    }
                    break;
                }
            }
        };

        contentRef.current?.addEventListener("keydown", onKeyDown);
        return () => {
            contentRef.current?.removeEventListener("keydown", onKeyDown);
        };
    }, [open, items, focusedIndex]);

    // handle click & focusin
    useEffect(() => {
        if (!open || !modal) return;
        function handleClickAndFocusIn(e: MouseEvent | FocusEvent) {
            if (
                contentRef.current?.contains(e.target as Node) ||
                triggerRef.current?.contains(e.target as Node)
            ) {
                return;
            }
            setOpen(false);
        }

        document.addEventListener("mousedown", handleClickAndFocusIn);
        document.addEventListener("focusin", handleClickAndFocusIn);

        return () => {
            document.removeEventListener("mousedown", handleClickAndFocusIn);
            document.removeEventListener("focusin", handleClickAndFocusIn);
        };
    }, [open, modal]);

    return (
        <DropdownMenuContext.Provider
            value={{
                open,
                setOpen,
                triggerRef,
                contentRef,
                registerItem,
                unregisterItem,
                focusedIndex,
                focusItem,
                items,
                isControlled,
            }}
        >
            {children}
        </DropdownMenuContext.Provider>
    );
};
