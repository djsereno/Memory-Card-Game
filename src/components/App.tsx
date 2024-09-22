import { useState } from 'react';
import '../styles/App.css';
import Card from './Card';

function App() {
  const [score, setScore] = useState(-1);
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
      setScore(score + 1);
      console.log(`Score: ${score + 1}, High Score: ${highScore}`);
    }
  };

  const endGame = () => {
    if (score > highScore) {
      setHighScore(score);
      console.log(`New High Score! Old: ${highScore} New: ${score}`);
    }
    setScore(-1);
    setPrevIds([]);
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
    </>
  );
}

const getRandArray = (n: number) => {
  // Returns an array containing integers 1 thru n in random order
  const randArray = Array.from({ length: n }, (_, index) => index);
  randArray.sort(() => Math.random() - 0.5);

  return randArray;
};

export default App;
