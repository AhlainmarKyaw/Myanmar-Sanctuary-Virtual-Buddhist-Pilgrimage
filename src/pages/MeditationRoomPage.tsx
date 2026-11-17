import { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { Bell, CheckCircle2, Pause, Play, RotateCcw, Square, Volume2, VolumeX } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useSanctuary } from '../context/SanctuaryContext';
import { getTranslations } from '../i18n/translations';
import { apiFetch } from '../utils/apiClient';
import { sanctuaryAudio, type AmbientMode } from '../utils/sanctuaryAudio';
import { practiceStorage } from '../utils/practiceStorage';

const DURATION_PRESETS = [5, 10, 15, 30, 60] as const;
type DurationPreset = (typeof DURATION_PRESETS)[number];
const AMBIENT_KEYS: AmbientMode[] = ['bells', 'birds', 'wind', 'water', 'none'];

function formatTime(totalSeconds: number): string {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

export default function MeditationRoomPage() {
  const { idToken } = useAuth();
  const { language } = useSanctuary();
  const t = getTranslations(language);

  const [durationMinutes, setDurationMinutes] = useState<DurationPreset>(10);
  const [mode, setMode] = useState<'guided' | 'silent'>('guided');
  const [ambient, setAmbient] = useState<AmbientMode>('bells');
  const [muted, setMuted] = useState(false);

  const [status, setStatus] = useState<'idle' | 'running' | 'paused' | 'completed'>('idle');
  const [remainingSeconds, setRemainingSeconds] = useState(durationMinutes * 60);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [breathStage, setBreathStage] = useState<'inhale' | 'hold' | 'exhale'>('inhale');

  // Sync timer when preset changes while idle
  useEffect(() => {
    if (status === 'idle') {
      setRemainingSeconds(durationMinutes * 60);
      setElapsedSeconds(0);
    }
  }, [durationMinutes, status]);

  // Manage ambient audio lifecycle
  useEffect(() => {
    if (status === 'running') {
      sanctuaryAudio.startAmbient(ambient, muted);
    } else {
      sanctuaryAudio.stopAmbient();
    }
    return () => {
      sanctuaryAudio.stopAmbient();
    };
  }, [status, ambient, muted]);

  // Countdown tick
  useEffect(() => {
    if (status !== 'running') return;
    const interval = window.setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          sanctuaryAudio.stopAmbient();
          if (!muted) sanctuaryAudio.playTempleBell(0.28);
          setStatus('completed');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => window.clearInterval(interval);
  }, [status, muted]);

  // Save completed session once status transitions to completed
  useEffect(() => {
    if (status !== 'completed' || elapsedSeconds < 5) return;
    practiceStorage.addMeditationSession({
      id: `med-${Date.now()}`,
      userId: 'guest',
      mode,
      ambientSound: ambient,
      durationMinutes,
      completedSeconds: elapsedSeconds,
      completedAt: new Date().toISOString(),
    });
    if (idToken) {
      void apiFetch('/api/me/meditations', {
        method: 'POST',
        token: idToken,
        body: JSON.stringify({
          mode,
          ambientSound: ambient,
          durationMinutes,
          completedSeconds: elapsedSeconds,
        }),
      }).catch((err) => console.error('Meditation sync error:', err));
    }
  }, [status, elapsedSeconds, mode, ambient, durationMinutes, idToken]);

  // 12-second mindful breath cadence (4s inhale, 2s hold, 6s exhale)
  useEffect(() => {
    if (status !== 'running') return;
    const cycleTick = () => {
      const mod = Math.floor(Date.now() / 1000) % 12;
      if (mod < 4) setBreathStage('inhale');
      else if (mod < 6) setBreathStage('hold');
      else setBreathStage('exhale');
    };
    cycleTick();
    const timer = window.setInterval(cycleTick, 500);
    return () => window.clearInterval(timer);
  }, [status]);

  const guidedPrompt = useMemo(() => {
    const prompts = t.meditation.guidedPrompts;
    const idx = Math.floor(elapsedSeconds / 25) % prompts.length;
    return prompts[idx];
  }, [elapsedSeconds, t.meditation.guidedPrompts]);

  const breathLabel =
    breathStage === 'inhale'
      ? t.meditation.breathInhale
      : breathStage === 'hold'
        ? t.meditation.breathHold
        : t.meditation.breathExhale;

  const handleStart = () => {
    if (!muted) sanctuaryAudio.playTempleBell(0.22);
    setRemainingSeconds(durationMinutes * 60);
    setElapsedSeconds(0);
    setStatus('running');
  };

  const handlePauseResume = () => {
    setStatus((prev) => (prev === 'running' ? 'paused' : 'running'));
  };

  const handleEndSession = () => {
    sanctuaryAudio.stopAmbient();
    if (elapsedSeconds >= 10) {
      if (!muted) sanctuaryAudio.playTempleBell(0.2);
      setStatus('completed');
    } else {
      setStatus('idle');
      setRemainingSeconds(durationMinutes * 60);
      setElapsedSeconds(0);
    }
  };

  const handleReset = () => {
    sanctuaryAudio.stopAmbient();
    setStatus('idle');
    setRemainingSeconds(durationMinutes * 60);
    setElapsedSeconds(0);
  };

  return (
    <div className="min-h-[calc(100vh-65px)] bg-sanctuary-lacquer text-sanctuary-cream">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-sanctuary-gold/15 pb-6">
          <div>
            <p className="text-xs font-medium tracking-wider text-sanctuary-gold-light uppercase">
              {t.meditation.kicker}
            </p>
            <h1 className="mt-1.5 font-display text-4xl font-semibold text-sanctuary-cream">
              {t.meditation.title}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => sanctuaryAudio.playTempleBell(0.22)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-sanctuary-gold/30 px-3.5 py-2 text-xs font-medium text-sanctuary-gold-light hover:bg-sanctuary-cream/5"
            >
              <Bell className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{t.meditation.chimeBell}</span>
            </button>
            <button
              type="button"
              onClick={() => setMuted((m) => !m)}
              aria-label={muted ? 'Unmute ambient sound' : 'Mute ambient sound'}
              className="inline-flex items-center gap-1.5 rounded-lg border border-sanctuary-gold/30 px-3.5 py-2 text-xs font-medium text-sanctuary-parchment hover:bg-sanctuary-cream/5"
            >
              {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              <span>{muted ? t.meditation.muted : t.meditation.audioOn}</span>
            </button>
          </div>
        </div>

        {status === 'completed' ? (
          <div className="mx-auto mt-12 max-w-xl rounded-2xl border border-sanctuary-gold/30 bg-sanctuary-brown p-8 text-center sm:p-10">
            <CheckCircle2 className="mx-auto h-10 w-10 text-sanctuary-gold-light" aria-hidden="true" />
            <h2 className="mt-4 font-display text-3xl font-semibold text-sanctuary-cream">
              {t.meditation.completeTitle}
            </h2>
            <p className="mt-2 text-sm text-sanctuary-parchment/80">
              {t.meditation.completeDesc(formatTime(elapsedSeconds), mode === 'guided')}
            </p>
            <p className="mt-3 text-xs text-sanctuary-parchment/65">
              {t.meditation.completeNote}
            </p>
            <button
              type="button"
              onClick={handleReset}
              className="mt-7 inline-flex items-center gap-2 rounded-lg bg-sanctuary-gold px-6 py-2.5 text-sm font-semibold text-sanctuary-lacquer hover:bg-sanctuary-gold-light"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              <span>{t.meditation.prepareAnother}</span>
            </button>
          </div>
        ) : (
          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-center">
            {/* Animated Breathing Sanctuary Orb */}
            <div className="flex flex-col items-center justify-center rounded-2xl border border-sanctuary-gold/20 bg-sanctuary-brown/70 p-8 sm:p-12 lg:col-span-7">
              <div className="relative flex h-64 w-64 items-center justify-center">
                <motion.div
                  animate={
                    status === 'running'
                      ? { scale: [0.82, 1.12, 1.12, 0.82], opacity: [0.35, 0.72, 0.72, 0.35] }
                      : { scale: 0.92, opacity: 0.35 }
                  }
                  transition={
                    status === 'running'
                      ? { duration: 12, repeat: Infinity, times: [0, 0.33, 0.5, 1], ease: 'easeInOut' }
                      : { duration: 0.4 }
                  }
                  className="absolute inset-0 rounded-full bg-sanctuary-gold/20"
                />
                <motion.div
                  animate={
                    status === 'running'
                      ? { scale: [0.88, 1.06, 1.06, 0.88] }
                      : { scale: 0.94 }
                  }
                  transition={
                    status === 'running'
                      ? { duration: 12, repeat: Infinity, times: [0, 0.33, 0.5, 1], ease: 'easeInOut' }
                      : { duration: 0.4 }
                  }
                  className="flex h-48 w-48 flex-col items-center justify-center rounded-full border border-sanctuary-gold/55 bg-sanctuary-lacquer/90 text-center"
                >
                  <span className="font-mono text-4xl font-medium tracking-tight text-sanctuary-cream tabular-nums">
                    {formatTime(remainingSeconds)}
                  </span>
                  <span className="mt-2 px-3 text-xs font-medium tracking-wide text-sanctuary-gold-light">
                    {status === 'running'
                      ? breathLabel
                      : status === 'paused'
                        ? t.meditation.sessionPaused
                        : t.meditation.readyToBegin}
                  </span>
                </motion.div>
              </div>

              {mode === 'guided' && (
                <p className="mt-6 max-w-md text-center font-display text-xl leading-relaxed text-sanctuary-parchment/95">
                  {status === 'idle' ? t.meditation.idleQuote : guidedPrompt}
                </p>
              )}

              {/* Primary Session Controls */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                {status === 'idle' ? (
                  <button
                    type="button"
                    onClick={handleStart}
                    className="inline-flex items-center gap-2 rounded-lg bg-sanctuary-gold px-7 py-3 text-sm font-semibold text-sanctuary-lacquer hover:bg-sanctuary-gold-light"
                  >
                    <Play className="h-4 w-4" aria-hidden="true" />
                    <span>{t.meditation.start}</span>
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={handlePauseResume}
                      className="inline-flex items-center gap-2 rounded-lg bg-sanctuary-gold px-6 py-2.5 text-sm font-semibold text-sanctuary-lacquer hover:bg-sanctuary-gold-light"
                    >
                      {status === 'running' ? (
                        <>
                          <Pause className="h-4 w-4" aria-hidden="true" />
                          <span>{t.meditation.pause}</span>
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4" aria-hidden="true" />
                          <span>{t.meditation.resume}</span>
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={handleEndSession}
                      className="inline-flex items-center gap-2 rounded-lg border border-sanctuary-gold/35 px-5 py-2.5 text-sm font-medium text-sanctuary-cream hover:bg-sanctuary-cream/10"
                    >
                      <Square className="h-4 w-4" aria-hidden="true" />
                      <span>{t.meditation.endSession}</span>
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Session Configuration Panel */}
            <div className="space-y-7 rounded-2xl border border-sanctuary-gold/20 bg-sanctuary-brown/45 p-7 lg:col-span-5">
              <div>
                <h2 className="text-xs font-semibold tracking-wider text-sanctuary-gold-light uppercase">
                  {t.meditation.practiceStyle}
                </h2>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    disabled={status !== 'idle'}
                    onClick={() => setMode('guided')}
                    className={`rounded-lg px-3.5 py-2.5 text-sm font-medium transition-colors disabled:opacity-60 ${
                      mode === 'guided'
                        ? 'bg-sanctuary-gold text-sanctuary-lacquer'
                        : 'border border-sanctuary-gold/25 text-sanctuary-parchment hover:border-sanctuary-gold'
                    }`}
                  >
                    {t.meditation.guidedCues}
                  </button>
                  <button
                    type="button"
                    disabled={status !== 'idle'}
                    onClick={() => setMode('silent')}
                    className={`rounded-lg px-3.5 py-2.5 text-sm font-medium transition-colors disabled:opacity-60 ${
                      mode === 'silent'
                        ? 'bg-sanctuary-gold text-sanctuary-lacquer'
                        : 'border border-sanctuary-gold/25 text-sanctuary-parchment hover:border-sanctuary-gold'
                    }`}
                  >
                    {t.meditation.silentSitting}
                  </button>
                </div>
              </div>

              <div>
                <h2 className="text-xs font-semibold tracking-wider text-sanctuary-gold-light uppercase">
                  {t.meditation.durationLabel}
                </h2>
                <div className="mt-3 grid grid-cols-5 gap-2">
                  {DURATION_PRESETS.map((mins) => (
                    <button
                      key={mins}
                      type="button"
                      disabled={status !== 'idle'}
                      onClick={() => setDurationMinutes(mins)}
                      className={`rounded-lg py-2 font-mono text-sm font-medium tabular-nums transition-colors disabled:opacity-60 ${
                        durationMinutes === mins
                          ? 'bg-sanctuary-gold text-sanctuary-lacquer'
                          : 'border border-sanctuary-gold/25 text-sanctuary-parchment hover:border-sanctuary-gold'
                      }`}
                    >
                      {mins}m
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-xs font-semibold tracking-wider text-sanctuary-gold-light uppercase">
                  {t.meditation.ambientLabel}
                </h2>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {AMBIENT_KEYS.map((key) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setAmbient(key)}
                      className={`rounded-lg px-3 py-2 text-left text-xs font-medium transition-colors ${
                        ambient === key
                          ? 'bg-sanctuary-burgundy text-sanctuary-gold-light ring-1 ring-sanctuary-gold'
                          : 'border border-sanctuary-gold/20 text-sanctuary-parchment hover:border-sanctuary-gold/50'
                      }`}
                    >
                      {t.meditation.ambientOptions[key]}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
