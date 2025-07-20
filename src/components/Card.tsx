export type CardProps = {
  id: number;
  title: string;
  coverImage: string;
  className?: string;
};

const Card = ({ id, title, coverImage, className }: CardProps) => {
  return (
    <div key={id} className={`flex flex-col gap-2  ${className}`}>
      <div className="aspect-[3/4.1]">
        <img
          className="rounded-md h-full w-full object-cover"
          src={coverImage}
          alt="Cover Image"
        />
      </div>
      <h4 className="description-clamp-2">{title}</h4>
    </div>
  );
};

export default Card;
