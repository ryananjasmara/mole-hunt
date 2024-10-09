import React from 'react';
import styles from '../../page.module.css';

interface MainMenuProps {
  onStartGame: () => void;
  onShowLeaderboard: () => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ onStartGame, onShowLeaderboard }) => {
  return (
    <main className={styles.main}>
      <h1>Mole Hunter</h1>
      <button className={styles.button} onClick={onStartGame}>Start Game</button>
      <button className={styles.button} onClick={onShowLeaderboard}>Leaderboard</button>
    </main>
  );
};

export default MainMenu;