import { useMemo, useState } from 'react';
import { RotateCcw, Volume2, VolumeX } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useSanctuary } from '../../context/SanctuaryContext';
import { getTranslations } from '../../i18n/translations';
import { apiFetch } from '../../utils/apiClient';
import { sanctuaryAudio } from '../../utils/sanctuaryAudio';
import { practiceStorage } from '../../utils/practiceStorage';

const TOTAL_BEADS = 108;

export function DigitalMala() {
  const { idToken } = useAuth();
  const { language } = useSanctuary();
  const t = getTranslations(language);
  const [progress, setProgress] = useState(() => practiceStorage.getMalaProgress());

  // Compute 108 bead coordinates arranged in an authentic circular mala loop
  const beadPositions = useMemo(() => {
    const cx = 180;
    const cy = 180;
    const radius = 142;
    return Array.from({ length: TOTAL_BEADS }, (_, idx) => {
      const angle = ((idx + 1) / (TOTAL_BEADS + 1)) * Math.PI * 2 - Math.PI / 2;
      return {
        index: idx + 1,
        x: cx + Math.cos(angle) * radius,
        y: cy + Math.sin(angle) * radius,
      };
    });
  }, []);

  const handleAdvanceBead = () => {
    const isCompletingRound = progress.currentBead + 1 >= TOTAL_BEADS;
    const nextBead = isCompletingRound ? 0 : progress.currentBead + 1;
    const nextRounds = isCompletingRound ? progress.completedRounds + 1 : progress.completedRounds;

    if (progress.soundEnabled) {
      sanctuaryAudio.playBeadClick(isCompletingRound);
    }

    const updated = {
      ...progress,
      currentBead: nextBead,
      completedRounds: nextRounds,
      totalBeadsCounted: progress.totalBeadsCounted + 1,
      updatedAt: new Date().toISOString(),
    };
    setProgress(updated);
    practiceStorage.saveMalaProgress(updated);
    if (idToken) {
      void apiFetch('/api/me/mala', {
        method: 'PUT',
        token: idToken,
        body: JSON.stringify({
          currentBead: updated.currentBead,
          completedRounds: updated.completedRounds,
          totalBeadsCounted: updated.totalBeadsCounted,
          soundEnabled: updated.soundEnabled,
        }),
      }).catch((err) => console.error('Mala sync error:', err));
    }
  };

  const handleResetRound = () => {
    const updated = {
      ...progress,
      currentBead: 0,
      updatedAt: new Date().toISOString(),
    };
    setProgress(updated);
    practiceStorage.saveMalaProgress(updated);
    if (idToken) {
      void apiFetch('/api/me/mala', {
        method: 'PUT',
        token: idToken,
        body: JSON.stringify({
          currentBead: updated.currentBead,
          completedRounds: updated.completedRounds,
          totalBeadsCounted: updated.totalBeadsCounted,
          soundEnabled: updated.soundEnabled,
        }),
      }).catch((err) => console.error('Mala sync error:', err));
    }
  };

  const handleToggleSound = () => {
    const updated = {
      ...progress,
      soundEnabled: !progress.soundEnabled,
      updatedAt: new Date().toISOString(),
    };
    setProgress(updated);
    practiceStorage.saveMalaProgress(updated);
  };

  return (
    <div className="rounded-2xl border border-sanctuary-gold/25 bg-sanctuary-brown/65 p-6 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-medium tracking-wider text-sanctuary-gold-light uppercase">
            {t.mala.kicker}
          </p>
          <h2 className="mt-1 font-display text-2xl font-semibold text-sanctuary-cream sm:text-3xl">
            {t.mala.title}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleToggleSound}
            aria-label={progress.soundEnabled ? 'Mute bead sound' : 'Enable bead sound'}
            className="inline-flex items-center gap-1.5 rounded-lg border border-sanctuary-gold/30 px-3 py-2 text-xs font-medium text-sanctuary-parchment hover:border-sanctuary-gold"
          >
            {progress.soundEnabled ? (
              <Volume2 className="h-3.5 w-3.5 text-sanctuary-gold-light" />
            ) : (
              <VolumeX className="h-3.5 w-3.5" />
            )}
            <span>{progress.soundEnabled ? t.mala.soundOn : t.mala.muted}</span>
          </button>

          <button
            type="button"
            onClick={handleResetRound}
            className="inline-flex items-center gap-1.5 rounded-lg border border-sanctuary-gold/30 px-3 py-2 text-xs font-medium text-sanctuary-parchment hover:border-sanctuary-gold"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{t.mala.resetRound}</span>
          </button>
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-center">
        {/* Interactive 108-Bead SVG Mala Ring */}
        <div className="flex flex-col items-center lg:col-span-7">
          <button
            type="button"
            onClick={handleAdvanceBead}
            aria-label={`Count bead ${progress.currentBead + 1} of 108`}
            className="group relative flex w-full max-w-[360px] cursor-pointer touch-manipulation items-center justify-center rounded-full focus-visible:ring-2 focus-visible:ring-sanctuary-gold"
          >
            <svg viewBox="0 0 360 360" className="h-auto w-full select-none">
              <circle
                cx="180"
                cy="180"
                r="142"
                fill="none"
                stroke="#8c6731"
                strokeWidth="2"
                strokeOpacity="0.6"
              />

              <circle
                cx="180"
                cy="38"
                r="8.5"
                fill="#c99a32"
                stroke="#f5de9b"
                strokeWidth="1.5"
              />
              <path d="M180 28 L175 18 L185 18 Z" fill="#a83226" />

              {beadPositions.map((bead) => {
                const isCurrent = bead.index === progress.currentBead;
                const isCompleted = bead.index <= progress.currentBead;
                return (
                  <circle
                    key={bead.index}
                    cx={bead.x}
                    cy={bead.y}
                    r={isCurrent ? 5.6 : 3.2}
                    fill={
                      isCurrent
                        ? '#f6d87e'
                        : isCompleted
                          ? '#c99a32'
                          : '#5b3926'
                    }
                    stroke={isCurrent ? '#ffffff' : '#3a2216'}
                    strokeWidth={isCurrent ? 1.3 : 0.6}
                  />
                );
              })}

              <circle
                cx="180"
                cy="180"
                r="86"
                fill="#190e0a"
                stroke="#c99a32"
                strokeOpacity="0.35"
                strokeWidth="1.2"
              />
              <text
                x="180"
                y="168"
                textAnchor="middle"
                className="fill-sanctuary-cream font-mono text-4xl font-semibold tabular-nums"
              >
                {progress.currentBead}
              </text>
              <text
                x="180"
                y="194"
                textAnchor="middle"
                className="fill-sanctuary-gold-light text-xs tracking-wider uppercase"
              >
                {t.mala.of108Beads}
              </text>
              <text
                x="180"
                y="218"
                textAnchor="middle"
                className="fill-sanctuary-parchment/70 text-[11px]"
              >
                {t.mala.tapRing}
              </text>
            </svg>
          </button>
        </div>

        {/* Mala Stats & Primary Tap Button */}
        <div className="space-y-6 lg:col-span-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl border border-sanctuary-gold/20 bg-sanctuary-lacquer/80 p-4">
              <p className="text-xs text-sanctuary-parchment/70">{t.mala.completedRounds}</p>
              <p className="mt-1 font-mono text-3xl font-semibold text-sanctuary-gold-light tabular-nums">
                {progress.completedRounds}
              </p>
            </div>
            <div className="rounded-xl border border-sanctuary-gold/20 bg-sanctuary-lacquer/80 p-4">
              <p className="text-xs text-sanctuary-parchment/70">{t.mala.lifetimeBeads}</p>
              <p className="mt-1 font-mono text-3xl font-semibold text-sanctuary-cream tabular-nums">
                {progress.totalBeadsCounted}
              </p>
            </div>
          </div>

          <p className="text-sm leading-relaxed text-sanctuary-parchment/85">
            {t.mala.description}
          </p>

          <button
            type="button"
            onClick={handleAdvanceBead}
            className="w-full rounded-xl bg-sanctuary-gold px-6 py-4 text-base font-semibold text-sanctuary-lacquer transition-colors hover:bg-sanctuary-gold-light active:scale-[0.99]"
          >
            {t.mala.countNextBead} ({progress.currentBead + 1}/108)
          </button>
        </div>
      </div>
    </div>
  );
}
