interface CardProps {
  id: number;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ id, onClick }: CardProps) => {
  return (
    <div className="card" data-id={id} onClick={onClick}>
      {id}
    </div>
  );
};

export default Card;
