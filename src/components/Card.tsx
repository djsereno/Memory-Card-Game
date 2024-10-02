interface CardProps {
  id: number;
  onClick: () => void;
}

const Card: React.FC<CardProps & { imageUrl: string }> = ({
  id,
  onClick,
  imageUrl,
}: CardProps & { imageUrl: string }) => {
  return (
    <div
      className="card"
      data-id={id}
      style={{ backgroundImage: `url(${imageUrl})` }}
      onClick={onClick}
    ></div>
  );
};

export default Card;
