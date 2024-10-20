import '../styles/Card.scss';

import { useEffect, useState } from 'react';

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
    .concat(isRevealed ? ' flip-card--face-up' : ' flip-card--face-down')
    .concat(isClickable ? ' flip-card--clickable' : '');

  useEffect(() => {
    if (!isClickable) setIsShining(false);
  }, [isClickable]);

  const handleMouseOver = () => {
    if (isClickable && !isShining) setIsShining(true); // Initiate the shining animation
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
      onMouseOver={handleMouseOver}
      onAnimationEnd={handleAnimationEnd}
      onTransitionEnd={onTransitionEnd}>
      <div className={`flip-card__inner`} style={{ transitionDelay: `${transitionDelay}ms` }}>
        <div
          className={`flip-card__front ${isShining && isClickable ? 'flip-card__front--shine' : ''}`}>
          <img src={imageUrl} alt="Front of card" draggable="false" />
        </div>
        <div className="flip-card__back">
          <img src={cardback} alt="Back of card" draggable="false" />
        </div>
      </div>
    </div>
  );
};

export default Card;
