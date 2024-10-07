import { useState } from 'react';
import '../styles/LoadingModal.scss';

interface LoadingModalProps {
  isLoaded: boolean;
  handleAnimationEnd: () => void;
}

const LoadingModal: React.FC<LoadingModalProps> = ({
  isLoaded,
  handleAnimationEnd
}: LoadingModalProps) => {
  const [animationState, setAnimationState] = useState<string>('loading');

  const handleAnimationIteration = (event: React.AnimationEvent) => {
    if (!event.animationName.includes('shake') || !isLoaded) return;

    switch (animationState) {
      case 'loading':
        setAnimationState('complete');
        break;
      case 'complete':
        handleAnimationEnd();
        break;
    }
  };

  return (
    <div className="loading-modal">
      <div className={`pokeball ${animationState}`} onAnimationIteration={handleAnimationIteration}>
        <div className="pokeball__button"></div>
      </div>
      <div className="loading-text">Loading...</div>
    </div>
  );
};

export default LoadingModal;
