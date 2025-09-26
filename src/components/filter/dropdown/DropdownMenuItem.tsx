import React, { useRef, useEffect, useContext, forwardRef } from "react";
import { DropdownMenuContext } from "./DropdownMenu";
import { cn } from "@/lib/utils/cn";

export const DropdownMenuItem = forwardRef<
    HTMLElement,
    React.PropsWithChildren<{
        disabled?: boolean;
        onSelect?: () => void;
        className?: string;
    }> &
        React.HTMLAttributes<HTMLElement>
>((props, forwardedRef) => {
    const ctx = useContext(DropdownMenuContext);
    if (!ctx) throw new Error("DropdownMenuItem used outside DropdownMenu");
    const {
        registerItem,
        unregisterItem,
        focusedIndex,
        focusItem,
        // setOpen,
        triggerRef,
        items,
    } = ctx;
    const { disabled = false, onSelect, children, className, ...rest } = props;
    const itemRef = useRef<HTMLElement>(null);

    useEffect(() => {
        registerItem(itemRef, disabled);
        return () => unregisterItem(itemRef);
    }, [disabled]);

    const index = items.findIndex((i) => i.ref === itemRef);
    const isFocused = focusedIndex === index;

    return (
        <div
            ref={(node) => {
                itemRef.current = node;
                if (forwardedRef && typeof forwardedRef !== "function") {
                    (
                        forwardedRef as React.RefObject<HTMLElement | null>
                    ).current = node;
                }
            }}
            role="menuitem"
            aria-disabled={disabled || undefined}
            tabIndex={disabled ? -1 : isFocused ? 0 : -1}
            className={cn(
                "focus:bg-accent focus:text-accent-foreground",
                className,
            )}
            onClick={(e) => {
                if (disabled) {
                    e.preventDefault();
                    return;
                }
                onSelect?.();
                // setOpen(false);
                triggerRef.current?.focus();
            }}
            onMouseEnter={() => {
                if (!disabled) {
                    focusItem(index);
                }
            }}
            {...rest}
        >
            {children}
        </div>
    );
});
