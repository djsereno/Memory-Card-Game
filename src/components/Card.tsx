import '../styles/Card.scss';

import { useState } from 'react';

import cardback from '../assets/cardback.png';

interface CardProps {
  id: number;
  index: number;
  imageUrl: string;
  isRevealed: boolean;
  isClickable: boolean;
  onClick: () => void;
  onTransitionEnd?: () => void;
  transitionDelay: number;
}

const Card: React.FC<CardProps> = ({
  id,
  index,
  imageUrl,
  isRevealed,
  isClickable,
  onClick,
  onTransitionEnd,
  transitionDelay
}: CardProps) => {
  const [isAnimated, setIsAnimated] = useState(false);

  const handleMouseEnter = () => {
    if (isClickable) setIsAnimated(true);
  };

  const handleAnimationEnd = () => {
    setIsAnimated(false);
  };

  const className = 'flip-card'
    .concat(isRevealed ? ' face-up' : ' face-down')
    .concat(isClickable ? ' clickable' : '');

  return (
    <div
      className={className}
      onClick={() => {
        onClick();
        setIsAnimated(false);
      }}
      onMouseEnter={handleMouseEnter}
      onAnimationEnd={handleAnimationEnd}
      onTransitionEnd={onTransitionEnd}>
      <div className="flip-card-inner" style={{ transitionDelay: `${transitionDelay}ms` }}>
        <div className={`flip-card-front ${isAnimated && isClickable ? ' shine' : ''}`}>
          <img src={imageUrl} />
          {/* <span>{id}</span> */}
        </div>
        <div className="flip-card-back">
          <img src={cardback} />
        </div>
      </div>
    </div>
  );
};

export default Card;
