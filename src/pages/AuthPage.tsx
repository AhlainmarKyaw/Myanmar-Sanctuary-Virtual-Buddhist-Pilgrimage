import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, KeyRound, LogIn, ShieldCheck, UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useSanctuary } from '../context/SanctuaryContext';
import { getTranslations } from '../i18n/translations';
import { ROUTES } from '../config/navigation';

type AuthMode = 'login' | 'register' | 'reset';

export default function AuthPage() {
  const { user, signInWithGoogle, signInWithEmail, registerWithEmail, resetPassword } = useAuth();
  const { language } = useSanctuary();
  const t = getTranslations(language);
  const navigate = useNavigate();

  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (user) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center sm:px-6">
        <div className="rounded-2xl border border-sanctuary-brown/12 bg-sanctuary-parchment/55 p-8 sm:p-10">
          <ShieldCheck className="mx-auto h-10 w-10 text-sanctuary-burgundy" aria-hidden="true" />
          <h1 className="mt-4 font-display text-3xl font-semibold text-sanctuary-burgundy">
            {t.auth.signedInAs} {user.displayName || user.email}
          </h1>
          <p className="mt-2 text-sm text-sanctuary-muted">
            {t.auth.syncedNote}
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link
              to={ROUTES.DASHBOARD}
              className="inline-flex items-center gap-2 rounded-lg bg-sanctuary-burgundy px-5 py-2.5 text-sm font-medium text-sanctuary-cream hover:bg-sanctuary-burgundy-deep"
            >
              <span>{t.auth.openDashboard}</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              to={ROUTES.PAGODAS}
              className="rounded-lg border border-sanctuary-brown/20 px-5 py-2.5 text-sm font-medium text-sanctuary-charcoal hover:bg-sanctuary-cream"
            >
              {t.auth.explorePagodas}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleGoogleSignIn = async () => {
    setErrorMsg(null);
    setSuccessMsg(null);
    setSubmitting(true);
    try {
      await signInWithGoogle();
      navigate(ROUTES.DASHBOARD);
    } catch (err) {
      setErrorMsg(
        err instanceof Error ? err.message : 'Unable to complete Google sign-in.',
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleEmailSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setSubmitting(true);

    try {
      if (mode === 'login') {
        await signInWithEmail(email, password);
        navigate(ROUTES.DASHBOARD);
      } else if (mode === 'register') {
        await registerWithEmail(email, password, displayName);
        navigate(ROUTES.DASHBOARD);
      } else {
        await resetPassword(email);
        setSuccessMsg('Password reset instructions have been sent to your email address.');
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Authentication failed.';
      if (msg.includes('operation-not-allowed')) {
        setErrorMsg(
          'Email/Password sign-in is not yet enabled in the Firebase Console. Use "Continue with Google" below or enable Email/Password under Firebase Authentication > Sign-in method.',
        );
      } else {
        setErrorMsg(msg);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-lg px-4 py-12 sm:px-6 sm:py-16">
      <div className="rounded-2xl border border-sanctuary-brown/12 bg-sanctuary-parchment/55 p-7 sm:p-10">
        <p className="text-xs font-semibold tracking-wider text-sanctuary-saffron uppercase">
          {t.auth.memberAccess}
        </p>
        <h1 className="mt-2 font-display text-3xl font-semibold text-sanctuary-burgundy sm:text-4xl">
          {mode === 'login'
            ? t.auth.signInTitle
            : mode === 'register'
              ? t.auth.registerTitle
              : t.auth.resetTitle}
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-sanctuary-muted">
          {t.auth.subtitle}
        </p>

        {/* Primary Google Sign-In */}
        <button
          type="button"
          disabled={submitting}
          onClick={handleGoogleSignIn}
          className="mt-6 flex w-full items-center justify-center gap-2.5 rounded-lg bg-sanctuary-burgundy px-5 py-3 text-sm font-semibold text-sanctuary-cream transition-colors hover:bg-sanctuary-burgundy-deep disabled:opacity-60"
        >
          <LogIn className="h-4 w-4" aria-hidden="true" />
          <span>{t.auth.continueGoogle}</span>
        </button>

        <div className="my-6 flex items-center gap-3 text-xs text-sanctuary-muted">
          <div className="h-px flex-1 bg-sanctuary-brown/15" />
          <span>{t.auth.orWithEmail}</span>
          <div className="h-px flex-1 bg-sanctuary-brown/15" />
        </div>

        {/* Mode Switcher */}
        <div className="grid grid-cols-3 gap-1 rounded-lg bg-sanctuary-cream p-1">
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setErrorMsg(null);
              setSuccessMsg(null);
            }}
            className={`rounded-md py-1.5 text-xs font-medium transition-colors ${
              mode === 'login'
                ? 'bg-sanctuary-burgundy text-sanctuary-cream'
                : 'text-sanctuary-muted hover:text-sanctuary-charcoal'
            }`}
          >
            {t.auth.tabSignIn}
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('register');
              setErrorMsg(null);
              setSuccessMsg(null);
            }}
            className={`rounded-md py-1.5 text-xs font-medium transition-colors ${
              mode === 'register'
                ? 'bg-sanctuary-burgundy text-sanctuary-cream'
                : 'text-sanctuary-muted hover:text-sanctuary-charcoal'
            }`}
          >
            {t.auth.tabRegister}
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('reset');
              setErrorMsg(null);
              setSuccessMsg(null);
            }}
            className={`rounded-md py-1.5 text-xs font-medium transition-colors ${
              mode === 'reset'
                ? 'bg-sanctuary-burgundy text-sanctuary-cream'
                : 'text-sanctuary-muted hover:text-sanctuary-charcoal'
            }`}
          >
            {t.auth.tabReset}
          </button>
        </div>

        {errorMsg && (
          <div
            role="alert"
            className="mt-4 rounded-lg border border-red-900/20 bg-red-50 px-4 py-3 text-xs leading-relaxed text-red-900"
          >
            {errorMsg}
          </div>
        )}

        {successMsg && (
          <div
            role="status"
            className="mt-4 rounded-lg border border-emerald-900/20 bg-emerald-50 px-4 py-3 text-xs leading-relaxed text-emerald-900"
          >
            {successMsg}
          </div>
        )}

        <form onSubmit={handleEmailSubmit} className="mt-5 space-y-4">
          {mode === 'register' && (
            <div>
              <label htmlFor="auth-name" className="block text-xs font-medium text-sanctuary-charcoal">
                {t.auth.displayName}
              </label>
              <input
                id="auth-name"
                type="text"
                required
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Your name"
                className="mt-1.5 w-full rounded-lg border border-sanctuary-brown/20 bg-sanctuary-cream px-3.5 py-2.5 text-sm text-sanctuary-charcoal"
              />
            </div>
          )}

          <div>
            <label htmlFor="auth-email" className="block text-xs font-medium text-sanctuary-charcoal">
              {t.auth.emailLabel}
            </label>
            <input
              id="auth-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="mt-1.5 w-full rounded-lg border border-sanctuary-brown/20 bg-sanctuary-cream px-3.5 py-2.5 text-sm text-sanctuary-charcoal"
            />
          </div>

          {mode !== 'reset' && (
            <div>
              <label
                htmlFor="auth-password"
                className="block text-xs font-medium text-sanctuary-charcoal"
              >
                {t.auth.passwordLabel}
              </label>
              <input
                id="auth-password"
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 6 characters"
                className="mt-1.5 w-full rounded-lg border border-sanctuary-brown/20 bg-sanctuary-cream px-3.5 py-2.5 text-sm text-sanctuary-charcoal"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-sanctuary-brown/25 bg-sanctuary-cream px-5 py-2.5 text-sm font-semibold text-sanctuary-burgundy transition-colors hover:border-sanctuary-gold disabled:opacity-60"
          >
            {mode === 'register' ? (
              <>
                <UserPlus className="h-4 w-4" aria-hidden="true" />
                <span>{t.auth.createAccount}</span>
              </>
            ) : mode === 'reset' ? (
              <>
                <KeyRound className="h-4 w-4" aria-hidden="true" />
                <span>{t.auth.sendReset}</span>
              </>
            ) : (
              <>
                <LogIn className="h-4 w-4" aria-hidden="true" />
                <span>{t.auth.signInEmail}</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
