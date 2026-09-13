import { DesignTheme } from '../data/designThemes';

export type ThemeId = DesignTheme['id'];

export const THEME_STORAGE_KEY = 'viplov_portfolio_theme';

export const ALL_THEME_CLASSES = [
  'theme-swiss',
  'theme-cyber',
  'theme-modern-dark',
  'theme-editorial',
  'theme-neo-pop',
] as const;

export interface ThemeTransition {
  from: ThemeId;
  to: ThemeId;
}

export interface ThemeState {
  current: ThemeId;
  transition: ThemeTransition | null;
}

/**
 * Safely reads the initial theme from localStorage or returns default 'swiss'
 */
export const getInitialTheme = (): ThemeId => {
  if (typeof window === 'undefined') return 'swiss';
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY) as ThemeId;
    if (saved && ['swiss', 'cyber', 'modern-dark', 'editorial', 'neo-pop'].includes(saved)) {
      return saved;
    }
  } catch {
    // Ignore storage read failures
  }
  return 'swiss';
};

/**
 * Strictly sequential application of theme classes to document.body.
 * 1. Sequentially removes all previous theme classes.
 * 2. Sequentially adds the target theme class.
 * 3. Persists the theme ID to localStorage.
 * 4. Triggers a synchronous DOM reflow to guarantee CSS variables and rules
 *    are fully computed before the transition overlay reveals the page.
 */
export const applyThemeToDOM = (themeId: ThemeId): void => {
  if (typeof document === 'undefined') return;

  // 1. Strictly remove all existing theme classes in sequence
  for (const cls of ALL_THEME_CLASSES) {
    if (document.body.classList.contains(cls)) {
      document.body.classList.remove(cls);
    }
  }

  // 2. Add the destination theme class
  document.body.classList.add(`theme-${themeId}`);

  // 3. Persist to storage atomically
  try {
    localStorage.setItem(THEME_STORAGE_KEY, themeId);
  } catch {
    // Ignore storage write failures
  }

  // 4. Force synchronous style recalculation & layout flush
  void document.body.offsetHeight;
};
