import { useState } from 'react';
import '../styles/App.css';
import Card from './Card';
import Modal from './Modal';
import getCardData from '../utils/PCTG';

const App = () => {
  const [gameIsOver, setGameIsOver] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const [prevIds, setPrevIds] = useState<number[]>([]);

  const createCards = (numCards: number) => {
    const randArray = getRandArray(numCards);
    return randArray.map((id) => <Card onClick={() => handleCardClick(id)} id={id} key={id} />);
  };

  const handleCardClick = (id: number) => {
    if (prevIds.includes(id)) {
      endGame();
    } else {
      setPrevIds([...prevIds, id]);
    }
  };

  const startNewGame = () => {
    if (prevIds.length > highScore) {
      setHighScore(prevIds.length);
    }
    setGameIsOver(false);
    setPrevIds([]);
  };

  const endGame = () => {
    setGameIsOver(true);
  };

  const cardData = getCardData(20);

  return (
    <>
      <div className="container">
        <header>
          <h1>Memory Card Game</h1>
          <div className="scoreboard">
            <div className="score">
              <p>
                Score: <span id="current-score">{prevIds.length}</span>
              </p>
            </div>
            <div className="high-score">
              <p>
                High Score: <span id="high-score">{highScore}</span>
              </p>
            </div>
          </div>
        </header>
        <section className="game-board">{createCards(8)}</section>
      </div>
      {gameIsOver && (
        <Modal
          heading={prevIds.length > highScore ? '🥇 New High Score!' : '😢 Game Over!'}
          description={
            prevIds.length > highScore
              ? `Previous: ${highScore}  ➡️  New: ${prevIds.length}`
              : `Your Score: ${prevIds.length}`
          }
          // onClose={() => startNewGame()}
          onAction={() => startNewGame()}
        />
      )}
    </>
  );
};

const getRandArray = (n: number) => {
  // Returns an array containing integers 1 thru n in random order
  const randArray = Array.from({ length: n }, (_, index) => index);
  randArray.sort(() => Math.random() - 0.5);

  return randArray;
};

export default App;
