import React, { useEffect, useRef, useState } from 'react';
import './style.css';
import PlayingCard from './components/playing-card/PlayingCard';

//const emojiArray = ['👐', '🍕', '🎃', '🥎', '🧀', '😒', '😘', '🧠', '🍪', '🎱'];
const emojiArray = ['🍕', '🧀', '🧠', '🍪', '🎱'];

const getRandomEmoji = () => {
  return emojiArray[Math.floor(Math.random() * emojiArray.length)];
};

export default function App() {
  const gameCountRef = useRef(0);
  const [emoji1, setEmoji1] = useState('');
  const [emoji2, setEmoji2] = useState('');
  const [gameCount, setGameCount] = useState(0);
  const [gameScore, setGameScore] = useState(0);

  const startGame = () => {
    console.log('game started');
    if (gameCountRef.current) {
      return;
    }
    if (gameCountRef.current > 0) {
      gameCountRef.current.reset();
    }
    gameCountRef.current = setInterval(() => {
      setGameCount((c) => c + 1);
      setEmoji1(getRandomEmoji());
      setEmoji2(getRandomEmoji());
    }, 1000);
  };

  const endGame = () => {
    clearInterval(gameCountRef.current);
    gameCountRef.current = 0;
    console.log('game ended');
  };

  const resetGame = () => {
    clearInterval(gameCountRef.current);
    gameCountRef.current = 0;
    setEmoji1('');
    setEmoji2('');
    setGameCount(0);
    setGameScore(0);
    console.log('game reset');
  };

  const snap = () => {
    if (emoji1 == emoji2) {
      setGameScore((prevGameScore) => prevGameScore + 1);
    } else {
      setGameScore((prevGameScore) => prevGameScore - 1);
    }
  };

  useEffect(() => {
    return () => clearInterval(gameCountRef.current);
  }, []);

  return (
    <div className="game-container">
      <h1>Emoji Snap! 🃏🃏🤪</h1>
      <p>LeTs pLaY!</p>
      <div className="controls-container">
        <button onClick={startGame}>Start</button>
        <button onClick={endGame}>End</button>
        <button onClick={resetGame}>Reset</button>
      </div>
      <div className="cards-container">
        <PlayingCard emoji={emoji1} />
        <PlayingCard emoji={emoji2} />
      </div>
      <button onClick={snap}>Snap</button>
      <p>
        Game Time: {gameCount} Score:{' '}
        <span
          className={`${
            gameScore < 0 ? 'negative' : gameScore === 0 ? '' : 'positive'
          }`}
        >
          {gameScore}
        </span>
      </p>
    </div>
  );
}
