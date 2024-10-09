"use client";

import { useState } from "react";
import styles from "./page.module.css";
import GameBoard from "@/app/components/pages/game-board";
import Leaderboard from "@/app/components/pages/leader-board";
import GameOver from "./components/pages/game-over";
import MainMenu from "./components/pages/main-menu";
import SoundToggle from "./components/atoms/sound-toggle";

export default function Home() {
  const [gameState, setGameState] = useState<
    "menu" | "playing" | "gameOver" | "leaderboard"
  >("menu");
  const [finalScore, setFinalScore] = useState(0);

  const handleGameEnd = (score: number) => {
    setFinalScore(score);
    setGameState("gameOver");
  };

  const handleBackToMenu = () => {
    setGameState("menu");
  };

  return (
    <div className={styles.container}>
      <SoundToggle />
      {gameState === "menu" && (
        <MainMenu
          onStartGame={() => setGameState("playing")}
          onShowLeaderboard={() => setGameState("leaderboard")}
        />
      )}
      {gameState === "playing" && (
        <GameBoard onGameEnd={handleGameEnd} onBackToMenu={handleBackToMenu} />
      )}
      {gameState === "gameOver" && (
        <GameOver finalScore={finalScore} setGameState={setGameState} />
      )}
      {gameState === "leaderboard" && (
        <Leaderboard onBackToMenu={handleBackToMenu} />
      )}
    </div>
  );
}

