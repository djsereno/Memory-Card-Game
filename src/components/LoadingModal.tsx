import '../styles/LoadingModal.scss';

import { useState } from 'react';

interface LoadingModalProps {
  endLoadingSequence: () => void;
  isLoaded: boolean;
}

const LoadingModal = ({ endLoadingSequence, isLoaded }: LoadingModalProps) => {
  const [animationState, setAnimationState] = useState<'loading' | 'complete'>('loading');

  // Checks whether the card data is loaded after each animation iteration, and progresses
  // the loading animation state accordingly so that the proper animations are played
  const handleAnimationIteration = (event: React.AnimationEvent) => {
    if (!event.animationName.includes('shake') || !isLoaded) return;
    switch (animationState) {
      case 'loading':
        setAnimationState('complete');
        break;
      case 'complete':
        endLoadingSequence();
        break;
    }
  };

  return (
    <div className="loading-modal">
      <div
        className={`pokeball pokeball--${animationState}`}
        onAnimationIteration={handleAnimationIteration}>
        <div className={`pokeball__button pokeball__button--${animationState}`}></div>
      </div>
      <div className="loading-text">Loading...</div>
    </div>
  );
};

export default LoadingModal;
