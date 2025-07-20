export type CardProps = {
  id: number;
  title: string;
  coverImage: string;
  className?: string;
};

const Card = ({ id, title, coverImage, className }: CardProps) => {
  return (
    <div key={id} className={`flex flex-col gap-2  ${className}`}>
      <img
        className="max-w-[250px] max-h-[360px] rounded-md h-full w-full object-cover"
        // className="rounded-md h-full w-full object-cover"
        src={coverImage}
        alt="Cover Image"
      />
      <h4 className="description-clamp-2">{title}</h4>
    </div>
  );
};

export default Card;
