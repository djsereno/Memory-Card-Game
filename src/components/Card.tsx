import '../styles/Card.scss';

import { useState } from 'react';

import cardback from '../assets/cardback.png';

interface CardProps {
  imageUrl: string;
  isClickable: boolean;
  isRevealed: boolean;
  onClick: () => void;
  onTransitionEnd: () => void;
  transitionDelay: number;
}

const Card = ({
  imageUrl,
  isClickable,
  isRevealed,
  onClick,
  onTransitionEnd,
  transitionDelay
}: CardProps) => {
  const [isShining, setIsShining] = useState<boolean>(false); // Controls the activation of the shining animation
  const className = 'flip-card'
    .concat(isRevealed ? ' face-up' : ' face-down')
    .concat(isClickable ? ' clickable' : '');

  const handleMouseEnter = () => {
    if (isClickable) setIsShining(true); // Initiate the shining animation
  };

  const handleAnimationEnd = () => {
    setIsShining(false); // Ends the shining animation only once the animation finishes
  };

  return (
    <div
      className={className}
      onClick={() => {
        onClick();
        setIsShining(false);
      }}
      onMouseEnter={handleMouseEnter}
      onAnimationEnd={handleAnimationEnd}
      onTransitionEnd={onTransitionEnd}>
      <div className="flip-card-inner" style={{ transitionDelay: `${transitionDelay}ms` }}>
        <div className={`flip-card-front ${isShining && isClickable ? ' shine' : ''}`}>
          <img src={imageUrl} />
        </div>
        <div className="flip-card-back">
          <img src={cardback} />
        </div>
      </div>
    </div>
  );
};

export default Card;
