import { useEffect, useState } from 'react';
import '../styles/App.css';
import Card from './Card';
import Modal from './Modal';
import getRandomCardData from '../utils/card-data';
import { getRandomArray } from '../utils/utils';
import { CardData } from '../interfaces/types';

const App = () => {
  const boardSize = 8;
  const deckSize = 50;
  const [gameIsOver, setGameIsOver] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const [prevIds, setPrevIds] = useState<number[]>([]);
  const [cardData, setCardData] = useState<CardData[]>(new Array(deckSize).fill({} as CardData));

  useEffect(() => {
    const fetchData = async () => {
      const data = await getRandomCardData(deckSize);
      setCardData(data);
      console.log(data);
    };
    fetchData();
  }, []);

  const createCards = (numCards: number) => {
    const randArray = getRandomArray(numCards);
    return randArray.map((id) => (
      <Card onClick={() => handleCardClick(id)} id={id} imageUrl={cardData[id].image} key={id} />
    ));
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
        <section className="game-board">{createCards(boardSize)}</section>
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

export default App;
