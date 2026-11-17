import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { LanguageCode, QualityTier, WebGLCapabilities } from '../types/sanctuary';
import { detectWebGLCapabilities } from '../utils/webgl';

const LANGUAGE_STORAGE_KEY = 'sanctuary_language';

interface SanctuaryContextValue {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  toggleLanguage: () => void;
  qualityTier: QualityTier;
  setQualityTier: (tier: QualityTier) => void;
  audioMuted: boolean;
  toggleAudioMute: () => void;
  webgl: WebGLCapabilities;
}

const SanctuaryContext = createContext<SanctuaryContextValue | null>(null);

function readInitialLanguage(): LanguageCode {
  try {
    const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (stored === 'my' || stored === 'en') {
      return stored;
    }
  } catch {
    // Ignore storage access errors
  }
  return 'en';
}

export function SanctuaryProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>(readInitialLanguage);
  const [audioMuted, setAudioMuted] = useState<boolean>(false);
  const [webgl, setWebgl] = useState<WebGLCapabilities>({
    supported: true,
    isSoftwareRenderer: false,
    rendererName: 'Detecting graphics adapter',
    recommendedTier: 'high',
  });
  const [qualityTier, setQualityTier] = useState<QualityTier>('high');

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    } catch {
      // Ignore storage access errors
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'my' : 'en');
  };

  useEffect(() => {
    document.documentElement.lang = language === 'my' ? 'my' : 'en';
  }, [language]);

  useEffect(() => {
    const detected = detectWebGLCapabilities();
    setWebgl(detected);
    setQualityTier(detected.recommendedTier);
  }, []);

  const value = useMemo<SanctuaryContextValue>(
    () => ({
      language,
      setLanguage,
      toggleLanguage,
      qualityTier,
      setQualityTier,
      audioMuted,
      toggleAudioMute: () => setAudioMuted((prev) => !prev),
      webgl,
    }),
    [language, qualityTier, audioMuted, webgl],
  );

  return <SanctuaryContext.Provider value={value}>{children}</SanctuaryContext.Provider>;
}

export function useSanctuary() {
  const context = useContext(SanctuaryContext);
  if (!context) {
    throw new Error('useSanctuary must be used within a SanctuaryProvider');
  }
  return context;
}
