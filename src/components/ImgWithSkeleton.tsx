import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

type ImgWithSkeletonProps = React.ImgHTMLAttributes<HTMLImageElement> & {
    src: string;
    alt: string;
};

export default function ImgWithSkeleton({
    src,
    alt,
    className,
    ...props
}: ImgWithSkeletonProps) {
    const [loaded, setLoaded] = useState(false);

    return (
        <div className="relative">
            {!loaded && <Skeleton className="absolute inset-0" />}
            <img
                src={src}
                alt={alt}
                onLoad={() => setLoaded(true)}
                className={`${
                    !loaded ? "opacity-0" : "opacity-100 transition-opacity"
                } ${className ?? ""}`}
                {...props}
            />
        </div>
    );
}
