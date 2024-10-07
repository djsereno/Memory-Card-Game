import { useEffect, useState } from 'react';
import '../styles/LoadingModal.scss';

const LoadingModal: React.FC = () => {
  const [dots, setDots] = useState<string>('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => {
        if (prevDots.length === 3) {
          return '';
        }
        return prevDots + '.';
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-modal">
      <div className="spinner"></div>
      <div className="loading-text">Loading{dots}</div>
    </div>
  );
};

export default LoadingModal;
