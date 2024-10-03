import { useEffect, useState } from 'react';
import '../styles/App.css';
import Card from './Card';
import Modal from './Modal';
import getCardData from '../utils/card-data';
import { getRandomArray, getSequenceArray } from '../utils/utils';
import { CardData } from '../interfaces/types';

const App = () => {
  const boardSize = 8;
  const deckSize = 50;
  const [gameIsOver, setGameIsOver] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const [prevIds, setPrevIds] = useState<number[]>([]);
  const [cardData, setCardData] = useState<CardData[]>([]);
  const [deckIndexes, setDeckIndexes] = useState<number[]>([]);
  const [cardIndexes, setCardIndexes] = useState<number[]>(getSequenceArray(boardSize));

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCardData();
      const randomIndexes = getRandomArray(deckSize, data.length);
      setCardData(data);
      setDeckIndexes(randomIndexes);
      setCardIndexes(randomIndexes.slice(0, boardSize));
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log('CardData:', cardData);
    console.log('DeckIndexes:', deckIndexes);
  }, [cardData, deckIndexes]);

  const createCards = (numCards: number) => {
    return cardIndexes.map((id) => (
      <Card
        onClick={() => handleCardClick(id)}
        id={id}
        imageUrl={cardData[id]?.image || ''}
        key={id}
      />
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
