import { cn } from "@/lib/utils/cn";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="skeleton"
            className={cn("bg-gray-800 animate-pulse", className)}
            {...props}
        />
    );
}

export { Skeleton };
