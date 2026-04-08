import {
  useEffect,
  useRef,
  useState,
  useCallback,
  type FormEvent,
  type KeyboardEvent,
} from 'react';
import { useGame } from '../hooks/useGame';
import { useMidi } from '../hooks/useMidi';
import styles from './GameScreen.module.css';

interface Props {
  onQuit: () => void;
}

export default function GameScreen({ onQuit }: Props) {
  const { outputLines, gameOver, submitCommand, newGame } = useGame();
  const [input, setInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);

  const [musicEnabled, setMusicEnabled] = useState(true);
  const { start: startMidi } = useMidi('/gangsta.mid', musicEnabled);

  const outputRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll output to bottom whenever new lines arrive
  useEffect(() => {
    const el = outputRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [outputLines]);

  // Focus input on mount and whenever game state changes
  useEffect(() => {
    inputRef.current?.focus();
  }, [gameOver]);

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const trimmed = input.trim();
      if (!trimmed) return;

      setCmdHistory(prev => [trimmed, ...prev]);
      setHistoryIdx(-1);
      submitCommand(trimmed);
      setInput('');
    },
    [input, submitCommand],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        const next = Math.min(historyIdx + 1, cmdHistory.length - 1);
        setHistoryIdx(next);
        setInput(cmdHistory[next] ?? '');
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        const next = Math.max(historyIdx - 1, -1);
        setHistoryIdx(next);
        setInput(next === -1 ? '' : (cmdHistory[next] ?? ''));
      }
    },
    [historyIdx, cmdHistory],
  );

  return (
    // Clicking anywhere on the screen re-focuses the input and starts audio
    <div className={styles.screen} onClick={() => { inputRef.current?.focus(); void startMidi(); }}>
      {/* Scrolling output log */}
      <div className={styles.outputLog} ref={outputRef}>
        {outputLines.map(line => (
          <div key={line.id} className={`${styles.line} ${styles[line.type]}`}>
            {line.text === '' ? '\u00A0' : line.text}
          </div>
        ))}
        {gameOver && (
          <div className={styles.gameOverBar}>
            <span>[ SIMULATION ENDED ]</span>
            <button className={styles.restartBtn} onClick={newGame}>
              New Game
            </button>
            <button className={styles.quitBtn} onClick={onQuit}>
              Title Screen
            </button>
          </div>
        )}
      </div>

      {/* Command input bar */}
      {!gameOver && (
        <form className={styles.inputBar} onSubmit={handleSubmit}>
          <span className={styles.prompt}>&gt;</span>
          <button
            type="button"
            className={styles.muteBtn}
            onClick={e => { e.stopPropagation(); setMusicEnabled(v => !v); }}
            aria-label={musicEnabled ? 'Mute music' : 'Unmute music'}
            title={musicEnabled ? 'Mute music' : 'Unmute music'}
          >
            {musicEnabled ? '♪' : '✕'}
          </button>
          <input
            ref={inputRef}
            className={styles.input}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            aria-label="Command input"
            placeholder="type a command..."
          />
        </form>
      )}
    </div>
  );
}
