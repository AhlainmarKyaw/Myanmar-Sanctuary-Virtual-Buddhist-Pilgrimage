import { useEffect, useState } from 'react';
import { Bell, Check, Flame, Sparkles, Volume2, VolumeX, Wind } from 'lucide-react';
import { TRADITIONAL_PRAYERS } from '../data/prayersData';
import { useAuth } from '../context/AuthContext';
import { useSanctuary } from '../context/SanctuaryContext';
import { getTranslations } from '../i18n/translations';
import { apiFetch } from '../utils/apiClient';
import { sanctuaryAudio } from '../utils/sanctuaryAudio';
import { practiceStorage } from '../utils/practiceStorage';
import { DigitalMala } from '../components/prayer/DigitalMala';

interface PrayerRoomPageProps {
  initialTab?: 'altar' | 'mala';
}

export default function PrayerRoomPage({ initialTab = 'altar' }: PrayerRoomPageProps) {
  const { idToken } = useAuth();
  const { language } = useSanctuary();
  const t = getTranslations(language);
  const isMy = language === 'my';

  const [activeTab, setActiveTab] = useState<'altar' | 'mala'>(initialTab);
  const [selectedPrayerId, setSelectedPrayerId] = useState(TRADITIONAL_PRAYERS[0].id);
  const [candleLit, setCandleLit] = useState(true);
  const [incenseOffered, setIncenseOffered] = useState(false);
  const [quietMode, setQuietMode] = useState(false);
  const [chantAudioOn, setChantAudioOn] = useState(false);
  const [showTranslations, setShowTranslations] = useState(true);
  const [savedNotice, setSavedNotice] = useState(false);

  const activePrayer =
    TRADITIONAL_PRAYERS.find((p) => p.id === selectedPrayerId) ?? TRADITIONAL_PRAYERS[0];

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  useEffect(() => {
    if (chantAudioOn && !quietMode) {
      sanctuaryAudio.startChantResonance(false);
    } else {
      sanctuaryAudio.stopAmbient();
    }
    return () => {
      sanctuaryAudio.stopAmbient();
    };
  }, [chantAudioOn, quietMode]);

  const handleToggleQuietMode = () => {
    setQuietMode((prev) => {
      const next = !prev;
      if (next) {
        setChantAudioOn(false);
        sanctuaryAudio.stopAmbient();
      }
      return next;
    });
  };

  const handleSavePrayer = () => {
    practiceStorage.addPrayerSession({
      id: `prayer-${Date.now()}`,
      userId: 'guest',
      prayerTitle: activePrayer.title,
      candleLit,
      incenseOffered,
      quietMode,
      durationSeconds: 120,
      isPrivate: true,
      createdAt: new Date().toISOString(),
    });
    if (idToken) {
      void apiFetch('/api/me/prayers', {
        method: 'POST',
        token: idToken,
        body: JSON.stringify({
          prayerTitle: activePrayer.title,
          candleLit,
          incenseOffered,
          quietMode,
          durationSeconds: 120,
          isPrivate: true,
        }),
      }).catch((err) => console.error('Prayer sync error:', err));
    }
    setSavedNotice(true);
    window.setTimeout(() => setSavedNotice(false), 3200);
  };

  return (
    <div className="min-h-[calc(100vh-65px)] bg-sanctuary-lacquer text-sanctuary-cream">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-sanctuary-gold/15 pb-6">
          <div>
            <p className="text-xs font-medium tracking-wider text-sanctuary-gold-light uppercase">
              {t.prayer.kicker}
            </p>
            <h1 className="mt-1.5 font-display text-4xl font-semibold text-sanctuary-cream">
              {t.prayer.title}
            </h1>
          </div>

          <div className="flex items-center gap-1 rounded-lg bg-sanctuary-brown p-1">
            <button
              type="button"
              onClick={() => setActiveTab('altar')}
              className={`rounded-md px-4 py-2 text-xs font-semibold transition-colors ${
                activeTab === 'altar'
                  ? 'bg-sanctuary-gold text-sanctuary-lacquer'
                  : 'text-sanctuary-parchment hover:text-sanctuary-cream'
              }`}
            >
              {t.prayer.tabAltar}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('mala')}
              className={`rounded-md px-4 py-2 text-xs font-semibold transition-colors ${
                activeTab === 'mala'
                  ? 'bg-sanctuary-gold text-sanctuary-lacquer'
                  : 'text-sanctuary-parchment hover:text-sanctuary-cream'
              }`}
            >
              {t.prayer.tabMala}
            </button>
          </div>
        </div>

        <p className="mt-4 text-xs leading-relaxed text-sanctuary-parchment/70">
          {t.prayer.respectfulNote}
        </p>

        {activeTab === 'mala' ? (
          <div className="mt-8">
            <DigitalMala />
          </div>
        ) : (
          <div className="mt-8 grid gap-8 lg:grid-cols-12">
            {/* Respectful Buddhist Altar Visual & Offerings */}
            <div className="flex flex-col justify-between rounded-2xl border border-sanctuary-gold/25 bg-sanctuary-brown/75 p-6 sm:p-8 lg:col-span-6">
              <div className="relative overflow-hidden rounded-xl border border-sanctuary-gold/20 bg-gradient-to-b from-sanctuary-burgundy-deep to-sanctuary-lacquer p-6">
                <svg
                  viewBox="0 0 400 320"
                  role="img"
                  aria-label="Respectful Myanmar Buddhist sanctuary altar with Buddha shrine, lotus pedestal, candle, and incense"
                  className="mx-auto h-auto w-full max-w-sm"
                >
                  <defs>
                    <radialGradient id="haloGlow" cx="50%" cy="42%" r="48%">
                      <stop offset="0%" stopColor="#f8d878" stopOpacity={candleLit ? '0.45' : '0.18'} />
                      <stop offset="100%" stopColor="#190e0a" stopOpacity="0" />
                    </radialGradient>
                    <radialGradient id="candleGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#ffe58f" stopOpacity="0.85" />
                      <stop offset="100%" stopColor="#d97706" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  <rect width="400" height="320" fill="none" />
                  <circle cx="200" cy="128" r="115" fill="url(#haloGlow)" />

                  <path
                    d="M95 248 L95 120 Q95 36 200 30 Q305 36 305 120 L305 248"
                    fill="none"
                    stroke="#c99a32"
                    strokeWidth="2.5"
                    strokeOpacity="0.65"
                  />

                  <ellipse cx="200" cy="222" rx="68" ry="12" fill="#946c17" />
                  <path
                    d="M144 218 Q160 198 200 198 Q240 198 256 218 Z"
                    fill="#d4a843"
                  />
                  <path
                    d="M150 202 Q200 185 250 202 Q256 212 200 214 Q144 212 150 202 Z"
                    fill="#e5c36c"
                  />
                  <path
                    d="M170 194 L177 134 Q200 124 223 134 L230 194 Z"
                    fill="#ecc96e"
                  />
                  <circle cx="200" cy="108" r="19" fill="#e5c36c" />
                  <path d="M192 91 Q200 72 208 91 Z" fill="#f3d886" />

                  <rect x="45" y="248" width="310" height="14" rx="3" fill="#4a121b" stroke="#c99a32" strokeOpacity="0.45" />
                  <rect x="65" y="262" width="270" height="44" fill="#261610" />

                  <g transform="translate(110, 212)">
                    <rect x="-8" y="12" width="16" height="24" rx="2" fill="#f3ebdc" />
                    {candleLit && (
                      <>
                        <circle cx="0" cy="4" r="24" fill="url(#candleGlow)" />
                        <path d="M0 -6 Q6 3 0 11 Q-6 3 0 -6 Z" fill="#ffe58f" />
                      </>
                    )}
                  </g>

                  <g transform="translate(200, 224)">
                    <ellipse cx="0" cy="18" rx="14" ry="8" fill="#c99a32" />
                    <path d="M-8 12 Q0 -4 8 12 Z" fill="#e8b4b8" />
                  </g>

                  <g transform="translate(290, 226)">
                    <path d="M-14 10 Q0 24 14 10 Z" fill="#b68826" />
                    <line x1="-4" y1="10" x2="-8" y2="-8" stroke="#855a3c" strokeWidth="1.8" />
                    <line x1="4" y1="10" x2="7" y2="-10" stroke="#855a3c" strokeWidth="1.8" />
                    {incenseOffered && (
                      <>
                        <circle cx="-8" cy="-8" r="2" fill="#fb923c" />
                        <circle cx="7" cy="-10" r="2" fill="#fb923c" />
                        <path
                          d="M-8 -12 Q-16 -28 -6 -44 Q2 -58 -10 -74"
                          fill="none"
                          stroke="#e5e7eb"
                          strokeWidth="1.5"
                          strokeOpacity="0.45"
                        />
                        <path
                          d="M7 -14 Q15 -30 5 -48 Q-3 -64 9 -78"
                          fill="none"
                          stroke="#e5e7eb"
                          strokeWidth="1.4"
                          strokeOpacity="0.38"
                        />
                      </>
                    )}
                  </g>
                </svg>
              </div>

              {/* Offering & Audio Controls */}
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <button
                  type="button"
                  onClick={() => setCandleLit((v) => !v)}
                  className={`flex flex-col items-center gap-1.5 rounded-xl border px-3 py-3 text-xs font-medium transition-colors ${
                    candleLit
                      ? 'border-sanctuary-gold bg-sanctuary-gold/15 text-sanctuary-gold-light'
                      : 'border-sanctuary-gold/20 text-sanctuary-parchment hover:border-sanctuary-gold/50'
                  }`}
                >
                  <Flame className="h-4 w-4" aria-hidden="true" />
                  <span>{candleLit ? t.prayer.candleLit : t.prayer.lightCandle}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIncenseOffered((v) => !v)}
                  className={`flex flex-col items-center gap-1.5 rounded-xl border px-3 py-3 text-xs font-medium transition-colors ${
                    incenseOffered
                      ? 'border-sanctuary-gold bg-sanctuary-gold/15 text-sanctuary-gold-light'
                      : 'border-sanctuary-gold/20 text-sanctuary-parchment hover:border-sanctuary-gold/50'
                  }`}
                >
                  <Wind className="h-4 w-4" aria-hidden="true" />
                  <span>{incenseOffered ? t.prayer.incenseOffered : t.prayer.offerIncense}</span>
                </button>

                <button
                  type="button"
                  disabled={quietMode}
                  onClick={() => setChantAudioOn((v) => !v)}
                  className={`flex flex-col items-center gap-1.5 rounded-xl border px-3 py-3 text-xs font-medium transition-colors disabled:opacity-45 ${
                    chantAudioOn && !quietMode
                      ? 'border-sanctuary-gold bg-sanctuary-gold/15 text-sanctuary-gold-light'
                      : 'border-sanctuary-gold/20 text-sanctuary-parchment hover:border-sanctuary-gold/50'
                  }`}
                >
                  {chantAudioOn && !quietMode ? (
                    <Volume2 className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <VolumeX className="h-4 w-4" aria-hidden="true" />
                  )}
                  <span>{chantAudioOn && !quietMode ? t.prayer.chantDrone : t.prayer.chantAudio}</span>
                </button>

                <button
                  type="button"
                  onClick={handleToggleQuietMode}
                  className={`flex flex-col items-center gap-1.5 rounded-xl border px-3 py-3 text-xs font-medium transition-colors ${
                    quietMode
                      ? 'border-sanctuary-gold bg-sanctuary-burgundy text-sanctuary-gold-light'
                      : 'border-sanctuary-gold/20 text-sanctuary-parchment hover:border-sanctuary-gold/50'
                  }`}
                >
                  <Sparkles className="h-4 w-4" aria-hidden="true" />
                  <span>{quietMode ? t.prayer.quietOn : t.prayer.quietMode}</span>
                </button>
              </div>
            </div>

            {/* Traditional Chants & Translations */}
            <div className="flex flex-col justify-between rounded-2xl border border-sanctuary-gold/25 bg-sanctuary-brown/55 p-6 sm:p-8 lg:col-span-6">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h2 className="text-xs font-semibold tracking-wider text-sanctuary-gold-light uppercase">
                    {t.prayer.traditionalRecitation}
                  </h2>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => sanctuaryAudio.playTempleBell(0.2)}
                      className="inline-flex items-center gap-1 text-xs font-medium text-sanctuary-gold-light hover:text-sanctuary-cream"
                    >
                      <Bell className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>{t.prayer.bell}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowTranslations((v) => !v)}
                      className="text-xs font-medium text-sanctuary-parchment/80 underline underline-offset-4 hover:text-sanctuary-cream"
                    >
                      {showTranslations ? t.prayer.hideTranslations : t.prayer.showTranslations}
                    </button>
                  </div>
                </div>

                {/* Prayer Selector */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {TRADITIONAL_PRAYERS.map((prayer) => (
                    <button
                      key={prayer.id}
                      type="button"
                      onClick={() => setSelectedPrayerId(prayer.id)}
                      className={`rounded-lg px-3.5 py-2 text-xs font-medium transition-colors ${
                        selectedPrayerId === prayer.id
                          ? 'bg-sanctuary-gold text-sanctuary-lacquer'
                          : 'border border-sanctuary-gold/25 text-sanctuary-parchment hover:border-sanctuary-gold'
                      }`}
                    >
                      {isMy ? prayer.titleMy : prayer.title.split('(')[0].trim()}
                    </button>
                  ))}
                </div>

                <div className="mt-6 space-y-4">
                  <div>
                    <h3 className="font-display text-2xl font-semibold text-sanctuary-cream">
                      {isMy ? activePrayer.titleMy : activePrayer.title}
                    </h3>
                    <p className="mt-0.5 font-myanmar text-sm text-sanctuary-gold-light">
                      {isMy ? activePrayer.title : activePrayer.titleMy}
                    </p>
                  </div>

                  <div className="rounded-xl border border-sanctuary-gold/15 bg-sanctuary-lacquer/75 p-5">
                    <p className="whitespace-pre-line font-display text-xl leading-relaxed text-sanctuary-gold-light">
                      {activePrayer.paliText}
                    </p>
                  </div>

                  {showTranslations && (
                    <div className="space-y-3 text-sm leading-relaxed text-sanctuary-parchment/90">
                      <p className="font-myanmar whitespace-pre-line">
                        {isMy ? activePrayer.myanmarMeaning : activePrayer.englishTranslation}
                      </p>
                      <p className="text-xs leading-relaxed text-sanctuary-parchment/75 whitespace-pre-line">
                        {isMy ? activePrayer.englishTranslation : activePrayer.myanmarMeaning}
                      </p>
                    </div>
                  )}

                  <p className="text-xs text-sanctuary-parchment/65">
                    {activePrayer.contextNote} · {activePrayer.attribution}
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-sanctuary-gold/15 pt-5">
                <button
                  type="button"
                  onClick={handleSavePrayer}
                  className="inline-flex items-center gap-2 rounded-lg bg-sanctuary-gold px-5 py-2.5 text-sm font-semibold text-sanctuary-lacquer hover:bg-sanctuary-gold-light"
                >
                  {savedNotice ? (
                    <>
                      <Check className="h-4 w-4" aria-hidden="true" />
                      <span>{t.prayer.savedActivity}</span>
                    </>
                  ) : (
                    <span>{t.prayer.saveActivity}</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
