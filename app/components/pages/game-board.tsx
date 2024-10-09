import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import styles from '../../page.module.css';
import moleImage from '@/app/public/images/mole.png';
import popSound from '@/app/public/sfxs/pop.mp3';
import { usePageContext } from '@/app/contexts/page.context';
import { MIN_DELAY, MAX_DELAY, CLICK_COOLDOWN } from '@/app/shared/constants';
import { useDebounce } from '@/app/hooks/useDebounce';
import wemadebgm from "@/app/public/bgms/wemadebgm.mp3";

interface GameBoardProps {
  onGameEnd: (finalScore: number) => void;
  onBackToMenu: () => void;
}

export default function GameBoard({ onGameEnd, onBackToMenu }: GameBoardProps) {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [molePosition, setMolePosition] = useState(-1);
  const [isMoleVisible, setIsMoleVisible] = useState(true);
  const [lastClickTime, setLastClickTime] = useState(0);
  const [clickCount, setClickCount] = useState(0);
  const debouncedClickCount = useDebounce(clickCount, 1000);
  const audioRefSfx = useRef<HTMLAudioElement | null>(null);
  const audioRefBgm = useRef<HTMLAudioElement | null>(null);

  const { isSoundOn } = usePageContext();

  const showMole = useCallback(() => {
    const currentTime = Date.now();
    if (currentTime - lastClickTime < CLICK_COOLDOWN || debouncedClickCount > 3) {
      return;
    }

    setMolePosition(Math.floor(Math.random() * 9));
    setIsMoleVisible(true);

    const hideDuration = Math.floor(Math.random() * (MAX_DELAY - MIN_DELAY + 1)) + MIN_DELAY;
    setTimeout(() => {
      setIsMoleVisible(false);
    }, hideDuration);
  }, [lastClickTime, debouncedClickCount]);

  const gameTimerRef = useRef<NodeJS.Timeout | null>(null);

  const endGame = useCallback(() => {
    if (gameTimerRef.current) {
      clearInterval(gameTimerRef.current);
    }
    onGameEnd(score);
  }, [onGameEnd, score]);

  useEffect(() => {
    audioRefBgm.current = new Audio(wemadebgm);
    audioRefBgm.current.loop = true;

    audioRefBgm.current.play().catch(error => {
      console.log("Audio playback failed:", error);
    });

    return () => {
      audioRefBgm.current?.pause();
      audioRefBgm.current = null;
    };
  }, []);

  useEffect(() => {
    if (isSoundOn && audioRefBgm.current) {
      audioRefBgm.current.play().catch(error => {
        console.log("Audio playback failed:", error);
      });
    } else if (audioRefBgm.current) {
      audioRefBgm.current.pause();
    }
  }, [isSoundOn]);

  useEffect(() => {
    audioRefSfx.current = new Audio(popSound);
    
    gameTimerRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          endGame();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => {
      if (gameTimerRef.current) {
        clearInterval(gameTimerRef.current);
      }
    };
  }, [endGame]);

  useEffect(() => {
    const moleTimer = setInterval(showMole, 1000);

    return () => {
      clearInterval(moleTimer);
    };
  }, [showMole]);

  useEffect(() => {
    if (debouncedClickCount > 0) {
      setClickCount(0);
    }
  }, [debouncedClickCount]);

  const handleMoleClick = (index: number) => {
    const currentTime = Date.now();
    setLastClickTime(currentTime);
    setClickCount((prevCount) => (prevCount + 1) % 5);

    if (index === molePosition && isMoleVisible) {
      setScore((prevScore) => {
        const newScore = prevScore + 1;
        if (newScore >= 30) {
          setTimeout(() => endGame(), 0);
        }
        return newScore;
      });
      setIsMoleVisible(false);
      if (audioRefSfx.current && isSoundOn) {
        audioRefSfx.current.play().catch(error => console.error('Error playing sound:', error));
      }
    } 
  };

  return (
    <main className={styles.main}>
      <p>Score: {score}</p>
      <p>Time Left: {timeLeft} seconds</p>
      <div className={styles.grid}>
        {[...Array(9)].map((_, index) => (
          <div key={index} className={styles.hole} onClick={() => handleMoleClick(index)}>
            {index === molePosition && isMoleVisible && (
              <Image
                src={moleImage}
                alt="Mole"
                width={50}
                height={50}
                priority
                style={{
                  userSelect: 'none',
                  WebkitUserSelect: 'none',
                  msUserSelect: 'none',
                  pointerEvents: 'none',
                }}
              />
            )}
          </div>
        ))}
      </div>
      <button onClick={onBackToMenu}>Back to Menu</button>
    </main>
  );
}
