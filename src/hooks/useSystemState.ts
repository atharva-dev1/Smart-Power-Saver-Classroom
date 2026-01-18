import { useState, useCallback, useEffect } from 'react';

export type SystemMode = 'occupied' | 'empty' | 'override';

export interface SystemState {
  mode: SystemMode;
  lightOn: boolean;
  fanOn: boolean;
  pirDetecting: boolean;
  relayActive: boolean;
  lcdMessage: string;
  powerMode: 'Active' | 'Standby';
  autoPlay: boolean;
  countdown: number;
}

const COUNTDOWN_DURATION = 5;

export function useSystemState() {
  const [state, setState] = useState<SystemState>({
    mode: 'empty',
    lightOn: false,
    fanOn: false,
    pirDetecting: false,
    relayActive: false,
    lcdMessage: 'System Ready',
    powerMode: 'Standby',
    autoPlay: true,
    countdown: 0,
  });

  const setMode = useCallback((mode: SystemMode) => {
    setState(prev => {
      switch (mode) {
        case 'occupied':
          return {
            ...prev,
            mode,
            pirDetecting: true,
            relayActive: true,
            lightOn: true,
            fanOn: true,
            lcdMessage: 'Room Occupied',
            powerMode: 'Active',
            countdown: 0,
          };
        case 'empty':
          return {
            ...prev,
            mode,
            pirDetecting: false,
            relayActive: false,
            lightOn: false,
            fanOn: false,
            lcdMessage: 'Room Empty',
            powerMode: 'Standby',
            countdown: COUNTDOWN_DURATION,
          };
        case 'override':
          return {
            ...prev,
            mode,
            pirDetecting: false,
            relayActive: true,
            lightOn: true,
            fanOn: true,
            lcdMessage: 'Manual Override',
            powerMode: 'Active',
            countdown: 0,
          };
        default:
          return prev;
      }
    });
  }, []);

  const toggleAutoPlay = useCallback(() => {
    setState(prev => ({ ...prev, autoPlay: !prev.autoPlay }));
  }, []);

  // Auto-play cycle
  useEffect(() => {
    if (!state.autoPlay) return;

    const modes: SystemMode[] = ['occupied', 'empty', 'override'];
    const currentIndex = modes.indexOf(state.mode);
    
    const timer = setTimeout(() => {
      const nextIndex = (currentIndex + 1) % modes.length;
      setMode(modes[nextIndex]);
    }, 4000);

    return () => clearTimeout(timer);
  }, [state.autoPlay, state.mode, setMode]);

  // Countdown timer for empty mode
  useEffect(() => {
    if (state.mode !== 'empty' || state.countdown <= 0) return;

    const timer = setInterval(() => {
      setState(prev => ({
        ...prev,
        countdown: Math.max(0, prev.countdown - 1),
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, [state.mode, state.countdown]);

  return {
    state,
    setMode,
    toggleAutoPlay,
  };
}
