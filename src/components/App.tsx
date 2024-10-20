import '../styles/App.scss';

import { useCallback, useEffect, useState } from 'react';

import { CardData } from '../interfaces/types';
import getCardData from '../utils/card-data';
import { getRandomArray, getRandomSubset } from '../utils/utils';
import Card from './Card';
import GameOverModal from './GameOverModal';
import Header from './Header';
import LoadingModal from './LoadingModal';

type GameState =
  | 'fetching-card-data'
  | 'card-data-loaded'
  | 'getting-new-deck'
  | 'getting-new-hand'
  | 'cards-flipping-up'
  | 'waiting-for-action'
  | 'cards-flipping-down'
  | 'game-over';

const App = () => {
  const boardSize = 8;
  const deckSize = 25;
  const [gameState, setGameState] = useState<GameState>('fetching-card-data');
  const [allCards, setAllCards] = useState<CardData[]>([]);
  const [deckCardIds, setDeckCardIds] = useState<number[]>([]);
  const [handCardIds, setHandCardIds] = useState<number[]>(Array(boardSize).fill(-1));
  const [selectionHistory, setSelectionHistory] = useState<number[]>([]);
  const [isFaceUp, setIsFaceUp] = useState<boolean[]>(Array(boardSize).fill(false));
  const [currentScore, setCurrentScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(0);

  const getNewDeck = useCallback(() => {
    const newDeckIds = getRandomArray(deckSize, allCards.length);
    setDeckCardIds(newDeckIds);
  }, [allCards.length]);

  const getNewHand = useCallback(() => {
    const newCardIds = getRandomSubset(boardSize, deckCardIds);
    setHandCardIds(newCardIds);
  }, [deckCardIds]);

  // Get card data from API
  useEffect(() => {
    let isMounted = true;

    const fetchCardData = async () => {
      const data = await getCardData();
      if (isMounted) {
        setAllCards(data);
        setGameState('card-data-loaded');
      }
    };

    fetchCardData();

    return () => {
      isMounted = false; // This is to avoid double call due to React Strict Mode
    };
  }, []);

  // Game state progression
  useEffect(() => {
    switch (gameState) {
      case 'getting-new-deck':
        getNewDeck();
        setGameState('getting-new-hand');
        break;
      case 'getting-new-hand':
        getNewHand();
        setGameState('cards-flipping-up');
        break;
      default:
        break;
    }
  }, [gameState, getNewDeck, getNewHand]);

  /**
   * Handles a card click event. If the game is in the 'waiting-for-action' state,
   * it checks if the card has been selected before. If yes, it sets the game state to
   * 'game-over'; otherwise, it updates selection history, increments the score,
   * and sets the state to 'cards-flipping-down'.
   */
  const handleCardClick = (id: number) => {
    if (gameState !== 'waiting-for-action') return;

    // Check if card has already been clicked
    if (selectionHistory.includes(id)) {
      setGameState('game-over');
    } else {
      setSelectionHistory([...selectionHistory, id]);
      setCurrentScore(currentScore + 1);
      setGameState('cards-flipping-down');
    }
  };

  /**
   * Handles the transition end event for a card flip, notifying the app when the flip
   * is complete. Once all cards are flipped up or down, it may progress the game
   * to 'waiting-for-action' or prepare for a new deck or hand.
   */
  const handleCardFlipTransition = (index: number) => {
    if (!(gameState === 'cards-flipping-up' || gameState === 'cards-flipping-down')) return;

    const newIsFaceUp = [...isFaceUp];
    newIsFaceUp[index] = gameState === 'cards-flipping-up';

    const allCardsFaceUp = newIsFaceUp.every((status) => status === true);
    const allCardsFaceDown = newIsFaceUp.every((status) => status === false);

    if (gameState === 'cards-flipping-up' && allCardsFaceUp) setGameState('waiting-for-action');
    if (gameState === 'cards-flipping-down' && allCardsFaceDown)
      // Get new deck at the beginning of the game (when selection history is empty)
      setGameState(selectionHistory.length === 0 ? 'getting-new-deck' : 'getting-new-hand');

    setIsFaceUp(newIsFaceUp);
  };

  const createCards = () => {
    return handCardIds.map((id, index) => (
      <Card
        key={index}
        imageUrl={allCards[id]?.imageUrl || ''}
        isClickable={gameState === 'waiting-for-action'}
        isRevealed={
          gameState === 'cards-flipping-up' ||
          gameState === 'waiting-for-action' ||
          gameState === 'game-over'
        }
        onClick={() => handleCardClick(id)}
        onTransitionEnd={() => handleCardFlipTransition(index)}
        transitionDelay={index * 50} // Flipping transition delay
      />
    ));
  };

  const startNewGame = () => {
    if (selectionHistory.length > highScore) {
      setHighScore(currentScore);
    }
    setCurrentScore(0);
    setSelectionHistory([]);
    setGameState('cards-flipping-down');
  };

  return (
    <>
      {(gameState === 'fetching-card-data' || gameState === 'card-data-loaded') && (
        <LoadingModal
          isLoaded={gameState === 'card-data-loaded'}
          endLoadingSequence={() => setGameState('getting-new-deck')}
        />
      )}
      {gameState === 'game-over' && (
        <GameOverModal
          currentScore={currentScore}
          highScore={highScore}
          onAction={() => startNewGame()}
        />
      )}
      <Header currentScore={currentScore} highScore={highScore} />
      <section className="game-board">{createCards()}</section>
    </>
  );
};

export default App;
