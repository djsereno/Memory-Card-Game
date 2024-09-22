interface CardProps {
  id: number;
  onClick: () => void;
}

function Card({ id, onClick }: CardProps) {
  return (
    <div className="card" data-id={id} onClick={onClick}>
      {id}
    </div>
  );
}

export default Card;
