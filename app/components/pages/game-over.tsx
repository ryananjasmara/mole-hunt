import React, { useState } from 'react';
import styles from '../../page.module.css';
import { Dispatch, SetStateAction } from 'react';
import { usePostLeaderboard } from '@/app/services/queries/leaderboard.query';

type GameState = "menu" | "playing" | "gameOver" | "leaderboard";

interface GameOverProps {
  finalScore: number;
  setGameState: Dispatch<SetStateAction<GameState>>;
}

function GameOver({ finalScore, setGameState }: GameOverProps) {
  const [playerName, setPlayerName] = useState('');
  const { mutate: postLeaderboard } = usePostLeaderboard();

  const handleSubmit = () => {
    postLeaderboard({
      name: playerName || 'No Name',
      score: finalScore,
    });
    setGameState('menu');
  };

  return (
    <main className={styles.main}>
      <h1>Game Over</h1>
      <p>Your final score: {finalScore}</p>
      <input
        type="text"
        placeholder="Enter your name"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        className={styles.input}
      />
      <button className={styles.button} onClick={handleSubmit}>
        Submit Score
      </button>
      <button className={styles.button} onClick={() => setGameState('menu')}>
        Back to Menu
      </button>
    </main>
  );
}

export default GameOver;