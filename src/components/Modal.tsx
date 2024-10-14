import '../styles/Modal.scss';

import ball from '../assets/loading.png';

interface ModalProps {
  currentScore: number;
  highScore: number;
  onAction: () => void;
}

const Modal: React.FC<ModalProps> = ({ currentScore, highScore, onAction }) => {
  const scoreRatio = (currentScore / highScore) * 100;
  let heading;
  let emojis;

  if (scoreRatio > 100) {
    heading = 'New High Score!';
    emojis = '🎉🏆🤩';
  } else if (scoreRatio >= 90) {
    heading = 'So Close!';
    emojis = '😁👏🤗';
  } else if (scoreRatio >= 70) {
    heading = 'Good Job!';
    emojis = '😊👍😎';
  } else if (scoreRatio >= 50) {
    heading = 'Keep Trying!';
    emojis = '😢👎😣';
  } else {
    heading = 'Better Luck Next Time...';
    emojis = '😭☠️😖';
  }  
  
  const score =
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
          <img src={ball} alt="accent" />
          {heading}
          <img src={ball} alt="accent" />
        </h2>
        <p className="modal__emojis">{emojis}</p>
        <p className="modal__score">{score}</p>
        <button className="modal__button" onClick={onAction}>
          Start New Game
        </button>
      </div>
    </div>
  );
};

export default Modal;
