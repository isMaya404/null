import { useEffect } from "react";

type Options = {
    enabled?: boolean;
    onDismiss: () => void;
    refs: React.RefObject<HTMLElement | null>[];
};

export function useDismissable({ enabled = true, onDismiss, refs }: Options) {
    useEffect(() => {
        if (!enabled) return;

        function handlePointerDown(e: MouseEvent) {
            // If click is outside all provided refs → dismiss
            const clickedInside = refs.some(
                (ref) => ref.current && ref.current.contains(e.target as Node),
            );
            if (!clickedInside) {
                onDismiss();
            }
        }

        function handleFocusIn(e: FocusEvent) {
            const focusedInside = refs.some(
                (ref) => ref.current && ref.current.contains(e.target as Node),
            );
            if (!focusedInside) {
                onDismiss();
            }
        }

        function handleKeyDown(e: KeyboardEvent) {
            if (e.key === "Escape") {
                onDismiss();
            }
        }

        document.addEventListener("pointerdown", handlePointerDown);
        document.addEventListener("focusin", handleFocusIn);
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("pointerdown", handlePointerDown);
            document.removeEventListener("focusin", handleFocusIn);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [enabled, onDismiss, refs]);
}
