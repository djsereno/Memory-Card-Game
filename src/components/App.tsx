import { useState } from 'react';
import '../styles/App.css';
import Card from './Card';
import Modal from './Modal';

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
      console.log(`Score: ${prevIds.length + 1}, High Score: ${highScore}`);
    }
  };

  const startNewGame = () => {
    setGameIsOver(false);
    setPrevIds([]);
  };

  const endGame = () => {
    setGameIsOver(true);
    if (prevIds.length > highScore) {
      setHighScore(prevIds.length);
      console.log(`New High Score! Old: ${highScore} New: ${prevIds.length}`);
    }
    console.log('~~~~~~~~~~~GAME OVER!~~~~~~~~~~~');
  };

  return (
    <>
      <div className="container">
        <header>
          <h1>Memory Card Game</h1>
          <div className="scoreboard">
            <div className="score">
              <p>
                Score: <span id="current-score">0</span>
              </p>
            </div>
            <div className="high-score">
              <p>
                High Score: <span id="high-score">0</span>
              </p>
            </div>
          </div>
        </header>
        <section className="game-board">{createCards(8)}</section>
      </div>
      {gameIsOver && (
        <Modal
          heading={'Game Over!'}
          description={'Game is over. Start new game?'}
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
