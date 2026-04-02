import { useEffect, useCallback } from 'react';
import styles from './TitleScreen.module.css';

interface Props {
  onStart: () => void;
}

const LOGO = [
  '  ██████╗ ██████╗  ██████╗      ██╗███████╗ ██████╗████████╗',
  '  ██╔══██╗██╔══██╗██╔═══██╗     ██║██╔════╝██╔════╝╚══██╔══╝',
  '  ██████╔╝██████╔╝██║   ██║     ██║█████╗  ██║        ██║   ',
  '  ██╔═══╝ ██╔══██╗██║   ██║██   ██║██╔══╝  ██║        ██║   ',
  '  ██║     ██║  ██║╚██████╔╝╚█████╔╝███████╗╚██████╗   ██║   ',
  '  ╚═╝     ╚═╝  ╚═╝ ╚═════╝  ╚════╝ ╚══════╝ ╚═════╝   ╚═╝   ',
];

const SUBTITLE = [
  '  ════════════════════════════════════════════════════════════',
  '                  E X O D U S  -  I S H',
  '       A Text Adventure Aboard the S.S. Disruptor',
  '          (Luxury Escape Pod · Upper Atmosphere)',
  '  ════════════════════════════════════════════════════════════',
];

export default function TitleScreen({ onStart }: Props) {
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        onStart();
      }
    },
    [onStart],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  return (
    <div className={styles.screen} onClick={onStart} role="button" aria-label="Start game">
      <div className={styles.content}>
        <pre className={styles.logo} aria-hidden="true">
          {LOGO.join('\n')}
        </pre>
        <pre className={styles.subtitle} aria-hidden="true">
          {SUBTITLE.join('\n')}
        </pre>
        <p className={styles.prompt}>[ PRESS ENTER TO BEGIN YOUR USER JOURNEY ]</p>
        <p className={styles.hint}>
          A satirical text adventure. Type HELP in-game for commands.
        </p>
      </div>
    </div>
  );
}
