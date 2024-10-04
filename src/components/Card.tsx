interface CardProps {
  id: number;
  onClick: () => void;
}

const Card: React.FC<CardProps & { imageUrl: string }> = ({
  id,
  onClick,
  imageUrl
}: CardProps & { imageUrl: string }) => {
  return (
    <div
      className={`card ${id === -1 ? 'flipped' : ''}`}
      data-id={id}
      style={id !== -1 ? { backgroundImage: `url(${imageUrl})` } : undefined}
      onClick={onClick}>
      {id}
    </div>
  );
};

export default Card;
