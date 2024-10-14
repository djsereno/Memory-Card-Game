import '../styles/App.scss';

import { useEffect, useState } from 'react';

import { CardData } from '../interfaces/types';
import getCardData from '../utils/card-data';
import { getRandomArray, getRandomSubset } from '../utils/utils';
import Card from './Card';
import LoadingModal from './LoadingModal';
import Modal from './Modal';
import Header from './Header';

const App = () => {
  const boardSize = 8;
  const deckSize = 10;
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [prevIds, setPrevIds] = useState<number[]>([]);
  const [cardData, setCardData] = useState<CardData[]>([]);
  const [deckIndexes, setDeckIndexes] = useState<number[]>([]);
  const [cardIndexes, setCardIndexes] = useState<number[]>(Array(boardSize).fill(-1));
  const [loadingIsAnimating, setLoadingIsAnimating] = useState(true);

  type GameState =
    | 'loading-calling-api'
    | 'loading-animation-finishing'
    | 'shuffling-deck'
    | 'picking-new-cards'
    | 'cards-flipping-up'
    | 'waiting-for-action'
    | 'cards-flipping-down'
    | 'game-over';

  const [gameState, setGameState] = useState<GameState>('loading-calling-api');

  // TODO: Update styling to fit content to screen
  // TOTO: Improve screen responsiveness
  // TODO: Fix card hover animations and shine effects
  // TODO: Final refactor

  useEffect(() => {
    console.log(gameState);
  }, [gameState]);

  // Get card data from API
  useEffect(() => {
    let isMounted = true;

    const fetchCardData = async () => {
      const data = await getCardData();
      if (isMounted) {
        setCardData(data);
        setGameState('loading-animation-finishing');
      }
    };

    fetchCardData();

    return () => {
      isMounted = false; // This is to avoid double call due to React Strict Mode
    };
  }, []);

  // Wait for the loading animation to finish before updating the game state
  useEffect(() => {
    if (!loadingIsAnimating) {
      setGameState('shuffling-deck');
    }
  }, [loadingIsAnimating]);

  useEffect(() => {
    if (gameState !== 'shuffling-deck') return;

    shuffleDeck();
    setGameState('picking-new-cards');
  }, [gameState]);

  useEffect(() => {
    if (gameState !== 'picking-new-cards') return;

    pickNewCards();
    setGameState('cards-flipping-up');
  }, [gameState]);

  const handleTransitionEnd = () => {
    if (gameState === 'cards-flipping-up') setGameState('waiting-for-action');
    if (gameState === 'cards-flipping-down')
      setGameState(prevIds.length === 0 ? 'shuffling-deck' : 'picking-new-cards');
  };

  const createCards = () => {
    return cardIndexes.map((id, index) => (
      <Card
        onClick={() => handleCardClick(id)}
        onTransitionEnd={index === cardIndexes.length - 1 ? handleTransitionEnd : undefined}
        id={id}
        index={index}
        imageUrl={cardData[id]?.image || ''}
        isRevealed={
          gameState === 'cards-flipping-up' ||
          gameState === 'waiting-for-action' ||
          gameState === 'game-over'
        }
        key={index}
        transitionDelay={index * 50} // Animation transition delay when flipping
      />
    ));
  };

  const handleCardClick = (id: number) => {
    if (gameState !== 'waiting-for-action') return;

    // If the card has already been clicked before, then game over
    if (prevIds.includes(id)) {
      setGameState('game-over');
    } else {
      // Otherwise, flip the cards
      setPrevIds([...prevIds, id]);
      setCurrentScore(currentScore + 1);
      setGameState('cards-flipping-down');
    }
  };

  const shuffleDeck = () => {
    const randomIndexes = getRandomArray(deckSize, cardData.length);
    setDeckIndexes(randomIndexes);
  };

  const pickNewCards = () => {
    const newCardIds = getRandomSubset(boardSize, deckIndexes);
    setCardIndexes(newCardIds);
  };

  const startNewGame = () => {
    if (prevIds.length > highScore) {
      setHighScore(currentScore);
    }
    setCurrentScore(0);
    setPrevIds([]);
    setGameState('cards-flipping-down');
  };

  return (
    <>
      {(gameState === 'loading-calling-api' || gameState === 'loading-animation-finishing') && (
        <LoadingModal
          isLoaded={gameState === 'loading-animation-finishing'}
          handleAnimationEnd={() => setLoadingIsAnimating(false)}
        />
      )}
      {gameState === 'game-over' && (
        <Modal currentScore={currentScore} highScore={highScore} onAction={() => startNewGame()} />
      )}
      <Header currentScore={currentScore} highScore={highScore} />
      <div className="container">
        <section className="game-board">{createCards()}</section>
      </div>
    </>
  );
};

export default App;
