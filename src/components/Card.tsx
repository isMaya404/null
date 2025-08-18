export type CardProps = {
    id: number;
    title?: string;
    coverImage: string;
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
    return (
        <div
            onClick={onClick}
            onMouseOver={onMouseOver}
            onMouseOut={onMouseOut}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            key={id}
            className={`flex flex-col gap-2  ${className}`}
        >
            <div className="aspect-[3/4.1]">
                <img
                    className="rounded-md h-full w-full object-cover"
                    src={coverImage}
                    alt="Cover Image"
                />
            </div>
            {title && (
                <h4 className="description-clamp-2 text-14-normal">{title}</h4>
            )}
        </div>
    );
};

export default Card;
