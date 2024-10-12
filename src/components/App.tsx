import '../styles/App.scss';

import { useEffect, useState } from 'react';

import logo from '../assets/logo.png';
import { CardData } from '../interfaces/types';
import getCardData from '../utils/card-data';
import { getRandomArray, getRandomSubset } from '../utils/utils';
import Card from './Card';
import LoadingModal from './LoadingModal';
import Modal from './Modal';

const App = () => {
  const boardSize = 8;
  const deckSize = 10;
  const [gameIsOver, setGameIsOver] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const [prevIds, setPrevIds] = useState<number[]>([]);
  const [cardData, setCardData] = useState<CardData[]>([]);
  const [deckIndexes, setDeckIndexes] = useState<number[]>([]);
  const [cardIndexes, setCardIndexes] = useState<number[]>(Array(boardSize).fill(-1));
  const [loadingIsAnimating, setLoadingIsAnimating] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  // Get card data from API
  useEffect(() => {
    let isMounted = true;
    const fetchCardData = async () => {
      const data = await getCardData();
      if (isMounted) setCardData(data);
    };
    fetchCardData();

    return () => {
      isMounted = false; // This is to avoid double call due to React Strict Mode
    };
  }, []);

  // Once cardData is loaded from the API, initialize the deck by picking
  // random cards from the API card data, and initialize the game board
  // by picking random cards from the deck
  useEffect(() => {
    if (!cardData.length) return;

    const randomIndexes = getRandomArray(deckSize, cardData.length);
    const randomSubset = getRandomSubset(boardSize, randomIndexes);
    setDeckIndexes(randomIndexes);
    setCardIndexes(randomSubset);
    setIsLoaded(true);
  }, [cardData]);

  // Reveal the cards when the loading animation ends
  useEffect(() => {
    if (!loadingIsAnimating) setIsRevealed(true);
  }, [loadingIsAnimating]);

  const createCards = () => {
    return cardIndexes.map((id, index) => (
      <Card
        onClick={() => handleCardClick(id)}
        id={id}
        imageUrl={cardData[id]?.image || ''}
        isRevealed={isRevealed}
        key={index}
        transitionDelay={index * 40} // Animation transition delay when flipping
      />
    ));
  };

  const handleCardClick = (id: number) => {
    // If the card has already been clicked before, then game over
    if (prevIds.includes(id)) {
      endGame();
    } else {
      // Otherwise, flip the cards, replace with new ones from the deck, and reveal
      const newCardIds = getRandomSubset(boardSize, deckIndexes);
      setIsRevealed(false);
      setTimeout(() => {
        setCardIndexes(newCardIds);
        setPrevIds([...prevIds, id]);
        setIsRevealed(true);
      }, 1000);
    }
  };

  const startNewGame = () => {
    if (prevIds.length > highScore) {
      setHighScore(prevIds.length);
    }
    const randomIndexes = getRandomArray(deckSize, cardData.length);
    const randomSubset = getRandomSubset(boardSize, randomIndexes);
    setDeckIndexes(randomIndexes);
    setCardIndexes(randomSubset);
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
          <img className="logo" src={logo} alt="logo" />
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
        <section className="game-board">{createCards()}</section>
      </div>
      {loadingIsAnimating && (
        <LoadingModal isLoaded={isLoaded} handleAnimationEnd={() => setLoadingIsAnimating(false)} />
      )}
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
