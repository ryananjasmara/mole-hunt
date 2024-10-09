import React, { useMemo } from 'react';
import styles from '../../page.module.css';
import { useGetLeaderboard } from '@/app/services/queries/leaderboard.query';

interface LeaderboardProps {
  onBackToMenu: () => void;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ onBackToMenu }) => {
  const { data, isLoading } = useGetLeaderboard();

  const memoizedLeaderboard = useMemo(() => (
    <table className={styles.leaderboardTable}>
      <thead>
        <tr>
          <th>Rank</th>
          <th>Name</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        {data?.length === 0 && (<tr className={styles.leaderboardNoData}><td colSpan={3}>No data</td></tr>)}
        {data?.map((item, index) => (
          <tr key={item.rank} className={styles.leaderboardItem}>
            <td className={styles.leaderboardRank}>{index + 1}</td>
            <td className={styles.leaderboardName}>{item.name}</td>
            <td className={styles.leaderboardScore}>{item.score}</td>
          </tr>
        ))}
      </tbody>
    </table>
  ), [data]);

  return (
    <main className={styles.main}>
      <h1>Leaderboard</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        memoizedLeaderboard
      )}
      <button onClick={onBackToMenu}>Back to Menu</button>
    </main>
  );
};

export default Leaderboard;
