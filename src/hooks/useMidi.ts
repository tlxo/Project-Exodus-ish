import { useEffect, useRef, useCallback } from 'react';
import * as Tone from 'tone';
import { Midi } from '@tonejs/midi';

/**
 * Loads a MIDI file from `url`, synthesises it with a PolySynth, and loops it.
 * Playback starts only after a user gesture (required by browsers).
 *
 * Drop your .mid file into public/ and pass its path as `url`.
 */
export function useMidi(url: string, enabled: boolean) {
  const partRefs = useRef<Tone.Part[]>([]);
  const startedRef = useRef(false);

  const stop = useCallback(() => {
    Tone.getTransport().stop();
    Tone.getTransport().cancel();
    partRefs.current.forEach(p => p.dispose());
    partRefs.current = [];
    startedRef.current = false;
  }, []);

  const start = useCallback(async () => {
    if (startedRef.current) return;
    startedRef.current = true;

    await Tone.start(); // Unlock AudioContext after user gesture

    let midi: Midi;
    try {
      midi = await Midi.fromUrl(url);
    } catch {
      console.warn('[useMidi] Could not load MIDI file:', url);
      startedRef.current = false;
      return;
    }

    const transport = Tone.getTransport();
    transport.bpm.value = midi.header.tempos[0]?.bpm ?? 120;
    transport.loop = true;
    transport.loopStart = 0;
    transport.loopEnd = midi.duration;

    midi.tracks.forEach(track => {
      const synth = new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: 'triangle' },
        envelope: { attack: 0.02, decay: 0.1, sustain: 0.5, release: 0.8 },
        volume: -18,
      }).toDestination();

      const notes = track.notes.map(n => ({
        time: n.time,
        note: n.name,
        duration: n.duration,
        velocity: n.velocity,
      }));

      const part = new Tone.Part((time, event) => {
        synth.triggerAttackRelease(
          event.note,
          event.duration,
          time,
          event.velocity,
        );
      }, notes);

      part.start(0);
      partRefs.current.push(part);
    });

    transport.start();
  }, [url]);

  // Tear down when disabled or unmounted
  useEffect(() => {
    if (!enabled) {
      stop();
    }
    return () => {
      stop();
    };
  }, [enabled, stop]);

  return { start, stop };
}
