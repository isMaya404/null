import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils/cn";
import useIsDarkTheme from "@/hooks/useIsDarkTheme";

export type CardProps = {
    id: number;
    title?: string;
    coverImage: string | null | undefined;
    className?: string;
    onClick?: () => void;
    onMouseEnter?: (e: React.MouseEvent<HTMLElement>) => void;
    onMouseLeave?: () => void;
    onMouseOver?: () => void;
    onMouseOut?: () => void;
};

const Card = ({
    id,
    title,
    coverImage,
    className,
    onClick,
    onMouseOver,
    onMouseOut,
    onMouseEnter,
    onMouseLeave,
}: CardProps) => {
    const [loaded, setLoaded] = useState(false);
    const [imgError, setImgError] = useState(false);
    const isDark = useIsDarkTheme();
    const fallBackImg = isDark ? "/no-image-dark.png" : "/no-image-light.png";

    return (
        <div
            onClick={onClick}
            onMouseOver={onMouseOver}
            onMouseOut={onMouseOut}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            key={id}
            className={`flex flex-col gap-2 ${className}`}
        >
            <div className="relative aspect-[3/4.1]">
                {!loaded && <Skeleton className="absolute inset-0 rounded" />}
                <img
                    src={imgError ? fallBackImg : coverImage || fallBackImg}
                    alt="Cover Image"
                    loading="lazy"
                    onLoad={() => setLoaded(true)}
                    onError={() => setImgError(true)}
                    className={cn(
                        loaded ? "opacity-100 transition-opacity" : "opacity-0",
                        "rounded h-full w-full object-cover transition-opacity duration-300"
                    )}
                />
            </div>
            {title && (
                <h4 className="description-clamp-2 text-14-normal">{title}</h4>
            )}
        </div>
    );
};

export default Card;
