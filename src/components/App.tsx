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

  type GameState =
    | 'fetching-card-data'
    | 'card-data-loaded'
    | 'shuffling-deck'
    | 'picking-new-cards'
    | 'cards-flipping-up'
    | 'waiting-for-action'
    | 'cards-flipping-down'
    | 'game-over';

  const [gameState, setGameState] = useState<GameState>('fetching-card-data');

  // TODO: Bug when clicking last card
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
        setGameState('card-data-loaded');
      }
    };

    fetchCardData();

    return () => {
      isMounted = false; // This is to avoid double call due to React Strict Mode
    };
  }, []);

  useEffect(() => {
    switch (gameState) {
      case 'shuffling-deck':
        shuffleDeck();
        setGameState('picking-new-cards');
        break;
      case 'picking-new-cards':
        pickNewCards();
        setGameState('cards-flipping-up');
        break;
      default:
        break;
    }
  }, [gameState]);

  const handleTransitionEnd = () => {
    if (gameState === 'cards-flipping-up') {
      console.log('TRANSITION END: cards-flipping-up >>> waiting-for-action');
      setGameState('waiting-for-action');
    }
    if (gameState === 'cards-flipping-down') {
      console.log(
        'TRANSITION END: cards-flipping-down >>> ',
        prevIds.length === 0 ? 'shuffling-deck' : 'picking-new-cards'
      );
      setGameState(prevIds.length === 0 ? 'shuffling-deck' : 'picking-new-cards');
    }
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
        isClickable={gameState === 'waiting-for-action'}
        key={index}
        transitionDelay={index * 50} // Animation transition delay when flipping
      />
    ));
  };

  const handleCardClick = (id: number) => {
    if (gameState !== 'waiting-for-action') return;

    // Check if card has already been clicked
    if (prevIds.includes(id)) {
      setGameState('game-over');
    } else {
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
      {(gameState === 'fetching-card-data' || gameState === 'card-data-loaded') && (
        <LoadingModal
          isLoaded={gameState === 'card-data-loaded'}
          handleAnimationEnd={() => setGameState('shuffling-deck')}
        />
      )}
      {gameState === 'game-over' && (
        <Modal currentScore={currentScore} highScore={highScore} onAction={() => startNewGame()} />
      )}
      <Header currentScore={currentScore} highScore={highScore} />
      <section className="game-board">{createCards()}</section>
    </>
  );
};

export default App;
