import '../styles/GameOverModal.scss';

import pokeball from '../assets/pokeball.png';

interface GameOverModalProps {
  currentScore: number;
  highScore: number;
  onAction: () => void;
}

const GameOverModal = ({ currentScore, highScore, onAction }: GameOverModalProps) => {
  const scoreRatio = (currentScore / highScore) * 100;
  let headingText: string;
  let emojis: string;

  if (scoreRatio > 100) {
    headingText = 'New High Score!';
    emojis = '🎉🏆🤩';
  } else if (scoreRatio >= 90) {
    headingText = 'So Close!';
    emojis = '😁👏🤗';
  } else if (scoreRatio >= 70) {
    headingText = 'Good Job!';
    emojis = '😊👍😎';
  } else if (scoreRatio >= 50) {
    headingText = 'Keep Trying!';
    emojis = '😢👎😣';
  } else {
    headingText = 'Better Luck Next Time...';
    emojis = '😭☠️😖';
  }

  const scoreDisplay =
    currentScore > highScore ? (
      <>
        <span>{`🥇 New Score: ${currentScore}`}</span>
        <span>{`🥈 Old Score: ${highScore}`}</span>
      </>
    ) : (
      <>
        <span>{`🏅 Your Score: ${currentScore}`}</span>
        <span>{`🥇 High Score: ${highScore}`}</span>
      </>
    );

  return (
    <div className="modal">
      <div className="modal__content">
        <h2 className="modal__heading">
          <img src={pokeball} alt="accent" draggable="false" />
          {headingText}
          <img src={pokeball} alt="accent" draggable="false" />
        </h2>
        <p className="modal__emojis">{emojis}</p>
        <p className="modal__score">{scoreDisplay}</p>
        <button className="modal__button" onClick={onAction}>
          Start New Game
        </button>
      </div>
    </div>
  );
};

export default GameOverModal;
