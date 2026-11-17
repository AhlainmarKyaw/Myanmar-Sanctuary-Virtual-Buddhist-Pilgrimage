import { useCallback, useEffect, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { apiFetch } from '../utils/apiClient';
import { ROUTES } from '../config/navigation';
import { LoadingState } from '../components/ui/LoadingState';

interface AdminOverviewPayload {
  users: Array<{
    id: number;
    email: string;
    displayName: string;
    role: string | null;
    createdAt: string;
  }>;
  pagodas: Array<{
    id: number;
    slug: string;
    name: string;
    nameMy: string;
    location: string;
    summary: string;
  }>;
  figures: Array<{
    id: number;
    slug: string;
    name: string;
    era: string;
    titleOrRole: string;
    biography: string;
    historicalBackground: string;
    displayOrder: number;
    isActive: boolean;
  }>;
  dhamma: Array<{
    id: number;
    publishDate: string;
    quoteEn: string;
    sourceAttribution: string;
    isDailyFeatured: boolean;
  }>;
  stats: {
    totalUsers: number;
    totalMeditations: number;
    totalPrayers: number;
    totalMeditationMinutes: number;
  };
}

type AdminTab = 'users' | 'pagodas' | 'figures' | 'dhamma';

export default function AdminDashboardPage() {
  const { user, idToken, role, loading: authLoading } = useAuth();
  const [tab, setTab] = useState<AdminTab>('users');
  const [data, setData] = useState<AdminOverviewPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  // New Dhamma form state
  const [quoteEn, setQuoteEn] = useState('');
  const [quoteMy, setQuoteMy] = useState('');
  const [explanationEn, setExplanationEn] = useState('');
  const [reflectionPrompt, setReflectionPrompt] = useState('');
  const [sourceAttribution, setSourceAttribution] = useState('');
  const [isDailyFeatured, setIsDailyFeatured] = useState(true);

  const loadOverview = useCallback(async () => {
    if (!idToken || role !== 'admin') return;
    setLoading(true);
    setError(null);
    try {
      const overview = await apiFetch<AdminOverviewPayload>('/api/admin/overview', {
        token: idToken,
      });
      setData(overview);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load admin overview');
    } finally {
      setLoading(false);
    }
  }, [idToken, role]);

  useEffect(() => {
    if (authLoading) return;
    if (!user || role !== 'admin') {
      setLoading(false);
      return;
    }
    void loadOverview();
  }, [authLoading, user, role, loadOverview]);

  const handleRoleToggle = async (targetUserId: number, currentRole: string | null) => {
    if (!idToken) return;
    const nextRole = currentRole === 'admin' ? 'member' : 'admin';
    try {
      await apiFetch(`/api/admin/users/${targetUserId}/role`, {
        method: 'PATCH',
        token: idToken,
        body: JSON.stringify({ role: nextRole }),
      });
      setNotice(`Updated user role to ${nextRole}.`);
      await loadOverview();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to update role');
    }
  };

  const handleUpdatePagodaSummary = async (pagodaId: number, summary: string) => {
    if (!idToken) return;
    try {
      await apiFetch(`/api/admin/pagodas/${pagodaId}`, {
        method: 'PATCH',
        token: idToken,
        body: JSON.stringify({ summary }),
      });
      setNotice('Pagoda information saved.');
      await loadOverview();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to save pagoda');
    }
  };

  const handleToggleFigureActive = async (
    fig: AdminOverviewPayload['figures'][number],
  ) => {
    if (!idToken) return;
    try {
      await apiFetch('/api/admin/figures', {
        method: 'POST',
        token: idToken,
        body: JSON.stringify({
          ...fig,
          isActive: !fig.isActive,
        }),
      });
      setNotice(`Updated visibility for ${fig.name}.`);
      await loadOverview();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to update figure');
    }
  };

  const handleCreateDhamma = async (e: FormEvent) => {
    e.preventDefault();
    if (!idToken) return;
    try {
      await apiFetch('/api/admin/dhamma', {
        method: 'POST',
        token: idToken,
        body: JSON.stringify({
          publishDate: new Date().toISOString().slice(0, 10),
          quoteEn,
          quoteMy,
          explanationEn,
          reflectionPrompt,
          sourceAttribution,
          isDailyFeatured,
        }),
      });
      setQuoteEn('');
      setQuoteMy('');
      setExplanationEn('');
      setReflectionPrompt('');
      setSourceAttribution('');
      setNotice('Published new Daily Dhamma teaching.');
      await loadOverview();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to publish Dhamma');
    }
  };

  if (authLoading || loading) {
    return <LoadingState message="Verifying administrator privileges..." />;
  }

  if (!user || role !== 'admin') {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center sm:px-6">
        <div className="rounded-2xl border border-sanctuary-brown/15 bg-sanctuary-parchment/60 p-8 sm:p-10">
          <ShieldAlert className="mx-auto h-10 w-10 text-sanctuary-burgundy" aria-hidden="true" />
          <h1 className="mt-4 font-display text-3xl font-semibold text-sanctuary-burgundy">
            Administrator Access Required
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-sanctuary-muted">
            This administrative console is restricted to authorized sanctuary stewards. Standard member accounts cannot access administrative records.
          </p>
          <Link
            to={user ? ROUTES.DASHBOARD : ROUTES.AUTH}
            className="mt-6 inline-flex rounded-lg bg-sanctuary-burgundy px-5 py-2.5 text-sm font-medium text-sanctuary-cream"
          >
            {user ? 'Return to Member Dashboard' : 'Sign In'}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-sanctuary-brown/12 pb-6">
        <div>
          <p className="flex items-center gap-1.5 text-xs font-semibold tracking-wider text-sanctuary-saffron uppercase">
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            <span>Role-Protected Sanctuary Administration</span>
          </p>
          <h1 className="mt-1.5 font-display text-4xl font-semibold text-sanctuary-burgundy">
            Admin Console
          </h1>
        </div>
      </div>

      {error && (
        <div role="alert" className="mt-5 rounded-lg border border-red-900/20 bg-red-50 p-4 text-sm text-red-900">
          {error}
        </div>
      )}
      {notice && (
        <div role="status" className="mt-5 rounded-lg border border-emerald-900/20 bg-emerald-50 p-4 text-sm text-emerald-900">
          {notice}
        </div>
      )}

      {/* Platform Usage Statistics */}
      <section className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="rounded-xl border border-sanctuary-brown/12 bg-sanctuary-parchment/50 p-5">
          <p className="text-xs text-sanctuary-muted">Registered Users</p>
          <p className="mt-1.5 font-mono text-3xl font-semibold text-sanctuary-burgundy tabular-nums">
            {data?.stats.totalUsers ?? 0}
          </p>
        </div>
        <div className="rounded-xl border border-sanctuary-brown/12 bg-sanctuary-parchment/50 p-5">
          <p className="text-xs text-sanctuary-muted">Meditation Sessions</p>
          <p className="mt-1.5 font-mono text-3xl font-semibold text-sanctuary-burgundy tabular-nums">
            {data?.stats.totalMeditations ?? 0}
          </p>
        </div>
        <div className="rounded-xl border border-sanctuary-brown/12 bg-sanctuary-parchment/50 p-5">
          <p className="text-xs text-sanctuary-muted">Meditation Minutes</p>
          <p className="mt-1.5 font-mono text-3xl font-semibold text-sanctuary-burgundy tabular-nums">
            {data?.stats.totalMeditationMinutes ?? 0}m
          </p>
        </div>
        <div className="rounded-xl border border-sanctuary-brown/12 bg-sanctuary-parchment/50 p-5">
          <p className="text-xs text-sanctuary-muted">Prayer Reflections</p>
          <p className="mt-1.5 font-mono text-3xl font-semibold text-sanctuary-burgundy tabular-nums">
            {data?.stats.totalPrayers ?? 0}
          </p>
        </div>
      </section>

      {/* Admin Tabs */}
      <div className="mt-8 flex flex-wrap gap-1 rounded-lg bg-sanctuary-parchment p-1">
        {(
          [
            ['users', 'Users & Roles'],
            ['pagodas', 'Pagodas'],
            ['figures', 'Buddhist Figures'],
            ['dhamma', 'Daily Dhamma'],
          ] as Array<[AdminTab, string]>
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={`rounded-md px-4 py-2 text-xs font-semibold transition-colors ${
              tab === id
                ? 'bg-sanctuary-burgundy text-sanctuary-cream'
                : 'text-sanctuary-muted hover:text-sanctuary-charcoal'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-6 rounded-xl border border-sanctuary-brown/12 bg-sanctuary-parchment/40 p-6">
        {tab === 'users' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-sanctuary-brown/15 text-xs text-sanctuary-muted uppercase">
                  <th className="py-2.5 pr-4">Name</th>
                  <th className="py-2.5 pr-4">Email</th>
                  <th className="py-2.5 pr-4">Role</th>
                  <th className="py-2.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sanctuary-brown/10">
                {data?.users.map((u) => (
                  <tr key={u.id}>
                    <td className="py-3 pr-4 font-medium">{u.displayName}</td>
                    <td className="py-3 pr-4 text-sanctuary-muted">{u.email}</td>
                    <td className="py-3 pr-4 capitalize">{u.role || 'member'}</td>
                    <td className="py-3 text-right">
                      <button
                        type="button"
                        onClick={() => void handleRoleToggle(u.id, u.role)}
                        className="rounded-md border border-sanctuary-brown/20 px-3 py-1 text-xs font-medium hover:border-sanctuary-gold"
                      >
                        {u.role === 'admin' ? 'Set Member' : 'Set Admin'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === 'pagodas' && (
          <div className="space-y-6">
            {data?.pagodas.map((p) => (
              <div key={p.id} className="rounded-lg border border-sanctuary-brown/12 bg-sanctuary-cream p-5">
                <h3 className="font-display text-xl font-semibold text-sanctuary-burgundy">
                  {p.name} ({p.location})
                </h3>
                <textarea
                  defaultValue={p.summary}
                  rows={3}
                  id={`pagoda-summary-${p.id}`}
                  className="mt-3 w-full rounded-lg border border-sanctuary-brown/20 bg-sanctuary-parchment/30 p-3 text-sm"
                />
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById(
                      `pagoda-summary-${p.id}`,
                    ) as HTMLTextAreaElement | null;
                    if (el) void handleUpdatePagodaSummary(p.id, el.value);
                  }}
                  className="mt-3 rounded-lg bg-sanctuary-burgundy px-4 py-2 text-xs font-medium text-sanctuary-cream"
                >
                  Save Pagoda Summary
                </button>
              </div>
            ))}
          </div>
        )}

        {tab === 'figures' && (
          <div className="space-y-4">
            {data?.figures.map((fig) => (
              <div
                key={fig.id}
                className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-sanctuary-brown/12 bg-sanctuary-cream p-4"
              >
                <div>
                  <h3 className="font-display text-xl font-semibold text-sanctuary-burgundy">
                    {fig.name}
                  </h3>
                  <p className="text-xs text-sanctuary-muted">
                    {fig.era} · {fig.titleOrRole}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => void handleToggleFigureActive(fig)}
                  className="rounded-lg border border-sanctuary-brown/20 px-3.5 py-1.5 text-xs font-medium hover:border-sanctuary-gold"
                >
                  {fig.isActive ? 'Active (Hide)' : 'Hidden (Activate)'}
                </button>
              </div>
            ))}
          </div>
        )}

        {tab === 'dhamma' && (
          <div className="grid gap-8 lg:grid-cols-12">
            <form onSubmit={handleCreateDhamma} className="space-y-4 lg:col-span-6">
              <h3 className="font-display text-2xl font-semibold text-sanctuary-burgundy">
                Publish Daily Dhamma Teaching
              </h3>
              <textarea
                required
                rows={2}
                placeholder="Verified English quotation..."
                value={quoteEn}
                onChange={(e) => setQuoteEn(e.target.value)}
                className="w-full rounded-lg border border-sanctuary-brown/20 bg-sanctuary-cream p-3 text-sm"
              />
              <textarea
                required
                rows={2}
                placeholder="Myanmar translation (မြန်မာဘာသာ)..."
                value={quoteMy}
                onChange={(e) => setQuoteMy(e.target.value)}
                className="w-full rounded-lg border border-sanctuary-brown/20 bg-sanctuary-cream p-3 font-myanmar text-sm"
              />
              <textarea
                required
                rows={2}
                placeholder="Short explanation..."
                value={explanationEn}
                onChange={(e) => setExplanationEn(e.target.value)}
                className="w-full rounded-lg border border-sanctuary-brown/20 bg-sanctuary-cream p-3 text-sm"
              />
              <input
                required
                type="text"
                placeholder="Daily reflection prompt..."
                value={reflectionPrompt}
                onChange={(e) => setReflectionPrompt(e.target.value)}
                className="w-full rounded-lg border border-sanctuary-brown/20 bg-sanctuary-cream px-3 py-2 text-sm"
              />
              <input
                required
                type="text"
                placeholder="Verified canonical source (e.g. Dhammapada Verse 183)"
                value={sourceAttribution}
                onChange={(e) => setSourceAttribution(e.target.value)}
                className="w-full rounded-lg border border-sanctuary-brown/20 bg-sanctuary-cream px-3 py-2 text-sm"
              />
              <label className="flex items-center gap-2 text-xs font-medium">
                <input
                  type="checkbox"
                  checked={isDailyFeatured}
                  onChange={(e) => setIsDailyFeatured(e.target.checked)}
                />
                <span>Set as Today&apos;s Featured Teaching</span>
              </label>
              <button
                type="submit"
                className="rounded-lg bg-sanctuary-burgundy px-5 py-2.5 text-sm font-medium text-sanctuary-cream"
              >
                Publish Teaching
              </button>
            </form>

            <div className="space-y-3 lg:col-span-6">
              <h3 className="font-display text-2xl font-semibold text-sanctuary-burgundy">
                Published Teachings ({data?.dhamma.length ?? 0})
              </h3>
              {data?.dhamma.map((d) => (
                <div key={d.id} className="rounded-lg border border-sanctuary-brown/10 bg-sanctuary-cream p-4 text-sm">
                  <p className="text-xs text-sanctuary-saffron">
                    {d.publishDate} · {d.sourceAttribution} {d.isDailyFeatured ? '· Featured' : ''}
                  </p>
                  <p className="mt-1 font-display text-lg">“{d.quoteEn}”</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
