import React from 'react';
import styles from '../../page.module.css';
import { usePageContext } from '@/app/contexts/page.context';

const SoundToggle: React.FC = () => {
    const { isSoundOn, setIsSoundOn } = usePageContext();

  return (
    <button className={styles.soundToggle} onClick={() => setIsSoundOn(!isSoundOn)}>
      {isSoundOn ? '🔊' : '🔇'}
    </button>
  );
};

export default SoundToggle;