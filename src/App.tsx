import { useState } from 'react';
import TitleScreen from './screens/TitleScreen';
import GameScreen from './screens/GameScreen';

type Screen = 'title' | 'game';

export default function App() {
  const [screen, setScreen] = useState<Screen>('title');

  return screen === 'title' ? (
    <TitleScreen onStart={() => setScreen('game')} />
  ) : (
    <GameScreen onQuit={() => setScreen('title')} />
  );
}
