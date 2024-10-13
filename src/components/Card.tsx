import '../styles/Card.scss';

import { useState } from 'react';

import cardback from '../assets/cardback.png';

interface CardProps {
  id: number;
  imageUrl: string;
  isRevealed: boolean;
  onClick: () => void;
  transitionDelay: number;
}

const Card: React.FC<CardProps> = ({
  id,
  imageUrl,
  isRevealed,
  onClick,
  transitionDelay
}: CardProps) => {
  const [isAnimated, setIsAnimated] = useState(false);

  const handleMouseEnter = () => {
    setIsAnimated(true);
  };

  const handleAnimationEnd = () => {
    setIsAnimated(false);
  };

  const className = 'flip-card'
    .concat(isRevealed ? ' face-up' : ' face-down')
    .concat(isAnimated ? ' animated' : '');
  // .concat(id === -1 ? ' flipped' : ' shine')

  console.log(isRevealed, isAnimated);

  return (
    <div
      className={className}
      onClick={() => {
        // TODO: Add logic to prevent multiple clicks from incrementing score
        console.log(isRevealed, isAnimated);
        if (!isRevealed) return;
        onClick();
      }}
      onMouseEnter={handleMouseEnter}
      onAnimationEnd={handleAnimationEnd}>
      <div className="flip-card-inner" style={{ transitionDelay: `${transitionDelay}ms` }}>
        <div className="flip-card-front">
          <img src={imageUrl} />
          <span>{id}</span>
        </div>
        <div className="flip-card-back">
          <img src={cardback} />
        </div>
      </div>
    </div>
  );
};

export default Card;
