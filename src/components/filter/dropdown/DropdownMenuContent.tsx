import React, {
    forwardRef,
    useLayoutEffect,
    useState,
    useContext,
} from "react";
import ReactDOM from "react-dom";
import { DropdownMenuContext } from "./DropdownMenu";

type Side = "top" | "right" | "bottom" | "left";
type Align = "start" | "center" | "end";

export const DropdownMenuContent = forwardRef<
    HTMLDivElement,
    React.PropsWithChildren<{
        side?: Side;
        align?: Align;
        sideOffset?: number;
        alignOffset?: number;
        className?: string;
        style?: React.CSSProperties;
    }>
>((props, forwardedRef) => {
    const ctx = useContext(DropdownMenuContext);
    if (!ctx)
        throw new Error("DropdownMenuContent used outside DropdownMenuRoot");

    const { open, contentRef, triggerRef } = ctx;
    const {
        children,
        side = "bottom",
        align = "start",
        sideOffset = 4,
        alignOffset = 0,
        className,
        style,
        ...rest
    } = props;

    const [pos, setPos] = useState<React.CSSProperties>({});

    // updates internal context ref and forwarded ref
    const setRefs: React.RefCallback<HTMLDivElement> = (node) => {
        contentRef.current = node ?? null;
        if (!forwardedRef) return;
        if (typeof forwardedRef === "function") forwardedRef(node);
        else
            (forwardedRef as React.RefObject<HTMLDivElement | null>).current =
                node;
    };

    useLayoutEffect(() => {
        if (!open) return;

        let rafId: number | null = null;
        const updatePosition = () => {
            const triggerEl = triggerRef.current;
            const contentEl = contentRef.current;
            if (!triggerEl || !contentEl) return;

            const tr = triggerEl.getBoundingClientRect();

            const next: React.CSSProperties = {
                position: "fixed",
                minWidth: triggerEl.offsetWidth,
                zIndex: 1000,
            };

            if (side === "bottom") {
                next.top = Math.round(tr.bottom + sideOffset);
                if (align === "start")
                    next.left = Math.round(tr.left + alignOffset);
                else if (align === "center")
                    next.left = Math.round(
                        tr.left +
                            tr.width / 2 -
                            contentEl.offsetWidth / 2 +
                            alignOffset,
                    );
                else
                    next.left = Math.round(
                        tr.right - contentEl.offsetWidth + alignOffset,
                    );
            } else if (side === "top") {
                next.top = Math.round(
                    tr.top - contentEl.offsetHeight - sideOffset,
                );
                if (align === "start")
                    next.left = Math.round(tr.left + alignOffset);
                else if (align === "center")
                    next.left = Math.round(
                        tr.left +
                            tr.width / 2 -
                            contentEl.offsetWidth / 2 +
                            alignOffset,
                    );
                else
                    next.left = Math.round(
                        tr.right - contentEl.offsetWidth + alignOffset,
                    );
            } else if (side === "left") {
                next.left = Math.round(
                    tr.left - contentEl.offsetWidth - sideOffset,
                );
                next.top = Math.round(tr.top + alignOffset);
            } else {
                // right
                next.left = Math.round(tr.right + sideOffset);
                next.top = Math.round(tr.top + alignOffset);
            }

            setPos(next);
        };

        const rafUpdate = () => {
            if (rafId != null) cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(() => {
                updatePosition();
                rafId = null;
            });
        };

        // initial measurement
        rafUpdate();

        window.addEventListener("resize", rafUpdate);
        // for mobile/tablets rotating the screen
        window.addEventListener("orientationchange", rafUpdate);
        // capture scroll to catch ancestor scrolling
        window.addEventListener("scroll", rafUpdate, true);

        // observe DOM mutations to remeasure on content changes
        let mo: MutationObserver | null = null;
        // MutationObserver is not available in very old browsers or some weird
        // environments (like server-side rendering, maybe JSDOM tests). That’s
        // why it’s wrapped in a try/catch
        try {
            mo = new MutationObserver(rafUpdate);
            if (contentRef.current)
                mo.observe(contentRef.current, {
                    childList: true,
                    subtree: true,
                    attributes: true,
                });
        } catch {
            // ignore if MutationObserver unavailable
        }

        return () => {
            if (rafId != null) cancelAnimationFrame(rafId);
            window.removeEventListener("resize", rafUpdate);
            window.removeEventListener("orientationchange", rafUpdate);
            window.removeEventListener("scroll", rafUpdate, true);
            if (mo) mo.disconnect();
        };
    }, [open, side, align, sideOffset, alignOffset, triggerRef]);

    // SSR guard
    if (typeof document === "undefined") return null;
    if (!open) return null;

    return ReactDOM.createPortal(
        <div
            ref={setRefs}
            role="menu"
            tabIndex={-1}
            className={className}
            style={{ ...pos, ...style }}
            {...rest}
        >
            {children}
        </div>,
        document.body,
    );
});

DropdownMenuContent.displayName = "DropdownMenuContent";
