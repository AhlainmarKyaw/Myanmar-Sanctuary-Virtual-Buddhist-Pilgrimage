import { useEffect, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, LogOut, Save, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useSanctuary } from '../context/SanctuaryContext';
import { getTranslations } from '../i18n/translations';
import { apiFetch } from '../utils/apiClient';
import { ROUTES } from '../config/navigation';
import { LoadingState } from '../components/ui/LoadingState';

interface DashboardPayload {
  profile: {
    id: number;
    email: string;
    displayName: string;
    preferredLanguage: string;
    privacyPublicProfile: boolean;
    privacySaveActivity: boolean;
  };
  role: string;
  meditations: Array<{
    id: number;
    mode: string;
    ambientSound: string;
    durationMinutes: number;
    completedSeconds: number;
    completedAt: string;
  }>;
  prayers: Array<{
    id: number;
    prayerTitle: string;
    candleLit: boolean;
    incenseOffered: boolean;
    quietMode: boolean;
    createdAt: string;
  }>;
  mala: {
    currentBead: number;
    completedRounds: number;
    totalBeadsCounted: number;
  };
  favoritePagodas: Array<{
    id: number;
    slug: string;
    name: string;
    nameMy: string;
    location: string;
  }>;
  recentVisits: Array<{
    id: number;
    slug: string;
    name: string;
    location: string;
    visitedAt: string;
  }>;
  savedDhamma: Array<{
    id: number;
    quoteEn: string;
    sourceAttribution: string;
  }>;
}

export default function DashboardPage() {
  const { user, idToken, role, loading: authLoading, logout, refreshProfile } = useAuth();
  const { language, setLanguage } = useSanctuary();
  const t = getTranslations(language);

  const [data, setData] = useState<DashboardPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [displayName, setDisplayName] = useState('');
  const [preferredLanguage, setPreferredLanguage] = useState<'en' | 'my'>(language);
  const [privacyPublicProfile, setPrivacyPublicProfile] = useState(false);
  const [privacySaveActivity, setPrivacySaveActivity] = useState(true);
  const [savingSettings, setSavingSettings] = useState(false);
  const [settingsSaved, setSettingsSaved] = useState(false);

  useEffect(() => {
    setPreferredLanguage(language);
  }, [language]);

  useEffect(() => {
    if (authLoading) return;
    if (!user || !idToken) {
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    apiFetch<DashboardPayload>('/api/me/dashboard', { token: idToken })
      .then((res) => {
        if (cancelled) return;
        setData(res);
        setDisplayName(res.profile.displayName);
        const lang = res.profile.preferredLanguage === 'my' ? 'my' : 'en';
        setPreferredLanguage(lang);
        setPrivacyPublicProfile(res.profile.privacyPublicProfile);
        setPrivacySaveActivity(res.profile.privacySaveActivity);
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Unable to load dashboard');
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [user, idToken, authLoading]);

  const handleSaveSettings = async (e: FormEvent) => {
    e.preventDefault();
    if (!idToken) return;
    setSavingSettings(true);
    setSettingsSaved(false);
    try {
      await apiFetch('/api/me/profile', {
        method: 'PATCH',
        token: idToken,
        body: JSON.stringify({
          displayName,
          preferredLanguage,
          privacyPublicProfile,
          privacySaveActivity,
        }),
      });
      setLanguage(preferredLanguage);
      await refreshProfile();
      setSettingsSaved(true);
      window.setTimeout(() => setSettingsSaved(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to save settings');
    } finally {
      setSavingSettings(false);
    }
  };

  if (authLoading || loading) {
    return <LoadingState message={t.dashboard.loading} />;
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center sm:px-6">
        <div className="rounded-2xl border border-sanctuary-brown/12 bg-sanctuary-parchment/55 p-8 sm:p-10">
          <h1 className="font-display text-3xl font-semibold text-sanctuary-burgundy">
            {t.dashboard.protectedTitle}
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-sanctuary-muted">
            {t.dashboard.protectedDesc}
          </p>
          <Link
            to={ROUTES.AUTH}
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-sanctuary-burgundy px-6 py-2.5 text-sm font-medium text-sanctuary-cream hover:bg-sanctuary-burgundy-deep"
          >
            <span>{t.dashboard.signInOrRegister}</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    );
  }

  const totalMeditationMinutes = Math.round(
    (data?.meditations.reduce((acc, s) => acc + s.completedSeconds, 0) || 0) / 60,
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-sanctuary-brown/12 pb-6">
        <div>
          <p className="text-xs font-semibold tracking-wider text-sanctuary-saffron uppercase">
            {t.dashboard.journalKicker} · {role === 'admin' ? 'Administrator' : 'Member'}
          </p>
          <h1 className="mt-1.5 font-display text-4xl font-semibold text-sanctuary-burgundy">
            {t.dashboard.welcome} {data?.profile.displayName || user.displayName || 'Practitioner'}
          </h1>
          <p className="mt-1 text-xs text-sanctuary-muted">{user.email}</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {role === 'admin' && (
            <Link
              to={ROUTES.ADMIN}
              className="inline-flex items-center gap-1.5 rounded-lg border border-sanctuary-gold bg-sanctuary-gold/15 px-4 py-2 text-xs font-semibold text-sanctuary-burgundy hover:bg-sanctuary-gold/25"
            >
              <Shield className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{t.dashboard.adminConsole}</span>
            </Link>
          )}
          <button
            type="button"
            onClick={() => void logout()}
            className="inline-flex items-center gap-1.5 rounded-lg border border-sanctuary-brown/20 px-4 py-2 text-xs font-medium text-sanctuary-charcoal hover:bg-sanctuary-parchment"
          >
            <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{t.dashboard.signOut}</span>
          </button>
        </div>
      </div>

      {error && (
        <div role="alert" className="mt-6 rounded-lg border border-red-900/20 bg-red-50 p-4 text-sm text-red-900">
          {error}
        </div>
      )}

      {/* Practice Summary Metrics */}
      <section className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="rounded-xl border border-sanctuary-brown/12 bg-sanctuary-parchment/50 p-5">
          <p className="text-xs text-sanctuary-muted">{t.dashboard.totalMeditation}</p>
          <p className="mt-1.5 font-mono text-3xl font-semibold text-sanctuary-burgundy tabular-nums">
            {totalMeditationMinutes}m
          </p>
        </div>
        <div className="rounded-xl border border-sanctuary-brown/12 bg-sanctuary-parchment/50 p-5">
          <p className="text-xs text-sanctuary-muted">{t.dashboard.completedSessions}</p>
          <p className="mt-1.5 font-mono text-3xl font-semibold text-sanctuary-burgundy tabular-nums">
            {data?.meditations.length ?? 0}
          </p>
        </div>
        <div className="rounded-xl border border-sanctuary-brown/12 bg-sanctuary-parchment/50 p-5">
          <p className="text-xs text-sanctuary-muted">{t.dashboard.malaRounds}</p>
          <p className="mt-1.5 font-mono text-3xl font-semibold text-sanctuary-burgundy tabular-nums">
            {data?.mala.completedRounds ?? 0}
          </p>
        </div>
        <div className="rounded-xl border border-sanctuary-brown/12 bg-sanctuary-parchment/50 p-5">
          <p className="text-xs text-sanctuary-muted">{t.dashboard.prayerReflections}</p>
          <p className="mt-1.5 font-mono text-3xl font-semibold text-sanctuary-burgundy tabular-nums">
            {data?.prayers.length ?? 0}
          </p>
        </div>
      </section>

      <div className="mt-10 grid gap-8 lg:grid-cols-12">
        {/* Practice History & Saved Items */}
        <div className="space-y-8 lg:col-span-7">
          <section className="rounded-xl border border-sanctuary-brown/12 bg-sanctuary-parchment/40 p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl font-semibold text-sanctuary-burgundy">
                {t.dashboard.favAndRecent}
              </h2>
              <Link to={ROUTES.PAGODAS} className="text-xs font-semibold text-sanctuary-saffron hover:underline">
                {t.dashboard.explorePagodas}
              </Link>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <h3 className="text-xs font-semibold text-sanctuary-muted uppercase">
                  {t.dashboard.favorites}
                </h3>
                {data?.favoritePagodas.length ? (
                  <ul className="mt-2 space-y-2 text-sm">
                    {data.favoritePagodas.map((p) => (
                      <li key={p.id}>
                        <Link
                          to={`/pagodas/${p.slug}`}
                          className="font-medium text-sanctuary-burgundy hover:underline"
                        >
                          {language === 'my' && p.nameMy ? p.nameMy : p.name}
                        </Link>
                        <span className="block text-xs text-sanctuary-muted">{p.location}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-2 text-xs text-sanctuary-muted">{t.dashboard.noFavorites}</p>
                )}
              </div>

              <div>
                <h3 className="text-xs font-semibold text-sanctuary-muted uppercase">
                  {t.dashboard.recentVisits}
                </h3>
                {data?.recentVisits.length ? (
                  <ul className="mt-2 space-y-2 text-sm">
                    {data.recentVisits.slice(0, 4).map((v) => (
                      <li key={v.id}>
                        <Link
                          to={`/pagodas/${v.slug}`}
                          className="font-medium text-sanctuary-charcoal hover:text-sanctuary-burgundy"
                        >
                          {v.name}
                        </Link>
                        <span className="block text-xs text-sanctuary-muted">
                          {new Date(v.visitedAt).toLocaleDateString()}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-2 text-xs text-sanctuary-muted">{t.dashboard.noVisits}</p>
                )}
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-sanctuary-brown/12 bg-sanctuary-parchment/40 p-6">
            <h2 className="font-display text-2xl font-semibold text-sanctuary-burgundy">
              {t.dashboard.recentActivity}
            </h2>
            <div className="mt-4 space-y-3">
              {data?.meditations.slice(0, 5).map((m) => (
                <div
                  key={`m-${m.id}`}
                  className="flex items-center justify-between border-b border-sanctuary-brown/10 pb-2.5 text-sm"
                >
                  <div>
                    <p className="font-medium text-sanctuary-charcoal">
                      Meditation · {m.mode === 'guided' ? 'Guided' : 'Silent'}
                    </p>
                    <p className="text-xs text-sanctuary-muted">
                      {new Date(m.completedAt).toLocaleString()} · {m.ambientSound}
                    </p>
                  </div>
                  <span className="font-mono text-xs font-semibold text-sanctuary-burgundy tabular-nums">
                    {Math.max(1, Math.round(m.completedSeconds / 60))} min
                  </span>
                </div>
              ))}
              {data?.prayers.slice(0, 5).map((p) => (
                <div
                  key={`p-${p.id}`}
                  className="flex items-center justify-between border-b border-sanctuary-brown/10 pb-2.5 text-sm"
                >
                  <div>
                    <p className="font-medium text-sanctuary-charcoal">{p.prayerTitle}</p>
                    <p className="text-xs text-sanctuary-muted">
                      {new Date(p.createdAt).toLocaleString()} · Private Reflection
                    </p>
                  </div>
                  <span className="text-xs text-sanctuary-saffron">
                    {p.quietMode ? 'Quiet Mode' : 'Altar'}
                  </span>
                </div>
              ))}
              {!data?.meditations.length && !data?.prayers.length && (
                <p className="text-sm text-sanctuary-muted">{t.dashboard.noActivity}</p>
              )}
            </div>
          </section>

          <section className="rounded-xl border border-sanctuary-brown/12 bg-sanctuary-parchment/40 p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl font-semibold text-sanctuary-burgundy">
                {t.dashboard.savedDhammaTitle}
              </h2>
              <Link to={ROUTES.DHAMMA} className="text-xs font-semibold text-sanctuary-saffron hover:underline">
                {t.dashboard.browseAll}
              </Link>
            </div>
            <div className="mt-4 space-y-3">
              {data?.savedDhamma.length ? (
                data.savedDhamma.map((d) => (
                  <blockquote key={d.id} className="rounded-lg bg-sanctuary-cream p-4 text-sm">
                    <p className="font-display text-lg text-sanctuary-charcoal">“{d.quoteEn}”</p>
                    <footer className="mt-1.5 text-xs text-sanctuary-muted">
                      {d.sourceAttribution}
                    </footer>
                  </blockquote>
                ))
              ) : (
                <p className="text-sm text-sanctuary-muted">{t.dashboard.noSavedDhamma}</p>
              )}
            </div>
          </section>
        </div>

        {/* Profile & Privacy Settings */}
        <div className="lg:col-span-5">
          <form
            onSubmit={handleSaveSettings}
            className="rounded-xl border border-sanctuary-brown/12 bg-sanctuary-parchment/55 p-6 sm:p-7"
          >
            <h2 className="font-display text-2xl font-semibold text-sanctuary-burgundy">
              {t.dashboard.profileSettings}
            </h2>

            <div className="mt-5 space-y-4">
              <div>
                <label htmlFor="profile-name" className="block text-xs font-medium text-sanctuary-charcoal">
                  {t.dashboard.displayName}
                </label>
                <input
                  id="profile-name"
                  type="text"
                  required
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-sanctuary-brown/20 bg-sanctuary-cream px-3.5 py-2 text-sm text-sanctuary-charcoal"
                />
              </div>

              <div>
                <label htmlFor="profile-lang" className="block text-xs font-medium text-sanctuary-charcoal">
                  {t.dashboard.preferredLang}
                </label>
                <select
                  id="profile-lang"
                  value={preferredLanguage}
                  onChange={(e) => {
                    const next = e.target.value as 'en' | 'my';
                    setPreferredLanguage(next);
                    setLanguage(next);
                  }}
                  className="mt-1.5 w-full rounded-lg border border-sanctuary-brown/20 bg-sanctuary-cream px-3.5 py-2 text-sm text-sanctuary-charcoal"
                >
                  <option value="en">English</option>
                  <option value="my">Myanmar (မြန်မာ)</option>
                </select>
              </div>

              <label className="flex items-start gap-3 pt-2 text-sm">
                <input
                  type="checkbox"
                  checked={privacySaveActivity}
                  onChange={(e) => setPrivacySaveActivity(e.target.checked)}
                  className="mt-1 h-4 w-4 accent-sanctuary-burgundy"
                />
                <span>
                  <span className="font-medium text-sanctuary-charcoal">{t.dashboard.recordPractice}</span>
                  <span className="block text-xs text-sanctuary-muted">
                    {t.dashboard.recordPracticeDesc}
                  </span>
                </span>
              </label>

              <label className="flex items-start gap-3 text-sm">
                <input
                  type="checkbox"
                  checked={privacyPublicProfile}
                  onChange={(e) => setPrivacyPublicProfile(e.target.checked)}
                  className="mt-1 h-4 w-4 accent-sanctuary-burgundy"
                />
                <span>
                  <span className="font-medium text-sanctuary-charcoal">{t.dashboard.keepPrivate}</span>
                  <span className="block text-xs text-sanctuary-muted">
                    {t.dashboard.keepPrivateDesc}
                  </span>
                </span>
              </label>

              <button
                type="submit"
                disabled={savingSettings}
                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-sanctuary-burgundy px-5 py-2.5 text-sm font-medium text-sanctuary-cream hover:bg-sanctuary-burgundy-deep disabled:opacity-60"
              >
                <Save className="h-4 w-4" aria-hidden="true" />
                <span>
                  {savingSettings
                    ? t.dashboard.saving
                    : settingsSaved
                      ? t.dashboard.settingsSaved
                      : t.dashboard.saveSettings}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
