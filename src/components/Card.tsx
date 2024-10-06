import { useState } from 'react';

interface CardProps {
  id: number;
  imageUrl: string;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ id, imageUrl, onClick }: CardProps) => {
  const [isAnimated, setIsAnimated] = useState(false);

  const handleMouseEnter = () => {
    setIsAnimated(true);
  };

  const handleAnimationEnd = () => {
    setIsAnimated(false);
  };

  const className = 'card'
    .concat(id === -1 ? ' flipped' : ' shine')
    .concat(isAnimated ? ' animated' : '');

  const style = id !== -1 ? { backgroundImage: `url(${imageUrl})` } : undefined;

  return (
    <div
      className={className}
      style={style}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onAnimationEnd={handleAnimationEnd}>
      {id}
    </div>
  );
};

export default Card;
