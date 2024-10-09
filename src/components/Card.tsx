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

  const className = 'flip-card'.concat(isRevealed ? ' face-up' : ' face-down');
  // .concat(id === -1 ? ' flipped' : ' shine')
  // .concat(isAnimated ? ' animated' : '');

  // const style = id !== -1 ? { backgroundImage: `url(${imageUrl})` } : undefined;

  return (
    // <div
    //   className={className}
    //   style={style}
    //   onClick={onClick}
    //   onMouseEnter={handleMouseEnter}
    //   onAnimationEnd={handleAnimationEnd}>
    //   {id}
    // </div>

    <div className={className} onClick={onClick}>
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
